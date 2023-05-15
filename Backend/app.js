//IMPORTACION DE LIBRERIAS Y CONSTANTES
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require('cors')
const { DB_USER, DB_PASS, DB_HOST } = require("./contants");

const app = express();

app.use(cors())

//configuracion del body-parse
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Importacion de rutas
const ruta_autorizacion = require("./Router/api");

//Uso de rutas
app.use("/api", ruta_autorizacion);


//conexion base de datos e inicio de la escucha en el puerto 3000
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/`,

    (error) => {
        if (error) { console.log(error) };
        app.listen(3000, () => {
            console.log("#################");
            console.log("#### API REST: http://localhost:3000/api/ ###");
            console.log("#################");
        });
    }
);
