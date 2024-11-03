const express = require("express");
const fs = require("fs");
const path = require("path");
const { createHash } = require("node:crypto");

require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT ?? 80;

const dataDir = process.env.RAILWAY_VOLUME_MOUNT_PATH ?? ".";

const filePath = path.join(dataDir, "data.txt");
const index = path.join(__dirname, "index.html");

var lastCopy = new Date();

// make file if it doesnt exist
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) fs.writeFile(filePath, "", () => {});
});

app.get("/", (req, res) => {
    var page = "";
    try {
        page = fs.readFileSync(index, "utf8");
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
        res.status(200).send("Saved successfully!");
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
        lastCopy: lastCopy.toISOString(),
        content,
        hash: createHash("md5").update(content).digest("hex"),
    };
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
