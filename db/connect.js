import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();
const my_connect = JSON.parse(process.env.MY_CONNECT);

export default async function atlasConexion(){
    try {
        const uri = `mongodb+srv://${my_connect.user}:${my_connect.password}@cluster0.oj8cvn0.mongodb.net/${my_connect.db}`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const client = await new MongoClient(uri, options).connect();
        return client.db();
    } catch (error) {
        return {status:500, message:"Error al conectar la base de datos"}
    }
}
