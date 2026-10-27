const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");



// const config = {
//   project: {
//     ios: {},
//     android: {},
//   },
//   resolver: {
//     sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };
// module.exports = config;


const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: "./global.css" });