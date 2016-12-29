const toBasicAuth = (email, password) => {
  const base64String = new Buffer(`${email}:${password}`).toString('base64');
  return `Basic ${base64String}`;
};
const authToken = toBasicAuth(process.env.SOWER_USER_LOGIN, process.env.SOWER_USER_PWD);
module.exports = {
  beforeEach: (browser, done) => {
    browser
    .url(`${browser.launchUrl}/#/dashboard`)
    .execute(function() {
      localStorage.token = authToken;
    }, [], () => done())
  },
  'Dashboard should be rendered after the looding spinner disappear': browser => {
    browser
    .url(`${browser.launchUrl}/#/dashboard`)
    .waitForElementVisible('body', 5000)
    .waitForElementVisible('.loading', 3000)
    .waitForElementVisible('.Dashboard', 10000)
    .waitForElementVisible('.DashboardItem', 10000)
    .end();
  },
  afterEach: (browser, done) => {
    browser
    .url(`${browser.launchUrl}/#/dashboard`)
    .execute(function() {
      localStorage.token = undefined;
    }, [], () => done())
  },
};
