const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
const port = process.env.PORT ?? 80;

const filePath = path.join(__dirname, "data.txt");
const index = path.join(__dirname, "index.html");

var lastCopy = new Date();

// make file if it doesnt exist
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) fs.writeFile(filePath, '', () => {});
});

const formatDate = (date) => date.toLocaleString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

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
    const newContent = req.body.content;
    try {
        fs.writeFileSync(filePath, newContent, "utf8");
        content = newContent;
        lastCopy = new Date()
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
      content
    }
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
