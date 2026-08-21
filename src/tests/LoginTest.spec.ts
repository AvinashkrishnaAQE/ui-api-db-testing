import HomeSteps from "@uiSteps/HomeSteps";
import RegistrationSteps from "@uiSteps/RegistrationSteps";
import { test } from "@base-test";
import Allure from "@allure";
import ExcelUtil from "@utils/ExcelUtil";

const SHEET = "LoginTest";
let home: HomeSteps;
test.beforeEach(async ({ page }) => {
    home = new HomeSteps(page);
});

const data1 = ExcelUtil.getTestData(SHEET, "TC01_ValidLogin");
test(`${data1.TestID} - ${data1.Description}`, async () => {
    Allure.attachDetails(data1.Description, data1.Issue);
    await home.launchApplication();
    await home.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
    await home.validateLogin(process.env.LOGIN_USERNAME!);
    await home.logout();
});

const data2 = ExcelUtil.getTestData(SHEET, "TC02_InValidLogin");
test(`${data2.TestID} - ${data2.Description}`, async () => {
    Allure.attachDetails(data2.Description, data2.Issue);
    await home.launchApplication();
    await home.login(process.env.LOGIN_USERNAME!, data2.Password);
    await home.validateInvalidLogin(data2.ErrorMessage);
});

const data3 = ExcelUtil.getTestData(SHEET, "TC03_LoginCreateAccount");
test(`${data3.TestID} - ${data3.Description}`, async ({ page }) => {
    Allure.attachDetails(data3.Description, data3.Issue);
    await home.launchApplication();
    await home.navigateToCreateAccount();
    const register = new RegistrationSteps(page);
    await register.alreadyHaveAccount();
    await home.enterLoginDetails(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
    await home.validateLogin(process.env.LOGIN_USERNAME!);
    await home.logout();
});
