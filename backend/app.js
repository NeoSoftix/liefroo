const express = require("express");
const cors = require("cors");
const contactRoute = require("./routes/contact");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is running"
    });
});

app.use("/api/contact", contactRoute);

module.exports = app;