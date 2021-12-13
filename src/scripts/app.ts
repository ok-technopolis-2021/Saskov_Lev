import {Skill} from "./skill";

const visibilityButton = document.querySelector('.skills-adder__button-visibility');
const addForm = document.querySelector('.skills-adder__form') as HTMLElement;

visibilityButton!.addEventListener("click", () => {
    if (addForm.style.visibility === "visible") {
        addForm.style.visibility = "hidden";
    } else {
        addForm.style.visibility = "visible";
    }
});

const skillsList = document.querySelector('.skills-list');
let addedSkillsNames: Array<string> = [];
const errorBlock = addForm!.querySelector('.error-block');

addForm!.addEventListener("submit", (event) => {
    event.preventDefault();
    if (errorBlock!.textContent) {
        errorBlock!.textContent = "";
    }

    const name = (document.querySelector('.skills-adder__input-name') as HTMLInputElement).value;
    const ratio = parseInt((document.querySelector('.skills-adder__input-ratio') as HTMLInputElement).value);

    if (ratio < 0 || ratio > 100) {
        errorBlock!.textContent = "Рейтинг должен быть от 0 до 100!";
        return;
    }

    if (!name || !ratio) {
        errorBlock!.textContent = "Вы ввели пустое значение!";
        return;
    }

    if (addedSkillsNames.indexOf(name) != -1) {
        errorBlock!.textContent = "Такой уже есть!";
        return;
    }

    const skill = new Skill(name, ratio, skillsList, addedSkillsNames);
    skill.addToPage();
});