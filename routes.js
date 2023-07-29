import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "data.json");
const jsonData = fs.readFileSync(dataPath, "utf8");
const data = JSON.parse(jsonData);
const route = Router();

route.post("/", (req, res) => {
    let datos = req.body;
    console.log(datos);
});

//Files

route.get("/", (req, res) => {
    const indexPath = path.join(__dirname, "public", "index.html");
    res.sendFile(indexPath);
});
route.get("/book", (req, res) => {
    const bookFile = path.join(__dirname, "public", "book.html");
    res.sendFile(bookFile);
});
route.get("/api/v1/books", (req, res) => {
    let books = data.library;
    res.json(books);
});
route.get("/api/v1/book/:book", (req, res) => {
    let bookParam = req.params.book;
    let bookParamClean = bookParam.replace("%20", " ");
    let booksArray = data.library;
    booksArray.forEach((element) => {
        if (bookParamClean == element.book.title) {
            res.json(element);
        }
    });
});

export default route;
