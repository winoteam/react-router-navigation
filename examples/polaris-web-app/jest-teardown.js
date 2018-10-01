const { teardown } = require('jest-environment-puppeteer')

module.exports = async function globalTeardown() {
  await teardown()
}
