const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();
const DashboardPage = require('../WebComponent/Dashboard');
const LoginPage = require('../WebComponent/Login');
const PimPage = require('../WebComponent/PIM');

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshot/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 3 - [add employee]', function(){
    this.timeout(40000);
    let driver;
    let options;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    beforeEach(async function() {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username,password);
    })
    

    it('Successfully to PIM page and add employee', async function(){
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.inOnDashboard();
        assert.strictEqual(title, 'Dashboard', 'Dashboard not found');
        await dashboardPage.clickPIM();

        const pimPage = new PimPage(driver);
        const employee = await pimPage.isOnPim();
        assert.strictEqual(employee, 'Employee Information', 'Employee Information not found')
        
    })

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function(){
        await driver.quit();
    });

})