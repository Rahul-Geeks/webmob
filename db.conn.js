require("./User");
require("./Product");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/webmob", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let _conn = mongoose.connection;

_conn.on("error", (error) => {
    console.log("Connection with mongodb failed", error);
});

_conn.once("open", () => {
    console.log("Connection with mongodb successfull");
});