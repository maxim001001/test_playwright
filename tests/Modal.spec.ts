import { test, expect } from "@playwright/test";

const baseUrl = "https://lgqlmp-3000.csb.app/";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test("modal opens and closes", async ({ page }) => {
  await page.getByText("Авторизоваться").click();
  // #modal-background
  const modal = await page.waitForSelector("#modal", { state: "visible" });
  expect(modal).toBeTruthy();

  // Проверяем, что модальное окно открыто
  const modal = await page.waitForSelector("#modal", { state: "visible" });
  expect(modal).toBeTruthy();

  // Кликаем по крестику, чтобы закрыть модальное окно
  await page.click("#closeModalButton");

  // Проверяем, что модальное окно закрыто
  await page.waitForSelector("#modal", { state: "hidden" });

  // Кликаем по кнопке, чтобы открыть модальное окно
  await page.click("#openModalButton");

  // Проверяем, что модальное окно открыто
  await page.waitForSelector("#modal", { state: "visible" });

  // Кликаем по внешнему фону, чтобы закрыть модальное окно
  await page.click("#modalBackground");

  // Проверяем, что модальное окно закрыто
  await page.waitForSelector("#modal", { state: "hidden" });
});
