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

cards.forEach(card => {
    gallery.insertAdjacentHTML(
        "beforeend",
        `
        <article class="card">
            <img src="${card.image}" alt="${card.title}">
            <h3>${card.title}</h3>
            <p>${card.text}</p>
        </article>
        `
    );
});