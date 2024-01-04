const { glob, globSync } = require("glob");
// const files = globSync("./endpoints/**/*").filter((file) => file.endsWith(".js"));
const path = require("path");
const fs = require("fs");

(async () => {
  const files = (await glob(path.join(__dirname, "endpoints", "**", "*"))).filter((file) => file.endsWith(".js"));

  await Promise.all(
    files.map(async (file) => {
      const save_file = file.replace("api/endpoints", "data").replace("/index.js", ".json").replace(/.js$/, ".json");
      const save_path = path.dirname(save_file);

      if (!fs.existsSync(save_path)) {
        fs.mkdirSync(save_path, { recursive: true });
      }

      let data = require(file);

      if (typeof data == "function") {
        if (data.constructor.name === "AsyncFunction") {
          data = await data();
        } else {
          data = data();
        }
      }

      console.log(`Saving: ${save_file}`);
      fs.writeFileSync(save_file, JSON.stringify(data));
    })
  );
})();
