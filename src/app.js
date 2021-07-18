import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/items", async (req, res) => {
    try{
        if(!req.body.text || req.body.text === ""){
            return res.sendStatus(400);
        }
        const text = req.body.text;
        const newText = connection.query(`INSERT INTO items(text) VALUES($1)`, [text]);
        return res.sendStatus(201);

    } catch{
        return res.sendStatus(500);
    }
});

export default app;
