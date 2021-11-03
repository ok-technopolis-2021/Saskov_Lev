function changeBusinessCardTheme(businessCard) {
    const bcClasses = businessCard.getAttribute("class");

    if (bcClasses.includes("business-card_theme_light")) {
        const bcDark = bcClasses.replace("business-card_theme_light", "business-card_theme_dark");
        businessCard.setAttribute("class", bcDark);
    } else if (bcClasses.includes("business-card_theme_dark")) {
        const bcLight = bcClasses.replace("business-card_theme_dark", "business-card_theme_light");
        businessCard.setAttribute("class", bcLight);
    }
}

const businessCard = document.getElementsByClassName("business-card")[0];
businessCard.onclick = function () {
    changeBusinessCardTheme(this);
}