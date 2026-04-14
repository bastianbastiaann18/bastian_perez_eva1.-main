from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'Images')
os.makedirs(OUT, exist_ok=True)

size = (1200, 800)

def save_images(name, bg, shapes, text, txt_color, out_name_base):
    img = Image.new('RGB', size, bg)
    draw = ImageDraw.Draw(img)
    w, h = size
    # draw provided shapes (list of tuples: ('ellipse'/'rect', bbox, fill))
    for s in shapes:
        kind = s[0]
        bbox = s[1]
        fill = s[2]
        if kind == 'ellipse':
            draw.ellipse(bbox, fill=fill)
        elif kind == 'rect':
            draw.rectangle(bbox, fill=fill)
        elif kind == 'polygon':
            draw.polygon(bbox, fill=fill)
    # text
    try:
        font = ImageFont.truetype('arial.ttf', 36)
    except Exception:
        font = ImageFont.load_default()
    try:
        bbox = draw.textbbox((0,0), text, font=font)
        tw = bbox[2]-bbox[0]
        th = bbox[3]-bbox[1]
    except Exception:
        tw, th = font.getsize(text)
    draw.text(((w-tw)/2, h-80), text, fill=txt_color, font=font)
    png_path = os.path.join(OUT, out_name_base + '.png')
    jpg_path = os.path.join(OUT, out_name_base + '.jpg')
    img.save(png_path)
    img.save(jpg_path, quality=90)
    print('Saved', png_path, jpg_path)

# Croissant
save_images('croissant', '#fff3e8', [
    ('ellipse',(200,220,520,380),'#e09b5f'),
    ('ellipse',(460,160,740,380),'#e09b5f'),
    ('ellipse',(720,220,980,420),'#e09b5f')
], 'Croissant — imagen placeholder', '#b36a2f', 'croissant')

# Pan integral
save_images('pan_integral', '#f3fff6', [
    ('ellipse',(240,260,960,620),'#7aa57a'),
    ('rect',(300,300,900,500),'#5f8a5f')
], 'Pan integral — imagen placeholder', '#3f6b3f', 'pan_integral')

# Dulces
save_images('dulces', '#fff7fb', [
    ('ellipse',(240,240,480,480),'#e88fb2'),
    ('rect',(560,260,820,420),'#e88fb2'),
    ('ellipse',(900,240,1080,520),'#e88fb2')
], 'Dulces — imagen placeholder', '#b3477f', 'dulces')

print('Done')
