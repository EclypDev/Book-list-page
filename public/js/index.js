//Data save
(() => {
    let bookPageJSON = localStorage.getItem("book_page");
    let datosRecuperadosJSON = localStorage.getItem("books_read");
    if (datosRecuperadosJSON == null) {
        localStorage.setItem("books_read", JSON.stringify(["Juego de Tronos"]));
    }
    if (bookPageJSON == null) {
        localStorage.setItem("book_page", JSON.stringify("Juego de Tronos"));
    }
})();
// Función para mostrar libros en la página web
function GuardarLibrosLeidos(bookIn) {
    let title = bookIn.book.title;
    if (localStorage.getItem("books_read") == null) {
        localStorage.setItem("books_read", JSON.stringify([title]));
    } else {
        let datosRecuperadosJSON = localStorage.getItem("books_read");
        let datosRecuperados = JSON.parse(datosRecuperadosJSON);

        if (datosRecuperados && !datosRecuperados.includes(title)) {
            datosRecuperados.push(title);
            localStorage.setItem(
                "books_read",
                JSON.stringify(datosRecuperados)
            );
        }
    }
}
function showBooks(name, img, desc, author, element) {
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
        bookListItemdetailsDescPAuthor.innerHTML = "Por " + author;
        bookListItemdetailsDesc.append(bookListItemdetailsDescPAuthor);
        //Buttons
        const bookListItemButtons = document.createElement("div");
        bookListItemButtons.setAttribute("class", "book-list-item-buttons");
        const bookListItemButtonsSee = document.createElement("button");

        let datosRecuperadosJSON = localStorage.getItem("books_read");
        let datosRecuperados = JSON.parse(datosRecuperadosJSON);

        if (datosRecuperados.includes(name)) {
            bookListItemButtonsSee.innerHTML = "Ver";
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
// Obtener los libros de la API y mostrarlos en la página
function showBooksPersonal() {
    let datosRecuperadosJSON = localStorage.getItem("books_read");
    let datosRecuperados = JSON.parse(datosRecuperadosJSON);
    fetch("http://localhost:3000/api/v1/books")
        .then((response) => response.json())
        .then((books) => {
            books.forEach((book) => {
                let name = book.book.title;
                let img = book.book.cover;
                let desc = book.book.synopsis;
                let author = book.book.author.name;
                let gridlayout = $("#lista-lectura");
                if (datosRecuperados.includes(name)) {
                    showBooks(name, img, desc, author, gridlayout);
                }
            });
        });
}

//Obtiene datos desde la api (libros)
fetch("http://localhost:3000/api/v1/books")
    .then((response) => response.json())
    .then((books) => {
        books.forEach((book) => {
            let datosRecuperadosJSON = localStorage.getItem("books_read");
            let datosRecuperados = JSON.parse(datosRecuperadosJSON);

            let name = book.book.title;
            let img = book.book.cover;
            let desc = book.book.synopsis;
            let author = book.book.author.name;
            let gridlayout = $("#libros");

            if (!datosRecuperados.includes(name)) {
                showBooks(name, img, desc, author, gridlayout);
            }
        });
        showBooksPersonal();
    });

//Guardar libros personales
$(document).on("click", ".buttonSee", function () {
    let valor = $(this).attr("value");
    const url = `http://localhost:3000/api/v1/book/${valor}`;

    fetch(url)
        .then((response) => response.json())
        .then((book) => {
            let name = book.book.title;
            let datosRecuperadosJSON = localStorage.getItem("books_read");
            let datosRecuperados = JSON.parse(datosRecuperadosJSON);
            if (!datosRecuperados.includes(name)) {
                GuardarLibrosLeidos(book);
            }
        });
});

$(document).on("click", ".readed", function () {
    let valor = $(this).attr("value");
    localStorage.removeItem("book_page");
    localStorage.setItem("book_page", JSON.stringify(valor));
    let bookPageJSON = localStorage.getItem("book_page");
    let bookPage = JSON.parse(bookPageJSON);
    window.location.href = "http://localhost:3000/book";
});
