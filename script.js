/* ============================================================
   NAVEGACIÓN SPA POR PESTAÑAS
   ============================================================ */
const panels = document.querySelectorAll('.tab-panel');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });

function goToTab(tabId) {
  panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === tabId));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('main-nav').classList.remove('open');
  const activePanel = document.querySelector('.tab-panel.active');
  if (activePanel) activePanel.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    goToTab(el.dataset.tab);
  });
});

document.querySelectorAll('.tab-panel.active .reveal').forEach(el => revealObserver.observe(el));

document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('open');
});

/* --------------------------------------------------------------
   CARTA REAL — extraída de "Carta_Pecados_Café_2024.pdf" (carta
   oficial, actualizada en mayo de 2026). Selección curada de la
   casa: la carta completa supera los 100 productos.
   Fotografías: fotos reales del local y recortes de producto
   extraídos de la carta oficial y del feed de Instagram.
-------------------------------------------------------------- */
const CATEGORIES = [
  { id: 'todas',    label: 'Todas' },
  { id: 'cafe',     label: 'Café de especialidad' },
  { id: 'crepes',   label: 'Crêpes & waffles' },
  { id: 'salado',   label: "Sandwich's & burgers" },
  { id: 'ensalada', label: 'Ensaladas' },
  { id: 'postres',  label: 'Postres' }
];

const CAT_LABEL = {
  cafe: 'Café de especialidad', crepes: 'Crêpes & waffles',
  salado: "Sandwich's & burgers", ensalada: 'Ensaladas', postres: 'Postres'
};

const MENU = [
  { id: 1,  name: 'Capuccino',            cat: 'cafe',      price: 2800, img: 'IMG_cafe_trio',   desc: 'Espresso con leche vaporizada y espuma cremosa, en versión simple.' },
  { id: 2,  name: 'Affogato',             cat: 'cafe',      price: 3800, img: 'IMG_affogato',    desc: 'Espresso, helado de vainilla, crema y salsa de caramelo.' },
  { id: 3,  name: 'Iced Mocca Latte',     cat: 'cafe',      price: 5900, img: 'IMG_milkshake',   desc: 'Espresso doble, leche, hielo y salsa de chocolate, coronado con crema.' },
  { id: 4,  name: 'Dulce Pecado',         cat: 'crepes',    price: 7900, img: 'IMG_crepe_dulce', desc: 'Crêpe o waffle base nutella y crema de limón, frutilla, galleta oreo y crema.' },
  { id: 5,  name: 'Frutos del Bosque',    cat: 'crepes',    price: 7900, img: 'IMG_hero',        desc: 'Crêpe o waffle base nutella, frutilla, frambuesa, arándano y crema.' },
  { id: 6,  name: 'Eby Crêpe',            cat: 'crepes',    price: 8500, img: 'IMG_eby_crepe',   desc: 'Base de queso crema, palmitos, palta, rúcula y camarones salteados.' },
  { id: 7,  name: 'La Clásica Burger',    cat: 'salado',    price: 8900, img: 'IMG_burger',      desc: 'Hamburguesa casera, láminas de queso cheddar, cebolla morada, champiñones salteados, tocino, pepinillo y mayonesa.' },
  { id: 8,  name: 'Ave Palta (miga)',     cat: 'salado',    price: 4900, img: 'IMG_sandwich',    desc: 'Pollo mechado con palta y mayonesa, en pan de miga.' },
  { id: 9,  name: 'Mini Burger',          cat: 'salado',    price: 9800, img: 'IMG_papas',       desc: 'Cuatro mini sándwich amasados, hamburguesa casera, tomate, palta y mayonesa, con papas fritas y salsas de la casa.' },
  { id: 10, name: 'Vegetariana',          cat: 'ensalada',  price: 8200, img: 'IMG_ensalada',    desc: 'Mix de lechugas, rúcula, queso fresco, cebolla morada, aceitunas negras, champiñones salteados y tomate cherry.' },
  { id: 11, name: 'Copa Oreo',            cat: 'postres',   price: 7200, img: 'IMG_copa_oreo',   desc: 'Dos bolitas de helado a elección, con galleta oreo, nutella, crema chantilly y salsa de chocolate.' },
  { id: 12, name: 'Trozo de Torta',       cat: 'postres',   price: 4200, img: 'IMG_torta',       desc: 'Porción de torta de la pastelería de la casa, según disponibilidad del día.' }
];

