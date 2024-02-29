//- [E2E-тест] Используя форму регистрации сделать флоу регистрации пользователя в приложении.
//  При успешном сабмите показывать не форму, а надпись “У вас есть доступ на сайт”
//  - Покрыть тестом пользовательский флоу регистрации.
// Ввод данных → сабмит → форма пропала и отображается надпись

import { test, expect, Page } from "@playwright/test";
import { TEST_URL } from "./setTestUrl";

test.beforeEach(async ({ page }: Page) => {
  await page.goto(TEST_URL);
  await page.getByText("Авторизоваться").click();
});

test("test write wrong data", async ({ page }: Page) => {
  await expect(page.getByTestId("auth-form")).toBeVisible();
  await page.getByPlaceholder("Почта").fill("test");
  await page.getByPlaceholder("Пароль").fill("test");
  await page.getByText("Отправить").click();
  await expect(page).toHaveURL(TEST_URL);
});

test("test write right data", async ({ page }: Page) => {
  await expect(page.getByTestId("auth-form")).toBeVisible();
  await page.getByPlaceholder("Почта").fill("admin@gmail.com");
  await page.getByPlaceholder("Пароль").fill("12345");
  await page.getByText("Отправить").click();
  await expect(page.getByText("У вас есть доступ на сайт")).toBeVisible();
  await expect(page).toHaveURL(`${TEST_URL}` + "/dashboard");
  await page.getByText("Выйти").click();
  await expect(page).toHaveURL(TEST_URL);
  await expect(page.getByText("Авторизоваться")).toBeVisible();
  await expect(page.getByTestId("auth-form")).toBeVisible();
});
