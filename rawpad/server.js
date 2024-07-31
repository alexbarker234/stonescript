const express = require("express");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT ?? 80;

const filePath = path.join(__dirname, "data.txt");
const index = path.join(__dirname, "index.html");

var lastCopy = new Date();

// make file if it doesnt exist
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) fs.writeFile(filePath, "", () => {});
});

const formatDate = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const units = [
        { unit: "day", value: 86400 },
        { unit: "hour", value: 3600 },
        { unit: "minute", value: 60 },
        { unit: "second", value: 1 },
    ];

    for (const { unit, value } of units) {
        const diff = Math.floor(diffInSeconds / value);
        if (diff >= 1) {
            return `${diff} ${unit}${diff > 1 ? "s" : ""} ago`;
        }
    }
    return "just now";
};
app.get("/", (req, res) => {
    let content = "";
    try {
        content = fs.readFileSync(filePath, "utf8");
    } catch (err) {
        console.error("Error reading file:", err);
    }

    var page = "";
    try {
        page = fs.readFileSync(index, "utf8");
        page = page.replace("{{ content }}", content);
        page = page.replace("{{ lastCopy }}", formatDate(lastCopy));
    } catch (err) {
        console.error("Error reading file:", err);
    }

    res.send(page);
});

app.post("/save", (req, res) => {
    try {
      if (!req.headers.authorization?.includes(process.env.PASS)) return res.status(401);

      const newContent = req.body.content;

        fs.writeFileSync(filePath, newContent, "utf8");
        content = newContent;
        lastCopy = new Date();
        res.send("Saved successfully!");
    } catch (err) {
        console.error("Error saving file:", err);
        res.status(500).send("Error saving data!");
    }
});

app.get("/fetch", (req, res) => {
    let content = "";
    try {
        content = fs.readFileSync(filePath, "utf8");
    } catch (err) {
        console.error("Error reading file:", err);
    }
    const response = {
        lastCopy: formatDate(lastCopy),
        content,
    };
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
