const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
    <div class="empty-cart">
        <h2>Корзина пуста</h2>
        <p>Добавьте товары на главной странице.</p>
    </div>
`;

    if (cartTotal) {
      cartTotal.textContent = "Итого: $0.00";
    }

    return;
  }

  cart.forEach((item, index) => {
    cartItems.insertAdjacentHTML(
      "beforeend",
      `
            <article class="cart-card">

                <img src="${item.image}" alt="${item.title}">

                <div class="cart-info">

                    <h3>${item.title}</h3>

                    <p>${item.description}</p>

                    <p>
                        Цена: $${item.price}
                    </p>

                    <p>
                        Количество: ${item.quantity}
                    </p>

                    <p>
                        Сумма:
                        $${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div class="cart-controls">

                        <div class="quantity">

                            <button class="minus-btn" data-index="${index}">
                                −
                            </button>

                            <span class="quantity-value">
                                ${item.quantity}
                            </span>

                            <button class="plus-btn" data-index="${index}">
                                +
                            </button>

                        </div>

                        <button class="delete-btn" data-index="${index}">
                            <span class="delete-icon">🗑</span>
                            Удалить
                        </button>

                    </div>

                </div>

            </article>
            `,
    );
  });

  addDeleteEvents();
  addQuantityEvents();
  updateTotal();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartTotal) {
    cartTotal.textContent = `Итого: $${total.toFixed(2)}`;
  }
}

function addQuantityEvents() {
  document.querySelectorAll(".plus-btn").forEach((button) => {
    button.onclick = () => {
      const index = button.dataset.index;

      cart[index].quantity++;

      saveCart();

      renderCart();
    };
  });

  document.querySelectorAll(".minus-btn").forEach((button) => {
    button.onclick = () => {
      const index = button.dataset.index;

      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      }

      saveCart();

      renderCart();
    };
  });
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addDeleteEvents() {
  const buttons = document.querySelectorAll(".delete-btn");

  buttons.forEach((button) => {
    button.onclick = () => {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      saveCart();

      renderCart();
    };
  });
}

renderCart();

const clearBtn = document.querySelector("#clear-cart");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    cart = [];

    localStorage.removeItem("cart");

    renderCart();
  });
}

const backBtn = document.querySelector(".back-btn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    history.back();
  });
}
