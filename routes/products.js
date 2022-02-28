const express = require("express");

const app = express.Router();

const fixArrayId = require("../helpers")

let products = [
   {
       id: "1",
       title: "Samsung",
       img: "https://i.postimg.cc/L6px9Pxj/Samsung-535lt-Fridge-Freezer-RS54-N3-A13-S8.jpg",
       category: "Fridge",
       features: "Door Cooling and A+ energy efficiency",
       price: "R62.499"
   },
   {
       id: "2",
       title: "LG",
       catergory: "Fridge",
       img: "https://i.postimg.cc/mZQS5DTk/LG-793-L-Matt-Black-French-Door-Instaview-Fridge-GC-X268-NQSM-1.jpg",
       features: "Water dispenser, Precise temp control, Multi-airflow for a constant temp.",
       price: "R12.999"
   },
   {
       id: "3",
       title: "Hisense",
       category: "Fridge",
       img: "https://i.postimg.cc/g2r8mkbv/Hisense-H610-BS-WD-Combi-Refrigerator.jpg",
       features: "A+ energy rating, Frost free, Digital invertor technology",
       price: "R15.499"
   },
   {
       id: "4",
       title: "Hisense",
       category: "Freezer",
       img: "https://i.postimg.cc/QMzrwmkQ/Hisense-142l-Chest-Freezer.jpg",
       features: "Mode selection, Manual defrost, Roller wheels",
       price: "R5.999"
   },
   {
       id: "5",
       title: "Defy",
       category: "Freezer",
       img: "https://i.postimg.cc/d1nGJ73j/Defy-386-l-Chest-Freezer.jpg",
       features: "A energy efficiency, Dehumidification function, Variable Temp",
       price: "R3.999"
   },
   {
       id: "6",
       title: "Defy",
       category: "Freezer",
       img: "https://i.postimg.cc/yNpRDD01/Defy-195-l-Chest-Freezer.jpg",
       features: "A energy efficiency, Adjustable feet, Variable speed",
       price: "R2.599"
   },
   {
    id: "7",
    title: "Samsung Galaxy S21",
    img: "https://i.postimg.cc/kX6WPpyG/silo-MIN-402497-EAA-large.jpg",
    features: "Colour: Silver, Size: 256GB",
    category: "cellphones",
    description: "Operates of Android OS with 5G technolgy and 8GB of RAM. A display of 6.7 inches, a Rear Camera of 64MP and Front Camera of 10MP.",
    price: "R19,999"
},
{
    id: "8",
    title: "Oppo A16",
    img: "https://i.postimg.cc/52qtvB3b/silo-MIN-434265-EAA-large.jpg",
    features: "Colour: Pearl Blue",
    category: "cellphones",
    description: "Operates on Android 11, Memory of 32GB, external memory of 256GB and a triple rear camera setup(13MP + 2MP + 2MP), front camera of 8MP and AI Beautification.",
    price: "R2,799"
},
{
    id: "9",
    title: "Vivo X50",
    img: "https://i.postimg.cc/850WVWXQ/silo-MIN-404656-EAA-large.jpg",
    features: "Colour: Frost Blue",
    category: "cellphones",
    description: "Operates with Funtouch OS 10.5(based on Android 10), 5G coverage, a display of 6.56 inches(FHD+) display and a Rear Quad Camera setup(48MP + 13MP + 8MP + 5MP)",
    price: "R14,799"
},
{
    id: "10",
    title: "Lenovo IdeaPad 3",
    img: "https://i.postimg.cc/br632svq/silo-MIN-431401-EAA-large.jpg",
    features: "Colour: Platinum Grey",
    category: "laptops",
    description: "Windows 10 Home operating system, a Intel Core i5-1135G7(Upt to 4.20 GHz) processor and onboard 256 GB solid-state drive",
    price: "R9,999"
},
{
    id: "11",
    title: "Asus X543",
    img: "https://i.postimg.cc/yN31Qb3H/silo-MIN-424323-EAA-large.jpg",
    features: "Colour: Star Grey, Size: 39cm(15.6 inches)",
    category: "laptops",
    description: "Windows 10 Home, Intel Core i7-7500U (Up to 3.50 GHz) and 1TB hard disk drive.",
    price: "R9,999"
},
{
    id: "12",
    title: "HP 15-Series",
    img: "https://i.postimg.cc/QtMRYByW/silo-MIN-425636-EAA-large.jpg",
    features: "Colour: Silver, Size: 39cm(15.6 inches)",
    category: "laptops",
    description: "Windows 10 Home operating system, Intel Core i5-1135G7 (Up to 4.20 GHz) and storage of 512 GB solid-state drive",
    price: "R11,999"
},
{
    id: "13",
    title: "Xbox 1",    
    img: "https://i.postimg.cc/RCG04Wxq/silo-MIN-398228-EAA-large.jpg",
    category: "console",
    features: "Storage(1TB SSD), Blu-ray Player, Xbox LIve and Game Pass",
    content: "",
    price: "R11,999"
},
{
    id: "14",
    title: "Titan-Pixel",
    img: "https://i.postimg.cc/Px3gJpbQ/e2d007ab-8cec-4617-ae59-42d6af616f73-qpn13-large.jpg",
    category: "console",
    features: "600 Built-in games, 64-Bit system, Support TF card",
    content: "",
    price: "R999,00"
},
{
    id: "15",
    title: "Nintendo Switch",
    img: "https://i.postimg.cc/4xXnpjk2/silo-MIN-384664-EAA-large.jpg",
    category: "console",
    features: "Color:Red/Blue",
    content: "",
    price: "R7,499"
},
{
    id: "16",
    title: "Snake & Ladders",
    img: "https://i.postimg.cc/ryWSj63q/5b990c58-7d81-4935-bf43-a71a7e60d544-qpn13-large.jpg",
    category: "board games",
    features: "Fun game for the entire family, Classic games that's easy to learn and fun to play",
    content: "Game board, 4 coloured game pieces, 1 die, instructions",
    price: "R119"
},
{
    id: "17",
    title: "Giant Jenga Building Blocks",
    img: "https://i.postimg.cc/K86dw3x1/a544447d-3489-4f98-a8a6-628314050855-qpn13-large.jpg",
    category: "board games",
    features: "A bag, 54 precision-crafted wooden finished blocks.",
    price: "R1,430"
},
{
    id: "18",
    title: "Checkers",
    img: "https://i.postimg.cc/JzZZ809y/7d5cc3dc-11ae-4785-9779-76f3f74912cb-qpn13-large.jpg",
    category: "board games",
    features: "",
    contents: "24 Checker pieces, Game board, Instructions",
    price: "R119"
}
];
// getting all products
app.get("/", (req, res) => {
    res.send(products);
});
// getting a single product
app.get("/:id", (req, res) => {
    const product = products.find(appliance => product.id === req.params.id);
    if (!product) res.status(404).send('Appliance not found... :(')
    res.send(product)
});
// adding an appliance
app.post("/", (req, res) => {
    const product = {
        id: products.length + 1,
        title: req.body.title,
        img: req.body.img,
        features: req.body.features,
        price: req.body.price
    }
    products.push(product);
    res.send(product);
});
// update products
app.put("/:id", (req, res) => {
    const product = products.find(c => c.id == parseInt(req.params.id));
    if (!product) res.status(404).send({ msg:'The required product cannot be found.' });
    product.title = req.body.title;
    res.send(product);
});
// removing an product
app.delete("/:id", (req, res) => {
    aproduct = products.filter((product) => product.id != req.params.id);
    fixArrayId(products);
    res.send({ msg: "Appliances removed." })
})

module.exports = app