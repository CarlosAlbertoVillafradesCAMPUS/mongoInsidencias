import dotenv from "dotenv";
import express from "express";
import atlasConexion from "./db/connect.js";

dotenv.config();
const dataBase = await atlasConexion();
const appExpress = express();

appExpress.get("/trainers", async (req,res)=>{
    try {
        const coleccion = dataBase.collection("trainer")
        const data = await coleccion.find().toArray();
        res.send(data)
    } catch (error) {
        res.status(error.status).send(error)
    }
})

const myServer = JSON.parse(process.env.MY_SERVER)
appExpress.listen(myServer, ()=>console.log(`Conexio exitosa: http://${myServer.host}:${myServer.port}`))