const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER;

module.exports = (function(settings) {
  settings.test_settings.default = {
    launch_url: "http://ondemand.saucelabs.com:80",
    selenium_port : 80,
    selenium_host : "ondemand.saucelabs.com",
    silent: true,
    username: process.env.SAUCE_USERNAME,
    access_key: process.env.SAUCE_ACCESS_TOKEN,
    screenshots: {
      enabled: false,
      path: ""
    },
    desiredCapabilities: {
      browserName: "chrome",
      marionette: true,
      build: `build-${TRAVIS_JOB_NUMBER}`,
      'tunnel-identifier': TRAVIS_JOB_NUMBER,
    },
  };
  return settings;
})(require('./nightwatch.json'));
