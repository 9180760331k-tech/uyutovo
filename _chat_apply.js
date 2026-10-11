const fs = require("fs");
let s = fs.readFileSync("index.html", "utf8");

const css = `
.max-invite{
  border-top:1px solid var(--line);
  padding:72px max(6vw,22px) 76px;
  text-align:center;
}
.max-invite-inner{max-width:640px;margin:0 auto}
.max-invite h2{
  font-size:clamp(34px,4.2vw,56px);
  line-height:1.15;
  margin:0 0 16px;
}
.max-invite p{
  max-width:38em;
  margin:0 auto 28px;
  font-size:17px;
  line-height:1.85;
  color:#647269;
}
.max-invite-link{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  min-height:52px;
  padding:14px 22px;
  border-radius:14px;
  background:#324638;
  color:#f4efe7;
  text-decoration:none;
  font-weight:700;
  font-size:15px;
}
.max-invite-link svg{display:block;flex:0 0 auto}
.max-invite-link:hover{background:#27392d}
.max-invite-link:focus-visible{outline:2px solid #455b46;outline-offset:3px}
@media (max-width:780px){
  .max-invite{padding:52px 24px 56px}
  .max-invite h2{font-size:clamp(32px,8vw,44px);letter-spacing:-.8px}
  .max-invite p{font-size:17px;line-height:1.75}
  .max-invite-link{width:min(100%,360px);min-height:50px;font-size:16px}
}
@media (max-width:380px){
  .max-invite{padding-inline:19px}
}
`;

const html = `<section class="max-invite" aria-labelledby="max-invite-title"><div class="max-invite-inner"><h2 id="max-invite-title">Будьте ближе к Уютово</h2><p>Хотите первыми узнавать о свободных датах, новостях и приятных предложениях? Присоединяйтесь к Уютово в MAX — будем на связи!</p><a class="max-invite-link" href="https://max.ru/join/U_hNvMJ5yy-RpqoTtJXWdNV9UVJ6AK8rlHmcboTT1Tc" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.2 17.2 5.2 20.2c1.8-.5 3-1.4 3.8-2.4A8.2 8.2 0 1 0 7.2 17.2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>Присоединиться к чату</a></div></section>`;

if (!s.includes("</style>")) throw new Error("style end missing");
if (s.includes("max-invite")) throw new Error("already present");
s = s.replace("</style>", css + "</style>");

const marker = '</div></section><section class="closing" id="contacts">';
if (s.split(marker).length !== 2) throw new Error("contacts marker " + s.split(marker).length);
s = s.replace(marker, "</div></section>" + html + '<section class="closing" id="contacts">');

const plain = s.replace(/data:[^"']+/g, "");
if ((plain.match(/Будьте ближе к Уютово/g) || []).length !== 1) throw new Error("title count");
if ((plain.match(/Присоединиться к чату/g) || []).length !== 1) throw new Error("button count");
if ((plain.match(/max\.ru\/join\/U_hNvMJ5yy-RpqoTtJXWdNV9UVJ6AK8rlHmcboTT1Tc/g) || []).length !== 1) throw new Error("url count");
if (!plain.includes('href="https://max.ru/join/U_hNvMJ5yy-RpqoTtJXWdNV9UVJ6AK8rlHmcboTT1Tc" target="_blank" rel="noopener noreferrer"')) throw new Error("attrs");
if (!plain.includes("f9LHodD0cOLxBZFvRqr0Q1SRRfeoJawW5RSVX9v9uEDngLqmphwDD9-S9rA")) throw new Error("phone max 1 lost");
if (!plain.includes("f9LHodD0cOJ9G9YhTau5hwB2RgkOwWDcgdcwkbHr6FzWU6gGynwNnToF9gU")) throw new Error("phone max 2 lost");
const order = plain.indexOf('class="max-invite"');
const contacts = plain.indexOf('id="contacts"');
const chapter6 = plain.indexOf('id="chapter-6"');
if (!(chapter6 < order && order < contacts)) throw new Error("order " + chapter6 + " " + order + " " + contacts);
fs.writeFileSync("index.html", s);
console.log("ok");
