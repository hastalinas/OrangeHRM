const { By, until } = require('selenium-webdriver');

class LoginPage{
    constructor(driver){
        this.driver = driver;
        this.usernameInput = By.name('username'); 
        this.passwordInput = By.name('password');
        this.loginButton = By.css('button.oxd-button');
        this.errorMessage = By.xpath("//div[@class='oxd-alert oxd-alert--error']");

    }

    async navigate(browser){
        await this.driver.get(browser);
    }

    async login(username, password){       
        await this.driver.wait(until.elementLocated(this.usernameInput), 6000000);
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();

    }

    async getErrorMessage() {
        try {
            const errorElement =  await this.driver.wait(until.elementLocated(this.errorMessage),5000);
            return await errorElement.getText();
            
        } catch (err) {
            return null; //Tidak ada message
        }
    }
}

module.exports =LoginPage;