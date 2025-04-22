import express from "express";

const app = express();

app.set("view engine" , "ejs")

app.get("/", (req , res) => {
    res.render("index")
} )
app.get("/about", (req , res) => {
    res.send("This Is about Pages")
} )
app.get("/contact", (req , res) => {
    res.send("This Is contact Pages")
} )

app.listen(3000)