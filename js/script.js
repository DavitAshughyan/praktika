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

links.forEach(link => {

    link.addEventListener("click", () => {

        burger.classList.remove("active");
        nav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("lock");

    });

});

const animatedElements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");
            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.2
});

animatedElements.forEach(element => {
    observer.observe(element);
});

const cards = [
  {
    image: "img/lerner.png",
    title: "Горы",
    text: "Живописные горные пейзажи с чистым воздухом."
  },
  {
    image: "img/covap.jpg",
    title: "Море",
    text: "Лазурное побережье с теплой водой и песчаным пляжем."
  },
  {
    image: "img/antar.jpg",
    title: "Лес",
    text: "Зеленый лес с высокими деревьями и свежей природой."
  },
  {
    image: "img/lich.jpg",
    title: "Озеро",
    text: "Спокойное озеро, окруженное живописными холмами."
  },
  {
    image: "img/mayramut.jpg",
    title: "Закат",
    text: "Яркие краски вечернего неба на закате."
  },
  {
    image: "img/tiezerq.jpg",
    title: "Космос",
    text: "Звезды, планеты и бескрайняя Вселенная."
  },
  {
    image: "img/anapat.jpg",
    title: "Пустыня",
    text: "Бескрайние песчаные дюны под ярким солнцем."
  },
  {
    image: "img/qaxaq.jpg",
    title: "Город",
    text: "Современный мегаполис с ночными огнями."
  },
  {
    image: "img/caxikner.png",
    title: "Цветы",
    text: "Красочные цветы, распустившиеся весной."
  },
  
];

const gallery = document.querySelector(".gallery-content");
const search = document.querySelector("#search");

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

function updateCartCount() {

    const count = document.querySelector("#cart-count");

    if (count) {
        count.textContent = favorites.length;
    }

}

function renderCards(arr){

    gallery.innerHTML = "";

    arr.forEach(card=>{

        const liked = favorites.some(item=>item.title===card.title);

        gallery.insertAdjacentHTML("beforeend",`

        <article class="card">

    <div class="card-image">

        <img src="${card.image}" alt="${card.title}">

        <button
            class="like-btn ${liked ? "active" : ""}"
            data-title="${card.title}">
            ❤
        </button>

    </div>

    <h3>${card.title}</h3>

    <p>${card.text}</p>

</article>

        `);

    });

    addEvents();

}

// search
search.addEventListener("input", function () {

    const value = this.value.toLowerCase().trim();

    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(value) ||
        card.text.toLowerCase().includes(value)
    );

    renderCards(filteredCards);

});

function addEvents(){

    document.querySelectorAll(".like-btn").forEach(button=>{

        button.onclick=()=>{

            const title=button.dataset.title;

            const product=cards.find(card=>card.title===title);

            const index=favorites.findIndex(item=>item.title===title);

            if(index===-1){

                favorites.push(product);

            }else{

                favorites.splice(index,1);

            }

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            renderCards(cards);

            updateCartCount();

        };

    });

}


/* function updateCart(){

    document.querySelector("#cart-count").textContent =
    favorites.length;

    const items=document.querySelector("#cart-items");

    items.innerHTML="";

    favorites.forEach(item=>{

        items.insertAdjacentHTML("beforeend",`

        <div class="cart-item">

            <img src="${item.image}" width="60">

            <div>

                <h4>${item.title}</h4>

                <p>${item.text}</p>

            </div>

            <button class="remove"
                data-title="${item.title}">
                ✖
            </button>

        </div>

        `);

    });

    document.querySelectorAll(".remove").forEach(btn=>{

        btn.onclick=()=>{

            favorites=favorites.filter(item=>
                item.title!==btn.dataset.title
            );

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            updateCart();

            renderCards(cards);

        };

    });

}

const cart=document.querySelector(".cart");

const cartWindow=document.querySelector(".cart-window");

cart.onclick=()=>{

    cartWindow.classList.toggle("show");

} */

renderCards(cards);

function updateCartCount() {

    document.querySelector("#cart-count").textContent =
        favorites.length;

}

localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
);

renderCards(cards);

updateCartCount();