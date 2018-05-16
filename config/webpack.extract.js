const rules = (path, nodeModules) => {
  return [
    {
      test: /router.js/,
      use: [nodeModules('babel-loader'), path.resolve(__dirname, './reactStoryLoader.js')]
    },
    {
      test: /\.md$/,
      use: [
        {
          loader: nodeModules('babel-loader'),
          options: {
            presets: [nodeModules('babel-preset-react-app')]
          }
        },
        nodeModules('@mdx-js/loader'),
        path.resolve(__dirname, './componentloader.js')
      ]
    }
  ]
}

exports.rules = rules
