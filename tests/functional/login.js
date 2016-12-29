module.exports = {
  'Login should fail when credentials are invalid': browser => {
    browser
      .url(`${browser.launchUrl}/#/login`)
      .waitForElementVisible('body', 2000)
      .setValue('input[type=email]', 'test-email@gmail.com')
      .setValue('input[type=password]', 'fakepassword')
      .click('button[type=submit]')
      .waitForElementVisible('#root > div > div.container > div > div:nth-child(2) > div > div > span', 5000)
      .assert.containsText('#root > div > div.container > div > div:nth-child(2) > div > div > span', 'Incorrect email and/or password')
      .end();
  },
  'Login should work when credentials are valid': browser => {
    browser
    .url(`${browser.launchUrl}/#/login`)
    .waitForElementVisible('body', 2000)
    .setValue('input[type=email]', process.env.SOWER_USER_LOGIN)
    .setValue('input[type=password]', process.env.SOWER_USER_PWD)
    .click('button[type=submit]')
    .waitForElementVisible('.loading', 10000)
    .waitForElementVisible('.Dashboard', 10000)
    .end();
  }
};
