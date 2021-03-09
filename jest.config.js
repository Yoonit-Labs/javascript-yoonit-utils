const { defaults } = require('jest-config');
module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**"
  ]
};