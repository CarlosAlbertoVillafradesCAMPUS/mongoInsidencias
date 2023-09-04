import dotenv from "dotenv";
import express from "express";
import atlasConexion from "./db/connect.js";
import { limitPeticiones } from "./config/limit.js";
import { validationResult } from "express-validator";
import { validateTrainer } from "./DTO/dtoTrainer.js";

dotenv.config();
const dataBase = await atlasConexion();
const appExpress = express();

appExpress.use(express.json())
appExpress.use(limitPeticiones())

appExpress.get("/trainers", async (req,res)=>{
    try {
        const coleccion = dataBase.collection("trainer")
        const data = await coleccion.find().toArray();
        res.send(data)
    } catch (error) {
        res.status(error.status).send(error)  
    }
}) 

appExpress.post("/trainers", validateTrainer, async (req,res)=>{
    try {
        let errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(429).json({status: 429, message: errors.errors[0].msg})

        const coleccion = dataBase.collection("trainer")
        await coleccion.insertOne(req.body)
        res.send("agregado con exito")

    } catch (error) {
        res.status(error.status).send(error)
    }
})

const myServer = JSON.parse(process.env.MY_SERVER)
appExpress.listen(myServer, ()=>console.log(`Conexio exitosa: http://${myServer.host}:${myServer.port}`))