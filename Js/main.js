// ============================================
// DATOS DE PRODUCTOS
// ============================================

const products = [
  {
    id: 1,
    type: 'baguette',
    title: 'Baguette Artesanal',
    description: 'Corteza crujiente, miga aireada — 280g',
    price: '$1.275',
    tags: ['Tradicional', 'Horno diario'],
    image: 'Images/baguette.jpg'
  },
  {
    id: 2,
    type: 'croissant',
    title: 'Croissant Dorado',
    description: 'Mantequilla pura, laminado clásico — por unidad',
    price: '$1.700',
    tags: ['Mantequilla', 'Hojaldre'],
    image: 'Images/crossaint.jpg'
  },
  {
    id: 3,
    type: 'integral',
    title: 'Pan Integral',
    description: 'Harinas integrales, sabor profundo — 500g',
    price: '$2.720',
    tags: ['Saludable', 'Fibra'],
    image: 'Images/pan_integral (2).jpg'
  },
  {
    id: 4,
    type: 'dulces',
    title: 'Tartaletas y Dulces',
    description: 'Selección diaria: tartaletas, napolitanas y más',
    price: '$2.125',
    tags: ['Repostería', 'Para compartir'],
    image: 'Images/tarta.jpg'
  },
  {
    id: 5,
    type: 'baguette',
    title: 'Baguette Integral',
    description: 'Combinación de trigo integral y harina blanca — 350g',
    price: '$1.700',
    tags: ['Nutritivo', 'Mezcla'],
    image: 'Images/crossaint_integral.jpg'
  },
  {
    id: 6,
    type: 'croissant',
    title: 'Croissant de Chocolate',
    description: 'Hojaldre relleno de chocolate belga — por unidad',
    price: '$2.125',
    tags: ['Chocolate', 'Premium'],
    image: 'Images/crossaint.jpg'
  },
  {
    id: 7,
    type: 'dulces',
    title: 'Medialunas',
    description: 'Medialunas de mantequilla crujientes — 2 unidades',
    price: '$1.530',
    tags: ['Clásico', 'Desayuno'],
    image: 'Images/medialuna.jpg'
  },
  {
    id: 8,
    type: 'integral',
    title: 'Pan de Centeno',
    description: 'Rico en fibra, sabor intenso — 450g',
    price: '$2.975',
    tags: ['Europeo', 'Saludable'],
    image: 'Images/pan_de_centeno.jpg'
  }
];

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const filterSelect = document.getElementById('filterType');
const resetButton = document.getElementById('resetFilters');
const productsGrid = document.getElementById('productsGrid');
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const locateBtn = document.getElementById('locateBtn');
const themeToggle = document.getElementById('themeToggle');

// ============================================
// SISTEMA DE TEMAS (MODO OSCURO)
// ============================================

/**
 * Inicializa el sistema de temas
 */
