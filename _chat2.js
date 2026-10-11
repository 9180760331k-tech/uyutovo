const fs = require("fs");
const s = fs.readFileSync("index.html", "utf8");
const i = s.lastIndexOf("</style>");
console.log(JSON.stringify(s.slice(i - 500, i + 20)));
console.log("---join---", s.includes("max.ru/join"));
console.log("---phones---", s.includes("f9LHodD0cOLxBZFvRqr0Q1SRRfeoJawW5RSVX9v9uEDngLqmphwDD9-S9rA"), s.includes("f9LHodD0cOJ9G9YhTau5hwB2RgkOwWDcgdcwkbHr6FzWU6gGynwNnToF9gU"));
