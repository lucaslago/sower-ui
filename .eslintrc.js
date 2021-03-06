module.exports = {
  "extends": "airbnb",
  "installedESLint": true,
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "env": {
    "jest": true,
    "browser": true
  },
  "globals": {
    "context": true,
    "shallow": true,
    "mount": true,
    "toJson": true,
    "React": true,
    "wait": true
  }
};
