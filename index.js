import Express from "express";
import Morgan from "morgan";
import route from "./routes.js";
import { fileURLToPath } from "url";
import bodyparse from "body-parser";
import path from "path";

const app = Express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "public");

//Settings
const PORT = process.env.PORT || 3000;

//MiddleWares
app.use(Morgan("dev"));
app.use(bodyparse.json());

//Routes
app.use(route);

//Static Files

app.use(Express.static(filePath));
//Listen
app.listen(PORT, () => {
    console.log("Server in port", PORT);
});
