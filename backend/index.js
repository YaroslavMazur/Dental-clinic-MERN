require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const router = require("./router");
const errorMiddlware = require("./middlwares/errorMiddlware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));
app.use(cookieParser());
app.use("/api", router);

app.use(errorMiddlware);


const start = async () => {
    try {

        await mongoose.connect(process.env.DB_URL)
            .then(() => {
                console.log("DB 200");
            })
            .catch((err) => {
                console.error("DB ERR ", err);
            });

            
        app.listen(PORT, () => {
            console.log("Server 200", PORT);
        })

    }
    catch (err) {
        console.error(err);
    }
}

start();