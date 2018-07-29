/* @jest-environment jsdom */

describe('Experimental web app', () => {
  beforeAll(async () => {
    jest.setTimeout(25000)
  })

  it('should load correctly', async () => {
    await page.goto('http://localhost:3000/accepts-marketing')
    await page.waitForSelector('.container')
    await expect(page).toMatch('Second tab')
    await expect(page).not.toMatch('First tab')
  })

  it('should re-render tabs on url change', async () => {
    await page.goto('http://localhost:3000/')
    await page.waitForSelector('.container')
    await page.goto('http://localhost:3000/accepts-marketing')
    await expect(page).toMatch('Second tab')
    await expect(page).not.toMatch('First tab')
  })

  it('should re-render tabs on click', async () => {
    await page.goto('http://localhost:3000/')
    await page.waitForSelector('.container')
    await page.click('button[tabIndex="-1"]')
    await expect(page).toMatch('Second tab')
    await expect(page).not.toMatch('First tab')
  })
})
