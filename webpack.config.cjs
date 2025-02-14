const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const axios = require('axios');

async function fetchCharacters() {
  let allCharacters = [];
  let page = 1;
  let nextPage = `https://rickandmortyapi.com/api/character?page=${page}`;

  while (nextPage) {
    const response = await axios.get(nextPage);
    allCharacters = allCharacters.concat(response.data.results);
    nextPage = response.data.info.next;
  }

  return allCharacters;
}

module.exports = async () => {
  const characters = await fetchCharacters();

  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], 
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/templates/index.ejs',
        inject: false,
        templateParameters: { characters },
      }),
      ...characters.map((character, index) => new HtmlWebpackPlugin({
        filename: `${character.id}_${character.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`,
        template: './src/templates/character.ejs',
        inject: false,
        templateParameters: {
          character,
          prevCharacter: index > 0 ? characters[index - 1] : null,
          nextCharacter: index < characters.length - 1 ? characters[index + 1] : null
        },
      })),
    ],
    devServer: {
      static: './dist',
      hot: true,
      open: true,
    },
  };
};
