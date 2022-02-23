const express = require("express");

const app = express.Router();

const fixArrayId = require("../helpers")

let electronics= [
    {
        id: "1",
        title: "Samsung Galaxy S21",
        img: "https://i.postimg.cc/kX6WPpyG/silo-MIN-402497-EAA-large.jpg",
        features: "Colour: Silver, Size: 256GB",
        category: "cellphones",
        description: "Operates of Android OS with 5G technolgy and 8GB of RAM. A display of 6.7 inches, a Rear Camera of 64MP and Front Camera of 10MP.",
        price: "R19,999"
    },
    {
        id: "2",
        title: "Oppo A16",
        img: "https://i.postimg.cc/52qtvB3b/silo-MIN-434265-EAA-large.jpg",
        features: "Colour: Pearl Blue",
        category: "cellphones",
        description: "Operates on Android 11, Memory of 32GB, external memory of 256GB and a triple rear camera setup(13MP + 2MP + 2MP), front camera of 8MP and AI Beautification.",
        price: "R2,799"
    },
    {
        id: "3",
        title: "Vivo X50",
        img: "https://i.postimg.cc/850WVWXQ/silo-MIN-404656-EAA-large.jpg",
        features: "Colour: Frost Blue",
        category: "cellphones",
        description: "Operates with Funtouch OS 10.5(based on Android 10), 5G coverage, a display of 6.56 inches(FHD+) display and a Rear Quad Camera setup(48MP + 13MP + 8MP + 5MP)",
        price: "R14,799"
    },
    {
        id: "4",
        title: "Lenovo IdeaPad 3",
        img: "https://i.postimg.cc/br632svq/silo-MIN-431401-EAA-large.jpg",
        features: "Colour: Platinum Grey",
        category: "laptops",
        description: "Windows 10 Home operating system, a Intel Core i5-1135G7(Upt to 4.20 GHz) processor and onboard 256 GB solid-state drive",
        price: "R9,999"
    },
    {
        id: "5",
        title: "Asus X543",
        img: "https://i.postimg.cc/yN31Qb3H/silo-MIN-424323-EAA-large.jpg",
        features: "Colour: Star Grey, Size: 39cm(15.6 inches)",
        category: "laptops",
        description: "Windows 10 Home, Intel Core i7-7500U (Up to 3.50 GHz) and 1TB hard disk drive.",
        price: "R9,999"
    },
    {
        id: "6",
        title: "HP 15-Series",
        img: "https://i.postimg.cc/QtMRYByW/silo-MIN-425636-EAA-large.jpg",
        features: "Colour: Silver, Size: 39cm(15.6 inches)",
        category: "laptops",
        description: "Windows 10 Home operating system, Intel Core i5-1135G7 (Up to 4.20 GHz) and storage of 512 GB solid-state drive",
        price: "R11,999"
    }
];

// getting all electronics
app.get("/", (req, res) => {
    res.send(electronics)
})
// getting  a single electronic
app.get("/:id", (req, res) => {
    const electronic = electronics.find(electronic => electronic.id === req.params.id);
    if (!electronic) res.status(404).send('Electronic not found... :(')
    res.send(electronic)
})
// adding an electronic
app.post("/", (req, res) => {
    const electronic = {
        id: electronics.length + 1,
        title: req.body.title,
        img: req.body.img,
        features: req.body.features,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price
    }
    electronics.push(electronic);
    res.send(electronic);
})
// update electronic
app.put("/:id", (req, res) => {
    const electronic = electronics.find(c => c.id == parseInt(req.params.id));
    if (!electronic) res.status(404).send({ msg:'The required electronic cannot be found.' });
    electronic.title = req.body.title;
    res.send(electronic);
})
// removing an electronic
app.delete("/:id", (req, res) => {
    electronics = electronics.filter((electronic) => electronic.id != req.params.id);
    fixArrayId(electronics)
    res.send({ msg: "Electronic removed" })
})

module.exports = app