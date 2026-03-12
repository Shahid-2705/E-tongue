const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Remove Flow type checking issues
config.resolver.assetExts.push('txt');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'js', 'jsx', 'ts', 'tsx'];

// Ignore Flow type errors
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('react-native/Libraries/')) {
    return {
      filePath: require.resolve(moduleName),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Remove the extraNodeModules section that requires stream-browserify
// config.resolver.extraNodeModules = {
//   ...config.resolver.extraNodeModules,
//   'stream': require.resolve('stream-browserify'),
//   'buffer': require.resolve('buffer/'),
// };

module.exports = config;