function initTheme() {
  // Obtener el tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Aplicar tema
  applyTheme(theme);
  
  // Listener para cambios en preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Aplica el tema a la página
 * @param {string} theme - 'light' o 'dark'
 */
function applyTheme(theme) {
  const html = document.documentElement;
  
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    updateThemeToggleIcon('dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    updateThemeToggleIcon('light');
  }
}

/**
 * Actualiza el icono del botón toggle
 * @param {string} theme - 'light' o 'dark'
 */
function updateThemeToggleIcon(theme) {
  if (!themeToggle) return;
  
  const svg = themeToggle.querySelector('svg');
  
  if (theme === 'dark') {
    // Mostrar icono de luna (para cambiar a claro)
    svg.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    `;
    themeToggle.setAttribute('title', 'Cambiar a modo claro');
  } else {
    // Mostrar icono de sol (para cambiar a oscuro)
    svg.innerHTML = `
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
    themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
  }
}

/**
 * Toggle entre temas
 */
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Event listener para el botón toggle
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Renderiza los productos en el grid
 * @param {Array} productsToRender - Array de productos a mostrar
 */
function renderProducts(productsToRender) {
  productsGrid.innerHTML = '';
  
  if (productsToRender.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <p style="color: var(--text-light); font-size: 16px;">No hay productos disponibles en esta categoría.</p>
      </div>
    `;
    return;
  }

  productsToRender.forEach((product, index) => {
    const productCard = document.createElement('article');
    productCard.className = 'card';
    productCard.setAttribute('role', 'listitem');
    productCard.setAttribute('data-type', product.type);
    productCard.style.animation = `fadeIn 0.6s ease-out ${0.1 * index}s both`;
    
    const tagsHTML = product.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    productCard.innerHTML = `
      <div class="card-media">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          width="400" 
          height="300" 
          loading="lazy">
        <span class="badge-type">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          ${product.type.charAt(0).toUpperCase() + product.type.slice(1)}
        </span>
        <span class="price-badge">${product.price}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${product.title}</div>
        <div class="card-meta">${product.description}</div>
        <div class="card-tags">
          ${tagsHTML}
        </div>
      </div>
    `;

    // Agregar animación de click
    productCard.addEventListener('click', () => {
      productCard.style.transform = 'scale(0.98)';
      setTimeout(() => {
        productCard.style.transform = '';
      }, 200);
    });

    productsGrid.appendChild(productCard);
  });
}

/**
 * Filtra productos por tipo
 */
function filterProducts() {
  const selectedType = filterSelect.value;
  let filtered = products;

  if (selectedType !== 'all') {
    filtered = products.filter(product => product.type === selectedType);
  }

  renderProducts(filtered);
}

/**
 * Reinicia los filtros
 */
function resetFilters() {
  filterSelect.value = 'all';
  renderProducts(products);
}

/**
 * Maneja el envío del formulario de contacto
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const contacto = document.getElementById('contacto').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validación básica
  if (!nombre || !contacto || !mensaje) {
    showMessage('Por favor completa todos los campos.', 'error');
    return;
  }

  // Validación de email o teléfono
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  
  if (!emailRegex.test(contacto) && !phoneRegex.test(contacto)) {
    showMessage('Por favor ingresa un email o teléfono válido.', 'error');
    return;
  }

  // Aquí normalmente enviarías los datos a un servidor
  console.log({
    nombre,
    contacto,
    mensaje,
    timestamp: new Date().toISOString()
  });

  // Mostrar mensaje de éxito
  showMessage('¡Gracias por tu pedido! Nos contactaremos pronto.', 'success');
  
  // Limpiar formulario
  contactForm.reset();
  
  // Desvanecerá el mensaje después de 5 segundos
  setTimeout(() => {
    hideMessage();
  }, 5000);
}

/**
 * Muestra un mensaje en el formulario
 */
function showMessage(text, type) {
  formMsg.textContent = text;
  formMsg.className = `form-message ${type}`;
}

/**
 * Oculta el mensaje del formulario
 */
function hideMessage() {
  formMsg.className = 'form-message';
}

/**
 * Abre la ubicación en Google Maps
 */
function locate() {
  const latitude = -33.4489;
  const longitude = -70.6693;
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(mapsUrl, '_blank');
}

/**
 * Maneja el menú hamburguesa
 */
function toggleMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

/**
 * Cierra el menú cuando se hace clic en un enlace
 */
function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Filtro de productos
filterSelect.addEventListener('change', filterProducts);
resetButton.addEventListener('click', resetFilters);

// Formulario de contacto
contactForm.addEventListener('submit', handleFormSubmit);
locateBtn.addEventListener('click', locate);

// Menú hamburguesa (para dispositivos móviles)
hamburger.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar el sistema de temas
  initTheme();
  
  // Renderizar todos los productos inicialmente
  renderProducts(products);
  
  // Smooth scroll para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Añadir efecto de entrada a elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
});

// ============================================
// EFECTOS DE SCROLL
// ============================================

// Efecto parallax simple cuando se hace scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage) {
    // Limitar el movimiento parallax para que no baje demasiado
    const maxScroll = window.innerHeight * 0.5;
    const limitedScroll = Math.min(scrolled, maxScroll);
    heroImage.style.transform = `translateY(${limitedScroll * 0.1}px)`;
  }
});

// ============================================
// FUNCIONES ADICIONALES
// ============================================

/**
 * Función para detectar tema oscuro preferido del sistema
 */
initTheme();
