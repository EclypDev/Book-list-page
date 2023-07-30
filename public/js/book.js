function showBook(name, pages, genr, img, desc, year, isbn, author, element) {
    function createElementsAppend() {
        const bookListItem = document.createElement("div");
        bookListItem.setAttribute("class", "book-list-item");
        const bookListItemTitle = document.createElement("div");
        bookListItemTitle.setAttribute("class", "book-list-item-title");
        const bookImg = document.createElement("img");
        bookImg.setAttribute("src", img);
        bookImg.setAttribute("alt", name);
        bookImg.setAttribute("class", "book-list-item-title-img");
        bookListItemTitle.append(bookImg);

        //Details
        const bookListItemdetails = document.createElement("div");
        bookListItemdetails.setAttribute("class", "book-list-item-details");
        const bookListItemdetailsP = document.createElement("p");
        bookListItemdetailsP.setAttribute("class", "book-list-item-details-p");
        bookListItemdetailsP.innerHTML = name;
        bookListItemdetails.append(bookListItemdetailsP);
        const bookListItemdetailsDesc = document.createElement("div");
        bookListItemdetailsDesc.setAttribute(
            "class",
            "book-list-item-details-desc"
        );
        bookListItemdetails.append(bookListItemdetailsDesc);
        const bookListItemdetailsDescP = document.createElement("p");
        bookListItemdetailsDescP.setAttribute(
            "class",
            "book-list-item-details-desc-p"
        );
        bookListItemdetailsDescP.innerHTML = desc;
        bookListItemdetailsDesc.append(bookListItemdetailsDescP);
        bookListItemdetails.append(bookListItemdetailsDesc);
        const bookListItemdetailsDescPAuthor = document.createElement("p");
        bookListItemdetailsDescPAuthor.setAttribute(
            "class",
            "book-list-item-details-desc-p-author"
        );
        bookListItemdetailsDescPAuthor.innerHTML = "Por " + author.name;
        bookListItemdetailsDesc.append(bookListItemdetailsDescPAuthor);
        //Buttons
        const bookListItemButtons = document.createElement("div");
        bookListItemButtons.setAttribute("class", "book-list-item-buttons");
        const bookListItemButtonsSee = document.createElement("button");

        let datosRecuperadosJSON = localStorage.getItem("books_read");
        let datosRecuperados = JSON.parse(datosRecuperadosJSON);

        if (datosRecuperados.includes(name)) {
            bookListItemButtonsSee.innerHTML = "Leer";
            bookListItemButtonsSee.style.backgroundColor = "#ca6201";
            bookListItemButtonsSee.setAttribute("class", "buttonSee readed");
        } else {
            bookListItemButtonsSee.innerHTML = "Agregar";
            bookListItemButtonsSee.setAttribute("class", "buttonSee");
        }
        bookListItemButtonsSee.setAttribute("value", name);
        bookListItemButtons.append(bookListItemButtonsSee);
        bookListItem.append(bookListItemTitle);
        bookListItem.append(bookListItemdetails);
        bookListItem.append(bookListItemButtons);
        bookListItem.append(bookListItemButtonsSee);
        return bookListItem;
    }
    element.append(createElementsAppend());

    //Title
}

let localbookJSON = localStorage.getItem("book_page");
let localbook = JSON.parse(localbookJSON);
let URL = `http://localhost:3000/api/v1/book/${localbook}`;
fetch(URL)
    .then((response) => response.json())
    .then((data) => (data = data.book))
    .then((book) => {
        let title = book.title;
        let pages = book.pages;
        let genr = book.genre;
        let img = book.cover;
        let year = book.year;
        let desc = book.synopsis;
        let author = book.author;
        let isbn = book.ISBN;
        let element = document.querySelector(".book-zone");
        showBook(title, pages, genr, img, desc, year, isbn, author, element);
    });

$("#return-button").on("click", (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/";
});
