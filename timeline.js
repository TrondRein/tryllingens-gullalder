
let data = [];

fetch('data/data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    renderTimeline(data);
  });

function filterData(type) {
  const filtered = type === 'alle' ? data : data.filter(item => item.type === type);
  renderTimeline(filtered);
}

function renderTimeline(items) {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <h3>${item.år} – ${item.tittel}</h3>
      <p>${item.beskrivelse}</p>
      ${item.bilde ? `<img src="${item.bilde}" alt="${item.tittel}" style="max-width:100%;">` : ''}
      ${item.video ? `<p><a href="${item.video}" target="_blank">Se video</a></p>` : ''}
      ${item.lyd ? `<p><a href="${item.lyd}" target="_blank">Hør lyd</a></p>` : ''}
    `;
    container.appendChild(el);
  });
}
