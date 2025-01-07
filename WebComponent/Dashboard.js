const { By, until } = require('selenium-webdriver');

class Dashboard{
    constructor(driver){
        this.driver = driver;
        this.dashboardTitle = By.xpath("//div[@class='oxd-topbar-header-title']");
        this.PIMbutton = By.xpath("//a[.='PIM']");
    }

    async inOnDashboard(){
        const title = await this.driver.wait(until.elementLocated(this.dashboardTitle), 10000);
        return title.getText()

    }

    async clickPIM(){
        await this.driver.findElement(this.PIMbutton).click();
    }

    
}
module.exports = Dashboard;
