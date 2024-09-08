const fs = require("fs");
let text = fs.readFileSync("doc.txt", "utf-8");
text = text.replace("nidhi", "Nick");
console.log(text);

fs.writeFileSync("rohan.txt", text);