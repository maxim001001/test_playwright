//- [E2E-тест] Используя форму регистрации сделать флоу регистрации пользователя в приложении.
//  При успешном сабмите показывать не форму, а надпись “У вас есть доступ на сайт”
//  - Покрыть тестом пользовательский флоу регистрации.
// Ввод данных → сабмит → форма пропала и отображается надпись

import { test, expect } from "@playwright/test";

const baseUrl = "https://lgqlmp-3000.csb.app/";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
  await page.getByText("Авторизоваться").click();
});

test("test write wrong data", async ({ page }) => {
  await expect(page.getByTestId("auth-form")).toBeVisible();
  await page.getByPlaceholder("Почта").fill("test");
  await page.getByPlaceholder("Пароль").fill("test");
  await page.getByText("Отправить").click();
  await expect(page).toHaveURL("https://lgqlmp-3000.csb.app/");
});

test("test write right data", async ({ page }) => {
  await expect(page.getByTestId("auth-form")).toBeVisible();
  await page.getByPlaceholder("Почта").fill("admin@gmail.com");
  await page.getByPlaceholder("Пароль").fill("12345");
  await page.getByText("Отправить").click();
  await expect(page.getByText("У вас есть доступ на сайт")).toBeVisible();
  await expect(page).toHaveURL("https://lgqlmp-3000.csb.app/dashboard");
  await page.getByText("Выйти").click();
  await expect(page).toHaveURL("https://lgqlmp-3000.csb.app/");
  await expect(page.getByText("Авторизоваться")).toBeVisible();
  await expect(page.getByTestId("auth-form")).toBeVisible();
});
