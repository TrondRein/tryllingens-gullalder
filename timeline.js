
let allItems = [];

fetch('data/tryllingens_gullalder_full.json')
  .then(res => res.json())
  .then(data => {
    allItems = data.timelineItems;
    renderTimeline(allItems);
  });

function filterData(type) {
  const filtered = type === 'alle' ? allItems : allItems.filter(item => item.category === type);
  renderTimeline(filtered);
}

function renderTimeline(items) {
  const container = document.getElementById('timeline-items');
  container.innerHTML = '';
  const popup = document.getElementById('popup');
  const popupInner = document.getElementById('popup-inner');
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.onclick = () => popup.style.display = 'none';

  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <div class="content">
        <h2>${item.year} – ${item.title}</h2>
        <p>${item.summary}</p>
        ${item.image ? `<img src="${item.image}" alt="${item.imageAlt}">` : ''}
      </div>
    `;
    div.querySelector('.content').onclick = () => {
      popupInner.innerHTML = `
        <h2>${item.year} – ${item.title}</h2>
        <p>${item.details}</p>
        ${item.image ? `<img src="${item.image}" alt="${item.imageAlt}">` : ''}
      `;
      popup.style.display = 'flex';
    };
    container.appendChild(div);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
}
