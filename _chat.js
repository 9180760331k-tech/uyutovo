const fs = require("fs");
const s = fs.readFileSync("index.html", "utf8").replace(/data:[^"']+/g, "[data]");
const i = s.indexOf('id="contacts"');
console.log("contacts", i);
console.log(s.slice(i - 1800, i + 900));
console.log("\n\n===== closing css =====\n");
const c = s.indexOf(".closing{");
console.log(s.slice(c, c + 700));
