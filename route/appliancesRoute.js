const express = require("express");

const app = express.Router();

const fixArrayId = require("../helpers")

let appliances = [
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
   }
];
// getting all appliances
app.get("/", (req, res) => {
    res.send(appliances);
});
// getting a single appliance
app.get("/:id", (req, res) => {
    const appliance = appliances.find(appliance => appliance.id == req.params.id);
    if (!appliance) res.status(404).send('Appliance not found. :(')
    res.send(appliance)
});
// adding an appliance
app.post("/", (req, res) => {
    const appliance = {
        id: appliances.length + 1,
        title: req.body.title,
        img: req.body.img,
        features: req.body,features,
        price: req.body.price
    }
    appliances.push(appliance);
    res.send(appliance);
});
// update appliances
app.put("/:id", (req, res) => {
    const appliance = appliances.find(c => c.id == parseInt(req.params.id));
    if (!appliance) res.status(404).send({ msg:'The required appliance cannot be found.' });
    appliance.title = req.body.title;
    res.send(appliance);
});
// removing an appliance
app.delete("/:id", (req, res) => {
    appliances = appliances.filter((appliance) => appliance.id != req.params.id);
    fixArrayId(appliances);
    res.send({ msg: "Appliances removed." })
})

module.exports = app