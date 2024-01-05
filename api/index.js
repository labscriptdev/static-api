const { glob } = require("glob");
const path = require("path");
const fs = require("fs");

(async () => {
  const options = {
    formatted: false,
    only: [
      // path.join(__dirname, "endpoints", "countries", "index.js"),
    ],
  };

  const files = (await glob(path.join(__dirname, "endpoints", "**", "*")))
    .filter((file) => file.endsWith(".js"))
    .filter((file) => (options.only.length > 0 ? options.only.includes(file) : true));

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
      data = options.formatted ? JSON.stringify(data, null, 2) : JSON.stringify(data);
      fs.writeFileSync(save_file, data);
    })
  );
})();
