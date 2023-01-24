import http from "http";
import fs from "fs/promises";
import path from "path";
import {addNote} from "./notes.controller";
import chalk from "chalk";

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        const content = await fs.readFile(path.join(basePath, "index.ejs"));
        // res.setHeader("Content-Type", "text/html");
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(content);
    } else if (req.method === "POST") {
        const body = [];
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        })

        req.on("data", data => {
            body.push(Buffer.from(data));
        })
        req.on("end", async () => {
            const title = body.toString().split("=")[1].replaceAll("+", " ");
            await addNote(title);

            res.end(`Tittle = ${title}`);
        })
    }
})

// server.listen(port, () => {
//     console.log(chalk.green(`Server has been started on port ${port}`));
// })