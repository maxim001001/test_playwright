import { test, expect, Page } from "@playwright/test";
import { TEST_URL } from "./setTestUrl";

test.describe("modal", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
    await page.getByTestId("buttonOpen-authModal").click();
    const modalBackgroundElement1 = await page.$("#modal-background");
    expect(modalBackgroundElement1).toBeTruthy();
  });

  test("opens and closes by external click", async ({ page }) => {
    await page.mouse.click(10, 10);
  });

  test("closes by clicking on Close Button", async ({ page }) => {
    await page.getByTestId("buttonClose-authModal").click();
  });

  test("closes by pressing Escape key", async ({ page }) => {
    await page.keyboard.press("Escape");
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(100); // Дождаться закрытия модального окна
    await page.waitForSelector("#modal", { state: "hidden" }); // Дождаться, пока модальное окно исчезнет или станет невидимым
    const modalBackgroundElement2 = await page.$("#modal-background");
    expect(modalBackgroundElement2).toBeNull();
  });
});
