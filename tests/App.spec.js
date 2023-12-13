const { test, expect } = require("@playwright/test");

const user = require("../user");
const email = user.userData.emailValue;
const password = user.userData.passwordValue;

test("NegativeAuthTest", async ({ page }) => {

    await page.goto(`https://netology.ru/?modal=sign_in`);
    await page.click('[placeholder="Email"]');
    await page.fill('[placeholder="Email"]', 'maymaymay1234@gmail.com');
    await page.click('[placeholder="Пароль"]');
    await page.fill('[placeholder="Пароль"]', 'passwordpasswordpassword123');
    await page.click('[data-testid="login-submit-btn"]');
    await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText(`Вы ввели неправильно логин или пароль`);  

});

test("PositiveAuthTest", async ({ page }) => {

    await page.goto(`https://netology.ru/?modal=sign_in`);
    await page.click('[placeholder="Email"]');
    await page.fill('[placeholder="Email"]', email);
    await page.click('[placeholder="Пароль"]');
    await page.fill('[placeholder="Пароль"]', password);
    await page.click('[data-testid="login-submit-btn"]');
    await expect(page).toHaveURL(`https://netology.ru/profile`);
    await expect(page.locator('[data-testid="profile-programs-content"]')).toBeVisible;
});