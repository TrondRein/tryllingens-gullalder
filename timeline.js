
fetch('data/tryllingens_gullalder_full_complete.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('timeline-items');
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.innerHTML = '<div class="popup-content"><span class="close-btn">✖</span><div id="popup-inner"></div></div>';
    document.body.appendChild(popup);

    const popupInner = document.getElementById('popup-inner');
    const closeBtn = popup.querySelector('.close-btn');
    closeBtn.onclick = () => popup.style.display = 'none';

    data.timelineItems.forEach((item, index) => {
      const side = index % 2 === 0 ? 'left' : 'right';
      const div = document.createElement('div');
      div.className = 'timeline-item ' + side;

      const contentHTML = `
        <div class="content">
          <button class="more-info-btn" title="Mer info">🔍</button>
          <h2>${item.year} – ${item.title}</h2>
          <p>${item.summary}</p>
          ${item.image ? `<img src="${item.image}" alt="${item.imageAlt || ''}">` : ''}
          ${item.video ? `<p><a href="${item.video}" target="_blank">Se video</a></p>` : ''}
        </div>
      `;

      div.innerHTML = contentHTML;

      const openPopup = () => {
        popupInner.innerHTML = `
          <h2>${item.year} – ${item.title}</h2>
          <p>${item.details || item.summary}</p>
          ${item.image ? `<img src="${item.image}" alt="${item.imageAlt || ''}" style="max-width:100%;">` : ''}
          ${item.video ? `<p><a href="${item.video}" target="_blank">Se video</a></p>` : ''}
        `;
        popup.style.display = 'flex';
      };

      div.querySelector('.content').onclick = openPopup;
      div.querySelector('.more-info-btn').onclick = (e) => {
        e.stopPropagation();
        openPopup();
      };

      container.appendChild(div);
    });
  });
