// - [Integration-тест] Сделать компонент формы входа
//     + Покрыть тестами функции валидации
//     + Покрыть тестами валидацию инпутов
//     + Покрыть тестами сабмит формы
//     - Сделать скриншот тест нескольких состояний

import { test, expect } from "@playwright/test";

const baseUrl = "https://lgqlmp-3000.csb.app/";
test.describe("Test MainPage Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByText("Авторизоваться").click();
  });

  test("entering a value", async ({ page }) => {
    await page.getByPlaceholder("Почта").fill("123");
    await page.getByPlaceholder("Пароль").fill("123");
    await expect(page.getByPlaceholder("Почта")).toHaveValue("123");
    await expect(page.getByPlaceholder("Пароль")).toHaveValue("123");
  });

  test("validation bad email input", async ({ page }) => {
    await page.getByPlaceholder("Почта").click();
    await page.getByPlaceholder("Почта").blur();
    await expect(page.getByText("Обязательно к заполнению")).toBeVisible();
    await page.getByPlaceholder("Почта").fill("wrong.mail");
    await expect(page.getByText("Некорректный email адрес")).toBeVisible();
    await page.getByPlaceholder("Почта").fill("admin@gmail.com");
    await expect(page.getByText("Электронная почта")).toBeVisible();
  });

  test("validation bad password input", async ({ page }) => {
    await page.getByPlaceholder("Пароль").click();
    await page.getByPlaceholder("Пароль").blur();
    await expect(page.getByText("Обязательно к заполнению")).toBeVisible();
    await page.getByPlaceholder("Пароль").fill("123");
    await expect(page.getByText("Слишком короткий пароль")).toBeVisible();
    await page.getByPlaceholder("Пароль").fill("12345");
    await expect(page.getByText("Введите пароль")).toBeVisible();
  });

  test("the button may be blocked if the email is incorrect", async ({
    page,
  }) => {
    await page.getByPlaceholder("Почта").fill("admingmail.com");
    await page.getByPlaceholder("Пароль").fill("12345");

    const buttonLocator = await page.getByText("Отправить");
    const isButtonDisabled = await buttonLocator.evaluate(
      (button: any) => button.disabled,
    );
    expect(isButtonDisabled).toBe(true);

    await page.getByPlaceholder("Почта").fill("admin@gmail.com");
    const isButtonActive = await buttonLocator.evaluate(
      (button: any) => button.disabled,
    );
    expect(isButtonActive).toBe(false);
  });

  test("the button may be blocked if the password is incorrect", async ({
    page,
  }) => {
    await page.getByPlaceholder("Почта").fill("admin@gmail.com");
    await page.getByPlaceholder("Пароль").fill("123");

    const buttonLocator = await page.getByText("Отправить");
    const isButtonDisabled = await buttonLocator.evaluate(
      (button: any) => button.disabled,
    );
    expect(isButtonDisabled).toBe(true);

    await page.getByPlaceholder("Пароль").fill("12345");
    const isButtonActive = await buttonLocator.evaluate(
      (button: any) => !button.disabled,
    );
    expect(isButtonActive).toBe(true);
  });
});
