const favoritesItems = document.querySelector("#favorites-items");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function renderFavorites() {

  const lang = localStorage.getItem("language") || "en";

  const t = translations[lang];

  favoritesItems.innerHTML = "";

  if (favorites.length === 0) {
    favoritesItems.innerHTML = `
      <div class="empty-cart">
        <h2>${translations[lang].emptyFavorites}</h2>
        <p>${translations[lang].addProducts}</p>
      </div>
    `;
    return;
  }

  favorites.forEach((item, index) => {
    favoritesItems.insertAdjacentHTML(
      "beforeend",
      `
      <article class="cart-card">

        <img src="${item.image}" alt="${item.title}">

        <div class="cart-info">

          <h3>${item.title}</h3>

          <p>${item.description}</p>

          <p>${t.price} $${item.price}</p>

          <button class="delete-btn" data-index="${index}">
            🗑 ${t.remove}
          </button>

        </div>

      </article>
      `
    );
  });

  addDeleteEvents();
}

function addDeleteEvents() {
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.onclick = () => {
      favorites.splice(button.dataset.index, 1);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      renderFavorites();
    };
  });
}

renderFavorites();

document.querySelector(".back-btn").onclick = () => history.back();

const backBtn = document.querySelector(".back-btn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "index.html";
    }
  });
}