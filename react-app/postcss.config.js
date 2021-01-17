const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
};
