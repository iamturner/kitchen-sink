module.exports = {
  env: {
    development: {
      presets: [
        ["@babel/preset-env"],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: ["@emotion"],
    },
    production: {
      presets: [
        ["@babel/preset-env"],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: ["@emotion"],
    },
    test: {
      presets: [
        ["@babel/preset-env"],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: ["@emotion"],
    },
  },
};
