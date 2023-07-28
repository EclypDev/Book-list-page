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

const indexFile = path.join(__dirname, "public", "index.html");
route.get("/", (req, res) => {
    res.sendFile(indexFile);
});
route.get("/api/v1/books", (req, res) => {
    let books = data.library;
    res.json(books);
});
route.get("/book/:book", (req, res) => {
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
