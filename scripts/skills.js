"use strict";

const skillsList = document.querySelector('.skills-list');
let addedSkillsNames = [];

class Skill {
    #name = "No name";
    #ratio = 0;

    constructor(name, ratio) {
        this.#name = name;
        this.#ratio = ratio;
    }

    addToPage() {
        skillsList.insertAdjacentHTML('beforeend', this.#createHTML());
        skillsList.lastElementChild.querySelector('.skill__button-delete')
            .addEventListener("click", (event) => {
                    skillsList.removeChild(skillsList.lastElementChild);
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

const addButton = document.querySelector('.skills-adder__button-add');

addButton.addEventListener("click", (event) => {
    //Потом эту функцию переделать на открытие input-ов
    const name = document.querySelector('.skills-adder__input-name').value;
    const ratio = document.querySelector('.skills-adder__input-ratio').value;

    if (!name || !ratio) {
        console.log("Вы ввели пустое значение");
        return;
    }

    if (addedSkillsNames.includes(name)) {
        console.log("Такой уже есть");
        return;
    }

    const skill = new Skill(name, ratio);
    skill.addToPage();
    console.log("Added");
});