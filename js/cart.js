const cartItems = document.querySelector("#cart-items");

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

function renderCart() {

    cartItems.innerHTML = "";

    if (favorites.length === 0) {

        cartItems.innerHTML = `
            <h2>Корзина пуста</h2>
            <p>Добавьте понравившиеся товары на главной странице.</p>
        `;

        return;
    }

    favorites.forEach((item, index) => {

        cartItems.insertAdjacentHTML(
            "beforeend",
            `
            <article class="cart-card">

                <img src="${item.image}" alt="${item.title}">

                <div class="cart-info">

                    <h3>${item.title}</h3>

                    <p>${item.text}</p>

                    <button class="delete-btn" data-index="${index}">
                        Удалить
                    </button>

                </div>

            </article>
            `
        );

    });

    addDeleteEvents();

}

function addDeleteEvents() {

    const buttons = document.querySelectorAll(".delete-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            favorites.splice(index, 1);

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            renderCart();

        });

    });

}

renderCart();

const clearBtn = document.querySelector("#clear-cart");

clearBtn.addEventListener("click", () => {

    favorites = [];

    localStorage.removeItem("favorites");

    renderCart();

});

const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {

    history.back();

});