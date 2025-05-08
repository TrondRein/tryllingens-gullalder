
let data = [];

fetch('data/tryllingens_gullalder_full_complete.json')
  .then(response => response.json())
  .then(json => {
    data = json.timelineItems;
    renderTimeline(data);
  });

function filterData(type) {
  const filtered = type === 'alle' ? data : data.filter(item => item.category === type);
  renderTimeline(filtered);
}

function renderTimeline(items) {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <h3>${item.year} – ${item.title}</h3>
      <p>${item.summary}</p>
      <img src="${item.image}" alt="${item.imageAlt}" style="max-width:100%;">
      <p><a href="${item.video}" target="_blank">Se video</a></p>
    `;
    container.appendChild(el);
  });
}
