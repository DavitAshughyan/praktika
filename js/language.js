const translations = {

    en: {
        search: "Search...",
        home: "Home",
        about: "About",
        projects: "Projects",
        contact: "Contact",
        reset: "Reset",

        heroTitle: "I'm John.<br>I build beautiful responsive websites.",
        viewPortfolio: "View Portfolio",
        hireMe: "Hire Me",

        aboutTitle: "I can help.",

        aboutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",

        webDesign: "WEB DESIGN",
        responsive: "RESPONSIVE DESIGN",
        uiDesign: "UI DESIGN",
        mobileApps: "MOBILE APPS",

        priceFrom: "Price from",
        priceTo: "Price to",

        allCategories: "📦 All categories",
        electronics: "📱 Electronics",
        jewelery: "💍 Jewelery",
        menClothing: "👔 Men's clothing",
        womenClothing: "👗 Women's clothing",

        defaultSort: "🔄 Default",
        priceAsc: "📈 Price: Low → High",
        priceDesc: "📉 Price: High → Low",
        ratingDesc: "⭐ Rating: High → Low",

        allRatings: "⭐ All ratings",
        fourStars: "4+ ⭐⭐⭐⭐",
        threeStars: "3+ ⭐⭐⭐",
        twoStars: "2+ ⭐⭐",

        projectsTitle: "My Projects",

        photo: "PHOTO",
        illustration: "ILLUSTRATION",
        website: "WEBSITE",
        airPrint: "AIR PRINT",
    },


    ru: {
        search: "Поиск...",
        home: "Главная",
        about: "О нас",
        projects: "Проекты",
        contact: "Контакты",
        reset: "Сбросить",

        heroTitle: "Я Джон.<br>Я создаю красивые адаптивные сайты.",
        viewPortfolio: "Посмотреть портфолио",
        hireMe: "Нанять меня",

        aboutTitle: "Я могу помочь.",

        aboutText: "Я создаю современные сайты с адаптивным дизайном и удобным интерфейсом.",

        webDesign: "ВЕБ-ДИЗАЙН",
        responsive: "АДАПТИВНЫЙ ДИЗАЙН",
        uiDesign: "UI ДИЗАЙН",
        mobileApps: "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ",

        priceFrom: "Цена от",
        priceTo: "Цена до",

        allCategories: "📦 Все категории",
        electronics: "📱 Электроника",
        jewelery: "💍 Украшения",
        menClothing: "👔 Мужская одежда",
        womenClothing: "👗 Женская одежда",

        defaultSort: "🔄 По умолчанию",
        priceAsc: "📈 Цена: от низкой к высокой",
        priceDesc: "📉 Цена: от высокой к низкой",
        ratingDesc: "⭐ Рейтинг: высокий → низкий",

        allRatings: "⭐ Все рейтинги",
        fourStars: "4+ ⭐⭐⭐⭐",
        threeStars: "3+ ⭐⭐⭐",
        twoStars: "2+ ⭐⭐",

        projectsTitle: "Мои проекты",

        photo: "ФОТО",
        illustration: "ИЛЛЮСТРАЦИЯ",
        website: "САЙТ",
        airPrint: "ПЕЧАТЬ",
    }

};


function changeLanguage(lang) {

    const t = translations[lang];

    if (!t) return;


    // обычные элементы
    document.querySelectorAll("[data-lang]").forEach(element => {

        const key = element.dataset.lang;

        if (t[key]) {

            if (key === "heroTitle") {
                element.innerHTML = t[key];
            } else {
                element.textContent = t[key];
            }

        }

    });


    // option в select
    document.querySelectorAll("option[data-lang]").forEach(option => {

        const key = option.dataset.lang;

        if (t[key]) {
            option.textContent = t[key];
        }

    });


    // placeholder
    document.querySelectorAll("[data-placeholder]").forEach(element => {

        const key = element.dataset.placeholder;

        if (t[key]) {
            element.placeholder = t[key];
        }

    });

}


document
    .getElementById("language-select")
    .addEventListener("change", function () {

        changeLanguage(this.value);

    });


changeLanguage("en");