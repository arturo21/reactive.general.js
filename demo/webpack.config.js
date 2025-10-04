const path = require('path');

module.exports = {
  entry: './src/index.jsx', // tu componente principal con JSX
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // compila .js y .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'reactv.jsx' }]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // permite importar sin extensión
  },
  externals: {
    reactv: 'reactv' // reactv estará disponible globalmente en el navegador
  },
  mode: 'production' // puedes cambiar a 'production' para minificar
};
