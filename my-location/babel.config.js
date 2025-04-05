module.exports = function (api) {
  api.cache(true)
  api.cache(true);
  return {
    presets: [["babel-preset-expo", {
      jsxImportSource: "nativewind"
    }], "nativewind/babel"],
    plugins: [// NOTE: this is only necessary if you are using reanimated for animations
    // ['react-native-unistyles/plugin']
    'react-native-reanimated/plugin', ["module-resolver", {
      root: ["./"],

      alias: {
        "@": "./",
        "tailwind.config": "./tailwind.config.js"
      }
    }]],
  };
}
