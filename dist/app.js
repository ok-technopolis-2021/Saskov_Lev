function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
var Skill = /** @class */ (function () {
    function Skill(name, ratio, skillsList, addedSkillsNames) {
        this.name = replaceAll(name, '<', '&lt');
        this.name = replaceAll(this.name, '>', '&gt');
        this.ratio = ratio;
        this.skillsList = skillsList;
        this.addedSkillsNames = addedSkillsNames;
    }
    Skill.prototype.addToPage = function () {
        var _this = this;
        this.skillsList.insertAdjacentHTML('beforeend', this.createHTML());
        this.skillsList.lastElementChild.querySelector('.skill__button-delete')
            .addEventListener("click", function () {
            _this.skillsList.removeChild(_this.skillsList.lastElementChild);
            _this.addedSkillsNames.splice(_this.addedSkillsNames.indexOf(_this.name), 1);
        });
        this.addedSkillsNames.push(this.name);
    };
    Skill.prototype.createHTML = function () {
        return "\n        <div class=\"skill\">\n            <div class=\"skill__upper-part\">\n                <p class=\"skill__name\">".concat(this.name, "</p>\n                <p class=\"skill__ratio\">").concat(this.ratio, "</p>\n            </div>\n            <div class=\"skill__lower-part\">\n                <progress class=\"skill__bar\" max=\"100\" value=").concat(this.ratio, "></progress>\n                <div class=\"skill__button-delete\"></div>\n            </div>\n        </div>");
    };
    return Skill;
}());

var visibilityButton = document.querySelector('.skills-adder__button-visibility');
var addForm = document.querySelector('.skills-adder__form');
visibilityButton.addEventListener("click", function () {
    if (addForm.style.visibility === "visible") {
        addForm.style.visibility = "hidden";
    }
    else {
        addForm.style.visibility = "visible";
    }
});
var skillsList = document.querySelector('.skills-list');
var addedSkillsNames = [];
var errorBlock = addForm.querySelector('.error-block');
addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (errorBlock.textContent) {
        errorBlock.textContent = "";
    }
    var name = document.querySelector('.skills-adder__input-name').value;
    var ratio = parseInt(document.querySelector('.skills-adder__input-ratio').value);
    if (ratio < 0 || ratio > 100) {
        errorBlock.textContent = "Рейтинг должен быть от 0 до 100!";
        return;
    }
    if (!name || !ratio) {
        errorBlock.textContent = "Вы ввели пустое значение!";
        return;
    }
    if (addedSkillsNames.indexOf(name) != -1) {
        errorBlock.textContent = "Такой уже есть!";
        return;
    }
    var skill = new Skill(name, ratio, skillsList, addedSkillsNames);
    skill.addToPage();
});
