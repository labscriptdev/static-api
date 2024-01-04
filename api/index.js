const { globSync } = require("glob");
const files = globSync("./endpoints/**/*").filter((file) => file.endsWith(".js"));
const path = require("path");
const fs = require("fs");

let save_folder = path.join(__dirname, "..", "data");

files.map(async (file) => {
  const save_file =
    save_folder + file.replace("endpoints/", "/").replace("/index.js", ".json").replace(/.js$/, ".json");
  const save_filepath = path.dirname(save_file);

  if (!fs.existsSync(save_filepath)) {
    fs.mkdirSync(save_filepath, { recursive: true });
  }

  let data = require(`./${file}`);

  if (typeof data == "function") {
    if (data.constructor.name === "AsyncFunction") {
      data = await data();
    } else {
      data = data();
    }
  }

  fs.writeFileSync(save_file, JSON.stringify(data));
});
