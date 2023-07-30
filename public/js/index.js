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
} // Función para guardar libros leidos
function GuardarCategoriaSeleccionada() {
    let categorySel = document.getElementById("categoriaSeleccionada");
    categorySel.addEventListener("change", function () {
        let valorSeleccionado = this.value;

        // Guardar el valor seleccionado en localStorage
        localStorage.setItem("category_selected", valorSeleccionado);
    });
} // Función para guardar la categoria
function showBooks(name, img, desc, author, gen, element) {
    let categorySel = $(".category");
    let categorySelected = categorySel.val();
    function createElementsAppend() {
        let bookListItem = document.createElement("div");
        bookListItem.setAttribute("class", "book-list-item");
        bookListItem.setAttribute("id", "book-disponible");
        let bookListItemTitle = document.createElement("div");
        bookListItemTitle.setAttribute("class", "book-list-item-title");
        let bookImg = document.createElement("img");
        bookImg.setAttribute("src", img);
        bookImg.setAttribute("alt", name);
        bookImg.setAttribute("class", "book-list-item-title-img");
        bookListItemTitle.append(bookImg);

        //Details
        let bookListItemdetails = document.createElement("div");
        bookListItemdetails.setAttribute("class", "book-list-item-details");
        let bookListItemdetailsP = document.createElement("p");
        bookListItemdetailsP.setAttribute("class", "book-list-item-details-p");
        bookListItemdetailsP.innerHTML = name;
        bookListItemdetails.append(bookListItemdetailsP);
        let bookListItemdetailsDesc = document.createElement("div");
        bookListItemdetailsDesc.setAttribute(
            "class",
            "book-list-item-details-desc"
        );
        bookListItemdetails.append(bookListItemdetailsDesc);
        let bookListItemdetailsDescP = document.createElement("p");
        bookListItemdetailsDescP.setAttribute(
            "class",
            "book-list-item-details-desc-p"
        );
        bookListItemdetailsDescP.innerHTML = desc;
        bookListItemdetailsDesc.append(bookListItemdetailsDescP);
        bookListItemdetails.append(bookListItemdetailsDesc);
        let bookListItemdetailsDescPAuthor = document.createElement("p");
        bookListItemdetailsDescPAuthor.setAttribute(
            "class",
            "book-list-item-details-desc-p-author"
        );
        bookListItemdetailsDescPAuthor.innerHTML = "Por " + author;
        bookListItemdetailsDesc.append(bookListItemdetailsDescPAuthor);
        //Buttons
        let bookListItemButtons = document.createElement("div");
        bookListItemButtons.setAttribute("class", "book-list-item-buttons");
        let bookListItemButtonsSee = document.createElement("button");
        let bookListItemButtonsDelete = document.createElement("button");
        bookListItemButtonsDelete.innerHTML = "Eliminar";
        bookListItemButtonsDelete.style.backgroundColor = "#d9373f";
        bookListItemButtonsDelete.setAttribute("value", name);
        bookListItemButtonsDelete.setAttribute(
            "class",
            "buttonSee delete-book"
        );

        let datosRecuperadosJSON = localStorage.getItem("books_read");
        let datosRecuperados = JSON.parse(datosRecuperadosJSON);
        bookListItemButtonsSee.innerHTML = "Agregar";
        bookListItemButtonsSee.setAttribute("class", "buttonSee anadir");
        bookListItemButtonsSee.setAttribute("id", "anadir");
        bookListItemButtonsSee.setAttribute("value", name);
        if (datosRecuperados.includes(name)) {
            bookListItemButtonsSee.innerHTML = "Ver";
            bookListItemButtonsSee.style.backgroundColor = "#ca6201";
            bookListItemButtonsSee.setAttribute("class", "buttonSee readed");
            bookListItemButtonsSee.setAttribute("id", "readed");
        }

        bookListItemButtons.append(bookListItemButtonsSee);
        if (datosRecuperados.includes(name)) {
            bookListItemButtons.append(bookListItemButtonsDelete);
        }
        bookListItem.append(bookListItemTitle);
        bookListItem.append(bookListItemdetails);
        bookListItem.append(bookListItemButtons);
        bookListItem.append(bookListItemButtonsSee);
        return bookListItem;
    }
    element.append(createElementsAppend());

    //Title
} //Funcion para mostrar lista de libros disponibles
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
                let gen = book.book.genre;
                let author = book.book.author.name;
                let gridlayout = $("#lista-lectura");
                let generoLocalStorage =
                    localStorage.getItem("category_selected");
                if (generoLocalStorage == gen) {
                    if (datosRecuperados.includes(name)) {
                        showBooks(name, img, desc, author, gen, gridlayout);
                    }
                }
            });
        });
} //Funcion para mostrar lista de libros personales
function EstablecerCategoria() {
    const elementOp = document.querySelector(".category");
    const valorPorDefecto = localStorage.getItem("category_selected");
    if (valorPorDefecto) {
        const optionPorDefecto = document.createElement("option");
        optionPorDefecto.value = valorPorDefecto;
        optionPorDefecto.textContent = valorPorDefecto;
        elementOp.appendChild(optionPorDefecto);
        elementOp.value = valorPorDefecto;
    }
}
//Obtiene datos desde la api (libros)
fetch("http://localhost:3000/api/v1/books")
    .then((response) => response.json())
    .then((books) => {
        let datosRecuperadosJSON = localStorage.getItem("books_read");
        let datosRecuperados = JSON.parse(datosRecuperadosJSON) || []; // Si no hay datos, se inicializa como un array vacío

        let elementOp = document.querySelector(".category");
        let generoLocalStorage = localStorage.getItem("category_selected");

        books.forEach((book) => {
            let name = book.book.title;
            let img = book.book.cover;
            let desc = book.book.synopsis;
            let author = book.book.author.name;
            let gen = book.book.genre;
            let gridlayout = $("#libros");

            // Mover la función createOptions fuera del bucle
            function createOptions(genero, elementOption) {
                let opcionesExistentes =
                    elementOption.querySelectorAll("option");
                let valorExistente = Array.from(opcionesExistentes).some(
                    (opcion) => opcion.value === genero
                );

                if (!valorExistente) {
                    let option = document.createElement("option");
                    option.setAttribute("value", genero);
                    option.innerHTML = genero;
                    // Append solo si el valor no existe aún
                    elementOption.append(option);
                }
            }

            // Llamada a la función createOptions fuera del condicional
            createOptions(gen, elementOp);

            // Corregir la condición para comparar adecuadamente los valores
            if (generoLocalStorage === gen) {
                if (!datosRecuperados.includes(name)) {
                    showBooks(name, img, desc, author, gen, gridlayout);
                }
            }
        });

        showBooksPersonal();
    });

