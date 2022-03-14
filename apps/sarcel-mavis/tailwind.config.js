const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{html,ts}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
