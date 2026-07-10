const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".nav-overlay");
const links = document.querySelectorAll(".nav-list a");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("lock");
});

overlay.addEventListener("click", () => {
  burger.classList.remove("active");
  nav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("lock");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("lock");
  });
});

const animatedElements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

animatedElements.forEach((element) => {
  observer.observe(element);
});

const API = "https://fakestoreapi.com/products";

let cards = [];

const gallery = document.querySelector(".gallery-content");
const search = document.querySelector("#search");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = document.querySelector("#cart-count");

  if (count) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    count.textContent = total;
  }
}

async function loadProducts() {
  try {
    const response = await fetch(API);

    if (!response.ok) {
      throw new Error("Ошибка загрузки");
    }

    cards = await response.json();

    renderCards(cards);

    updateCartCount();
  } catch (error) {
    console.log(error);
  }
}

function renderCards(arr) {
  gallery.innerHTML = "";

  arr.forEach((card) => {
    const liked = favorites.some((item) => item.id === card.id);

    gallery.insertAdjacentHTML(
      "beforeend",
      `

        <article class="card">

            <div class="card-image">

                <img src="${card.image}" alt="${card.title}">

                <button
                    class="like-btn ${liked ? "active" : ""}"
                    data-id="${card.id}">
                    ❤
                </button>

            </div>

           <h3>${card.title}</h3>

            <p>${card.description}</p>

            <div class="card-bottom">

                <h4 class="price">
                    $${card.price}
                </h4>

                <button
                    class="cart-btn"
                    data-id="${card.id}">
                    🛒 В корзину
                </button>

            </div>

        </article>

        `,
    );
  });

  addEvents();
  addCartEvents();
}

// search
search.addEventListener("input", function () {
  const value = this.value.toLowerCase().trim();

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(value) ||
      card.description.toLowerCase().includes(value) ||
      card.category.toLowerCase().includes(value),
  );

  renderCards(filteredCards);
});

function addEvents() {
  document.querySelectorAll(".like-btn").forEach((button) => {
    button.onclick = () => {
      const id = Number(button.dataset.id);

      const product = cards.find((card) => card.id === id);

      const index = favorites.findIndex((item) => item.id === id);

      if (index === -1) {
        favorites.push(product);
      } else {
        favorites.splice(index, 1);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      renderCards(cards);

      updateCartCount();
    };
  });
}

function addCartEvents() {
  document.querySelectorAll(".cart-btn").forEach((button) => {
    button.onclick = () => {
      const id = Number(button.dataset.id);

      const product = cards.find((card) => card.id === id);

      const existProduct = cart.find((item) => item.id === id);

      if (existProduct) {
        existProduct.quantity++;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
    };
  });
}

loadProducts();
updateCartCount();
