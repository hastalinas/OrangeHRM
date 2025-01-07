const { By, until } = require('selenium-webdriver');

class PimPage{
    constructor(driver){
        this.driver = driver;
        this.employeeInfo = By.css('.oxd-text--h5');
        this.buttonAdd = By.xpath("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
        this.titleAddEmpployee = By.css('.orangehrm-main-title')
    }

    async isOnPim(){
        const employee = await this.driver.wait(until.elementLocated(this.employeeInfo), 10000);
        return employee.getText();
    }

    async clickAdd(){
        //const add = await this.driver.wait(until.elementLocated(this.buttonAdd), 10000);
        await this.buttonAdd.click();
    }

    async isOnEmployee(){
        const titleEmpployee = await this.driver.wait(until.elementLocated(this.titleAddEmpployee), 10000);
        return titleEmpployee.getText();
    }
}

module.exports = PimPage;