const IMG_SRC = {
    IMG_cafe_trio:  'fotos/cafe-trio.jpg',
    IMG_affogato:   'fotos/affogato.jpg',
    IMG_milkshake:  'fotos/milkshake.jpg',
    IMG_crepe_dulce:'fotos/crepe-dulce.jpg',
    IMG_hero:       'fotos/crepe-dulce-con-chocolate-y-frutillas-fo.jpg',
    IMG_eby_crepe:  'fotos/eby-crepe.jpg',
    IMG_burger:     'fotos/burger.jpg',
    IMG_sandwich:   'fotos/sandwich.jpg',
    IMG_papas:      'fotos/papas.jpg',
    IMG_ensalada:   'fotos/ensalada.jpg',
    IMG_copa_oreo:  'fotos/copa-oreo.jpg',
    IMG_torta:      'fotos/torta.jpg'
};
MENU.forEach(m => { m.imgSrc = IMG_SRC[m.img]; });

const fmt = n => '$' + n.toLocaleString('es-CL');

/* --------------------------------------------------------------
   FILTROS + GRILLA
-------------------------------------------------------------- */
const filtersEl = document.getElementById('menuTabs');
const gridEl = document.getElementById('menuPanels');
let activeCat = 'todas';

function renderFilters () {
  filtersEl.innerHTML = CATEGORIES.map(c => {
    const count = c.id === 'todas' ? MENU.length : MENU.filter(m => m.cat === c.id).length;
    return `<button class="menu-tab" data-cat="${c.id}">
              ${c.label} <span class="cat-count">${count}</span>
            </button>`;
  }).join('');
  updateActiveTabClass();
}
function updateActiveTabClass () {
  filtersEl.querySelectorAll('.menu-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === activeCat));
}

function renderGrid () {
  const items = activeCat === 'todas' ? MENU : MENU.filter(m => m.cat === activeCat);
  gridEl.innerHTML = `<div class="menu-grid">` + items.map(item => `
    <article class="menu-card" data-id="${item.id}">
      <div class="thumb"><img src="${item.imgSrc}" alt="${item.name}"></div>
      <div class="body">
        <span class="cat-label">${CAT_LABEL[item.cat]}</span>
        <div class="row">
          <h3>${item.name}</h3>
          <span class="price mono">${fmt(item.price)}</span>
        </div>
      </div>
    </article>
  `).join('') + `</div>`;
}

filtersEl.addEventListener('click', e => {
  const btn = e.target.closest('[data-cat]');
  if (!btn) return;
  activeCat = btn.dataset.cat;
  updateActiveTabClass();
  renderGrid();
});

/* --------------------------------------------------------------
   MODAL
-------------------------------------------------------------- */
const modal = document.getElementById('modalOverlay');
const modalImg = document.getElementById('modalImg');
const modalCat = document.getElementById('modalCat');
const modalName = document.getElementById('modalName');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalAdd = document.getElementById('modalAddBtn');
let modalItem = null;

function openModal (item) {
  modalItem = item;
  modalImg.src = item.imgSrc; modalImg.alt = item.name;
  modalCat.textContent = CAT_LABEL[item.cat];
  modalName.textContent = item.name;
  modalDesc.textContent = item.desc;
  modalPrice.textContent = fmt(item.price);
  toggleModal(true);
}
function toggleModal (open) { modal.classList.toggle('open', open); }

gridEl.addEventListener('click', e => {
  const card = e.target.closest('[data-id]');
  if (!card) return;
  const item = MENU.find(m => m.id === Number(card.dataset.id));
  if (item) openModal(item);
});
document.getElementById('modalCloseBtn').addEventListener('click', () => toggleModal(false));
modalAdd.addEventListener('click', () => { if (modalItem) { addToCart(modalItem); toggleModal(false); toggleCart(true); } });

/* --------------------------------------------------------------
   CARRITO
-------------------------------------------------------------- */
let cart = [];
let deliveryMode = 'retiro';
// Teléfono real confirmado en Google Maps y usado en los links de
// WhatsApp — no se confirmó si tiene WhatsApp activo (ver nota en
// Visítanos y en el carrito).
const PHONE_NUMBER = '56226465639';

document.querySelectorAll('.delivery-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.delivery-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    deliveryMode = btn.dataset.mode;
    renderCart();
  });
});