//Guardar a libros personales
$(document).on("click", ".anadir", function () {
    let valor = $(this).attr("value");
    let url = `http://localhost:3000/api/v1/book/${valor}`;

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
//Eliminar un libro de la lista personal.
$(document).on("click", ".delete-book", function () {
    let valor = $(this).attr("value");
    let datosRecuperadosJSON = localStorage.getItem("books_read");
    let datosRecuperados = JSON.parse(datosRecuperadosJSON);

    function findIndexAndRemove(data, value) {
        let index = data.indexOf(value);
        if (index !== -1) {
            data.splice(index, 1); // Elimina 1 elemento en el índice encontrado
            localStorage.setItem("books_read", JSON.stringify(data));
        }
    }

    findIndexAndRemove(datosRecuperados, valor);
});
//Redirije a la pagina book
$(document).on("click", ".readed", function () {
    let valor = $(this).attr("value");
    localStorage.removeItem("book_page");
    localStorage.setItem("book_page", JSON.stringify(valor));
    window.location.href = "http://localhost:3000/book";
});
GuardarCategoriaSeleccionada();
EstablecerCategoria();

function mostrarNumeroDeElementos(element, append) {
    let containerDisponibles = $(append);
    let disponibleH5 = document.createElement("h5");
    let numeroDeElementos = document.querySelectorAll(element).length;
    disponibleH5.innerHTML = numeroDeElementos;

    containerDisponibles.append(disponibleH5);
}

setTimeout(function () {
    mostrarNumeroDeElementos("#anadir", "#disponibles");
}, 200);
setTimeout(function () {
    mostrarNumeroDeElementos("#readed", "#lectura");
}, 200);
