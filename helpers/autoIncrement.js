import atlasConexion from "../db/connect.js";

const database = await atlasConexion();

export async function autoIncrementID(name){
    try {
        let coleccion = database.collection("counters");
        let respuesta = await coleccion.findOneAndUpdate(
            {ID: `${name}ID`},
            {$inc:{sequenceValue:1}},
            {returDocument: "after"}
        );
        return respuesta.value.sequenceValue;
    } catch (error) {
        return {status:429, message:"Error, no existe el ID autoincrementable '${name}'"}
    }
    
}