function addToCart (item) {
  const existing = cart.find(c => c.n === item.name);
  if (existing) { existing.qty++; } else { cart.push({ n: item.name, p: item.price, imgSrc: item.imgSrc, qty: 1 }); }
  renderCart();
}
function changeQty (name, delta) {
  const line = cart.find(c => c.n === name);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart = cart.filter(c => c.n !== name);
  renderCart();
}
function renderCart () {
  const linesEl = document.getElementById('cartLines');
  const count = cart.reduce((a, c) => a + c.qty, 0);
  document.getElementById('cartCount').textContent = count;
  if (cart.length === 0) {
    linesEl.innerHTML = '<p class="cart-empty">Todavía no agregaste nada.</p>';
  } else {
    linesEl.innerHTML = cart.map(c => `
      <div class="cart-line">
        <img src="${c.imgSrc}" alt="${c.n}">
        <div style="flex:1;">
          <div class="name">${c.n}</div>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty('${c.n.replace(/'/g, "\\'")}', -1)">–</button>
            <span class="mono">${c.qty}</span>
            <button class="qty-btn" onclick="changeQty('${c.n.replace(/'/g, "\\'")}', 1)">+</button>
          </div>
        </div>
        <div class="mono">${fmt(c.p * c.qty)}</div>
      </div>`).join('');
  }
  const total = cart.reduce((a, c) => a + c.p * c.qty, 0);
  document.getElementById('cartTotal').textContent = fmt(total);
  updateCheckoutLink(total);
}
function updateCheckoutLink (total) {
  const deliveryLabel = deliveryMode === 'retiro' ? 'Retiro en local' : 'Despacho a domicilio';
  let msg = 'Hola Pecados! Quisiera hacer el siguiente pedido:%0A%0A';
  if (cart.length === 0) {
    msg += '(Aún sin productos seleccionados)%0A%0A';
  } else {
    cart.forEach(c => { msg += `• ${c.qty}x ${c.n} — ${fmt(c.p * c.qty)}%0A`; });
    msg += `%0ATotal: ${fmt(total)}%0A%0A`;
  }
  msg += `Modalidad: ${deliveryLabel}`;
  document.getElementById('checkoutBtn').href = `https://wa.me/${PHONE_NUMBER}?text=${msg}`;
}
function toggleCart (open) { document.getElementById('cartOverlay').classList.toggle('open', open); }
document.getElementById('cartFab').addEventListener('click', () => toggleCart(true));
document.getElementById('cartBtn').addEventListener('click', () => toggleCart(true));
document.getElementById('cartCloseBtn').addEventListener('click', () => toggleCart(false));
document.getElementById('cartOverlay').addEventListener('click', (e) => { if (e.target.id === 'cartOverlay') toggleCart(false); });

/* --------------------------------------------------------------
   ESTADO ABIERTO / CERRADO — Lun-Vie 9:30-18:30 confirmado en
   Google Maps. Fin de semana NO confirmado -> se muestra estado
   neutro, no se asume cerrado ni abierto.
-------------------------------------------------------------- */
function updateOpenStatus () {
  let day, minutes;
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Santiago', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(now);
    const map = {}; parts.forEach(p => map[p.type] = p.value);
    const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    day = weekdayMap[map.weekday];
    minutes = parseInt(map.hour) * 60 + parseInt(map.minute);
  } catch (e) {
    const now = new Date(); day = now.getDay(); minutes = now.getHours() * 60 + now.getMinutes();
  }

  const navDot = document.getElementById('statusDot');
  const navText = document.getElementById('statusText');
  const heroDot = document.getElementById('heroStatusDot');
  const heroText = document.getElementById('heroStatusText');
  const visitLine = document.getElementById('visitStatusLine');

  function setAll (dotClass, label, visitColor) {
    [navDot, heroDot].forEach(d => { d.className = 'status-dot ' + dotClass; });
    [navText, heroText].forEach(t => { t.textContent = label; });
    if (visitLine) {
      visitLine.textContent = label;
      visitLine.style.cssText = 'font-family:"Space Mono",monospace; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; color:' + visitColor + ';';
    }
  }

  if (day === 0 || day === 6) {
    setAll('neutral', 'Horario de fin de semana a confirmar', 'rgba(243,239,228,0.55)');
    return;
  }
  const isOpen = minutes >= 9 * 60 + 30 && minutes < 18 * 60 + 30;
  if (isOpen) {
    setAll('', 'Abierto ahora', '#6fae5a');
  } else {
    setAll('closed', 'Cerrado ahora', 'var(--crimson)');
  }
}
updateOpenStatus();
setInterval(updateOpenStatus, 60000);

/* --------------------------------------------------------------
   INIT
-------------------------------------------------------------- */
renderFilters();
renderGrid();
renderCart();
