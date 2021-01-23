const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
  purge: {
    enabled: true,
    content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  },
};
