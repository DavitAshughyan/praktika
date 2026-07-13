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

let filters = JSON.parse(localStorage.getItem("filters")) || {
    search: "",
    minPrice: 0,
    maxPrice: "",
    category: "all",
    sort: "default",
    rating: 0,
};

function saveFilters() {
    localStorage.setItem("filters", JSON.stringify(filters));
}

const gallery = document.querySelector(".gallery-content");
const search = document.querySelector("#search");
const minPrice = document.querySelector("#min-price");
const maxPrice = document.querySelector("#max-price");
const resetFilters = document.querySelector("#reset-filters");
const categoryFilter = document.querySelector("#category-filter");
const sortFilter = document.querySelector("#sort-filter");
const ratingFilter = document.querySelector("#rating-filter");

if (filters.maxPrice === null) {
    filters.maxPrice = "";
}

search.value = filters.search;
sortFilter.value = filters.sort;
categoryFilter.value = filters.category;

if (filters.minPrice !== 0) {
    minPrice.value = filters.minPrice;
}

if (filters.maxPrice !== Infinity) {
    maxPrice.value = filters.maxPrice;
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
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

    applyFilters();

    updateCartCount();
  } catch (error) {
    console.log(error);
  }
}


function createRatingStars(rate) {

    let stars = "";

    for(let i = 1; i <= 5; i++) {

        if(i <= Math.round(rate)) {

            stars += "★";

        } else {

            stars += "☆";

        }

    }

    return stars;

}

function createUserStars(id) {

    const current = ratings[id] || 0;

    let html = `

        <div class="user-rating-title">
            ${current === 0 ? "Rate this product" : "Your rating"}
        </div>

        <div class="stars-container">

    `;


    for (let i = 1; i <= 5; i++) {

        html += `

            <span
                class="user-star ${i <= current ? "active" : ""}"
                data-rating="${i}">
                ★
            </span>

        `;

    }


    html += `</div>`;


    return html;

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

                <div class="rating-box">

                    <div class="api-rating">

                        ${createRatingStars(card.rating.rate)}

                        <span class="rating-number">
                            ${card.rating.rate}
                            (${card.rating.count})
                        </span>

                    </div>

                    <div
                        class="user-stars"
                        data-id="${card.id}">

                        ${createUserStars(card.id)}

                    </div>

                </div>

                <button
                    class="cart-btn"
                    data-id="${card.id}">
                    🛒 Add to Cart
                </button>

            </div>

        </article>

        `,
    );
  });

  addEvents();
  addCartEvents();
  addRatingEvents();
}

function applyFilters() {

  let result = [...cards];

  // search
  result = result.filter(card =>
    card.title.toLowerCase().includes(filters.search) ||
    card.description.toLowerCase().includes(filters.search) ||
    card.category.toLowerCase().includes(filters.search)
  );

  // price
    result = result.filter(card => {

    const min = filters.minPrice === ""
        ? 0
        : filters.minPrice;

    const max = filters.maxPrice === ""
        ? Infinity
        : filters.maxPrice;


    return card.price >= min && card.price <= max;

});

  // category
  if (filters.category !== "all") {

      result = result.filter(card =>
          card.category === filters.category
      );

  }

  if (filters.rating > 0) {

    result = result.filter(card => {

        return card.rating.rate >= filters.rating;

    });

  }

  switch(filters.sort) {


      case "price-asc":

          result.sort((a,b) =>
              a.price - b.price
          );

          break;



      case "price-desc":

          result.sort((a,b) =>
              b.price - a.price
          );

          break;



      case "rating-desc":

          result.sort((a,b) => {

              const ratingA = ratings[a.id] || a.rating.rate;
              const ratingB = ratings[b.id] || b.rating.rate;

              return ratingB - ratingA;

          });

          break;

  }

  renderCards(result);

}

search.addEventListener("input", function () {

    filters.search = this.value.toLowerCase().trim();

    saveFilters();

    applyFilters();

});

minPrice.addEventListener("input", () => {

    filters.minPrice = Number(minPrice.value) || 0;

    saveFilters();

    applyFilters();

});

maxPrice.addEventListener("input", () => {

    filters.maxPrice = maxPrice.value
        ? Number(maxPrice.value)
        : "";

    saveFilters();

    applyFilters();

});

categoryFilter.addEventListener("change", () => {

    filters.category = categoryFilter.value;

    saveFilters();

    applyFilters();

});

sortFilter.addEventListener("change", () => {

    filters.sort = sortFilter.value;

    saveFilters();

    applyFilters();

});

ratingFilter.addEventListener("change",()=>{

filters.rating = Number(
    ratingFilter.value
);

saveFilters();

applyFilters();

});

if (resetFilters) {

    resetFilters.addEventListener("click", () => {

        filters = {
            search: "",
            minPrice: 0,
            maxPrice: "",
            category: "all",
            sort: "default",
        };

        search.value = "";
        minPrice.value = "";
        maxPrice.value = "";
        categoryFilter.value = "all";
        sortFilter.value = "default";

        saveFilters();

        applyFilters();

    });

}

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
      updateFavoritesCount();

      applyFilters();

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

function addRatingEvents() {

    document.querySelectorAll(".user-stars").forEach((starsBlock) => {

        const id = Number(starsBlock.dataset.id);

        const stars = starsBlock.querySelectorAll(".user-star");

        // Показывает указанное количество закрашенных звёзд
        function paint(value) {

            stars.forEach((star) => {

                const rating = Number(star.dataset.rating);

                star.classList.toggle("active", rating <= value);

            });

        }

        // При загрузке показываем сохранённую оценку
        paint(ratings[id] || 0);

        // Наведение мышью
       stars.forEach((star) => {

          star.addEventListener("click", () => {

              const value = Number(star.dataset.rating);


              // если нажали на уже выбранную оценку - удаляем её
              if (ratings[id] === value) {

                  delete ratings[id];

              } else {

                  ratings[id] = value;

              }


              localStorage.setItem(
                  "ratings",
                  JSON.stringify(ratings)
              );


              applyFilters();

          });

      });

        // Когда мышь ушла — возвращаем сохранённую оценку
        starsBlock.addEventListener("mouseleave", () => {

            paint(ratings[id] || 0);

        });

    });

}

loadProducts();
updateCartCount();

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const favoritesCount = document.querySelector("#favorites-count");

    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
    }
}

updateFavoritesCount();