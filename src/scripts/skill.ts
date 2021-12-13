function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export class Skill {
    private name: string;
    private ratio: number;
    private skillsList: Element;
    private addedSkillsNames: Array<string>;

    constructor(name: string, ratio: number, skillsList: Element, addedSkillsNames: Array<string>) {
        this.name = replaceAll(name, '<', '&lt');
        this.name = replaceAll(this.name, '>', '&gt');
        this.ratio = ratio;
        this.skillsList = skillsList;
        this.addedSkillsNames = addedSkillsNames;
    }

    public addToPage() {
        this.skillsList.insertAdjacentHTML('beforeend', this.createHTML());
        this.skillsList.lastElementChild!.querySelector('.skill__button-delete')!
            .addEventListener("click", () => {
                    this.skillsList.removeChild(this.skillsList.lastElementChild!);
                    this.addedSkillsNames.splice(this.addedSkillsNames.indexOf(this.name), 1);
                }
            );
        this.addedSkillsNames.push(this.name);
    }

    private createHTML() {
        return `
        <div class="skill">
            <div class="skill__upper-part">
                <p class="skill__name">${this.name}</p>
                <p class="skill__ratio">${this.ratio}</p>
            </div>
            <div class="skill__lower-part">
                <progress class="skill__bar" max="100" value=${this.ratio}></progress>
                <div class="skill__button-delete"></div>
            </div>
        </div>`;
    }
}