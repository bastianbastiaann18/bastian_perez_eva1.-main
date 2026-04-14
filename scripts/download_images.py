import os
import sys
import json
from pathlib import Path
import requests
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES_DIR = ROOT / 'Images'
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

def download_image(url, out_path):
    resp = requests.get(url, stream=True, timeout=30)
    resp.raise_for_status()
    tmp = out_path.with_suffix(out_path.suffix + '.tmp')
    with open(tmp, 'wb') as f:
        for chunk in resp.iter_content(8192):
            f.write(chunk)
    # try to open and convert to PNG
    try:
        img = Image.open(tmp)
        img = img.convert('RGB')
        img.save(out_path.with_suffix('.jpg'), quality=90)
        img.save(out_path.with_suffix('.png'))
        tmp.unlink()
        return True
    except Exception as e:
        print('Error processing image', out_path, e)
        if tmp.exists():
            tmp.unlink()
        return False

def main(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        items = json.load(f)

    credits = []
    for it in items:
        filename = it.get('filename')
        url = it.get('url')
        author = it.get('author')
        source = it.get('source')
        license = it.get('license', 'CC0')
        if not (filename and url):
            print('Skipping incomplete entry', it)
            continue
        out_base = IMAGES_DIR / Path(filename).stem
        success = download_image(url, out_base)
        if success:
            credits.append({
                'file': out_base.with_suffix('.jpg').name,
                'author': author or '',
                'source': source or url,
                'license': license,
            })

    credits_path = IMAGES_DIR / 'images_credits.json'
    with open(credits_path, 'w', encoding='utf-8') as f:
        json.dump(credits, f, ensure_ascii=False, indent=2)
    print('Wrote credits to', credits_path)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python scripts/download_images.py scripts/images_to_download.json')
        sys.exit(1)
    json_path = Path(sys.argv[1])
    if not json_path.exists():
        print('JSON file not found:', json_path)
        sys.exit(1)
    try:
        import requests
    except Exception:
        print('Please install requests: pip install requests')
        sys.exit(1)
    main(json_path)
