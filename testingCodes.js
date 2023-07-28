const defaultDiv = document.createElement("div");
defaultDiv.setAttribute("class", "defaultDiv");
class Book {
    constructor() {
        this.name = "Default";
        this.linkimg = "linkimg";
        this.element = defaultDiv;
    }
}
const book1 = new Book();
book1.name = "hola";
console.log(book1);
