const express = require("express");

const app = express.Router();

const fixArrayId = require("../helpers")

let gaming = [
    {
        id: "1",
        title: "Xbox 1",    
        img: "https://i.postimg.cc/RCG04Wxq/silo-MIN-398228-EAA-large.jpg",
        category: "console",
        features: "Storage(1TB SSD), Blu-ray Player, Xbox LIve and Game Pass",
        content: "",
        price: "R11,999"
    },
    {
        id: "2",
        title: "Titan-Pixel",
        img: "https://i.postimg.cc/Px3gJpbQ/e2d007ab-8cec-4617-ae59-42d6af616f73-qpn13-large.jpg",
        category: "console",
        features: "600 Built-in games, 64-Bit system, Support TF card",
        content: "",
        price: "R999,00"
    },
    {
        id: "3",
        title: "Nintendo Switch",
        img: "https://i.postimg.cc/4xXnpjk2/silo-MIN-384664-EAA-large.jpg",
        category: "console",
        features: "Color:Red/Blue",
        content: "",
        price: "R7,499"
    },
    {
        id: "4",
        title: "Snake & Ladders",
        img: "https://i.postimg.cc/ryWSj63q/5b990c58-7d81-4935-bf43-a71a7e60d544-qpn13-large.jpg",
        category: "board games",
        features: "Fun game for the entire family, Classic games that's easy to learn and fun to play",
        content: "Game board, 4 coloured game pieces, 1 die, instructions",
        price: "R119"
    },
    {
        id: "5",
        title: "Giant Jenga Building Blocks",
        img: "https://i.postimg.cc/K86dw3x1/a544447d-3489-4f98-a8a6-628314050855-qpn13-large.jpg",
        category: "board games",
        features: "A bag, 54 precision-crafted wooden finished blocks.",
        price: "R1,430"
    },
    {
        id: "6",
        title: "Checkers",
        img: "https://i.postimg.cc/JzZZ809y/7d5cc3dc-11ae-4785-9779-76f3f74912cb-qpn13-large.jpg",
        category: "board games",
        features: "",
        contents: "24 Checker pieces, Game board, Instructions",
        price: "R119"
    }
];
// getting all games

app.get("/", (req, res) => {
    res.send(gaming);
});
// getting a single game
app.get("/:id", (req, res) => {
    const game = gaming.find(game => game.id === req.params.id);
    if (!game) res.status(404).send('Game not found... :(')
    res.send(game)
});
// adding a new game
app.post("/", (req, res) => {
    const game = {
        id: gaming.length + 1,
        title: req.body.title,
        img: req.body.img,
        features: req.body.features,
        contents: req.body.contents,
        price: req.body.price
    }
    gaming.push(game);
    res.send(game);
});
// updating a game 
app.put("/:id", (req, res) => {
    const game = gaming.find(c => c.id == parseInt(req.params.id));
    if (!game) res.status(404).send({ msg: "The required game cannot be found." });
    game.title = req.body.title;
    res.send(game)
})
// removing a game
app.delete("/:id", (req, res) => {
    gaming = gaming.filter((game) => game.id != req.params.id);
    fixArrayId(gaming);
    res.send({ msg: "Game removed." })
})

module.exports = app