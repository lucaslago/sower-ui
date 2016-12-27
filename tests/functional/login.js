module.exports = {
  'Login test' : browser => {
    browser
      .url(`${browser.launchUrl}:3000/#/login`)
      .waitForElementVisible('body', 2000)
      .setValue('input[type=email]', 'test-email@gmail.com')
      .setValue('input[type=password]', 'fakepassword')
      .click('button[type=submit]')
      .waitForElementVisible('#root > div > div.container > div > div:nth-child(2) > div > div > span', 5000)
      .assert.containsText('#root > div > div.container > div > div:nth-child(2) > div > div > span', 'Incorrect email and/or password')
      .end();
  }
};
