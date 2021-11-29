"use strict";

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const skillsList = document.querySelector('.skills-list');
const addedSkillsNames = [];


class Skill {
    #name = "No name";
    #ratio = 0;

    constructor(name, ratio) {
        this.#name = replaceAll(name, '<', '&lt');
        this.#name = replaceAll(this.#name, '>', '&gt');
        this.#ratio = ratio;
    }

    addToPage() {
        skillsList.insertAdjacentHTML('beforeend', this.#createHTML());
        skillsList.lastElementChild.querySelector('.skill__button-delete')
            .addEventListener("click", () => {
                    skillsList.removeChild(skillsList.lastElementChild);
                    addedSkillsNames.splice(addedSkillsNames.indexOf(this.#name), 1);
                }
            );
        addedSkillsNames.push(this.#name);
    }

    #createHTML() {
        return `
        <div class="skill">
            <div class="skill__upper-part">
                <p class="skill__name">${this.#name}</p>
                <p class="skill__ratio">${this.#ratio}</p>
            </div>
            <div class="skill__lower-part">
                <progress class="skill__bar" max="100" value=${this.#ratio}></progress>
                <div class="skill__button-delete"></div>
            </div>
        </div>`;
    }
}

const visibilityButton = document.querySelector('.skills-adder__button-visibility');
const addForm = document.querySelector('.skills-adder__form');

visibilityButton.addEventListener("click", () => {
    if (addForm.style.visibility === "visible") {
        addForm.style.visibility = "hidden";
    } else {
        addForm.style.visibility = "visible";
    }
});

const errorBlock = addForm.querySelector('.error-block');

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (errorBlock.textContent) {
        errorBlock.textContent = "";
    }

    const name = document.querySelector('.skills-adder__input-name').value;
    const ratio = document.querySelector('.skills-adder__input-ratio').value;

    if (ratio < 0 || ratio > 100) {
        errorBlock.textContent = "Рейтинг должен быть от 0 до 100!";
        return;
    }

    if (!name || !ratio) {
        errorBlock.textContent = "Вы ввели пустое значение!";
        return;
    }

    if (addedSkillsNames.includes(name)) {
        errorBlock.textContent = "Такой уже есть!";
        return;
    }

    const skill = new Skill(name, ratio);
    skill.addToPage();
});