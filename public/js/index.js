// Obtener referencias a elementos del DOM

// Función para mostrar libros en la página web

function showBooks(name, img, desc, author, element) {
    //Title
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
    bookListItemButtonsSee.innerHTML = "Ver";
    bookListItemButtonsSee.setAttribute("value", name);
    bookListItemButtonsSee.setAttribute("class", "buttonSee");
    bookListItemButtons.append(bookListItemButtonsSee);
    bookListItem.append(bookListItemTitle);
    bookListItem.append(bookListItemdetails);
    bookListItem.append(bookListItemButtons);
    bookListItem.append(bookListItemButtonsSee);
    element.append(bookListItem);
}
// Obtener los libros de la API y mostrarlos en la página

fetch("http://localhost:3000/api/v1/books")
    .then((response) => response.json())
    .then((books) => {
        books.forEach((data) => {
            const name = data.book.title;
            const img = data.book.cover;
            const desc = data.book.synopsis;
            const author = data.book.author.name;
            const gridlayout = $("#libros");
            showBooks(name, img, desc, author, gridlayout);
        });
    });


// Definir imagen y elemento por defecto

// Función para enviar datos a un servidor
