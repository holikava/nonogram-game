import { createElement } from "./createElement";

export class Cell {
    constructor() {
        this.status = Math.random() < 0.5 ? 0 : 1;
    }

    create() {
        let elem = createElement("button", "playfield__cell");
        elem.setAttribute("value", this.status);
        return elem;
    }
}