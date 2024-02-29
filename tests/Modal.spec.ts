import { test, expect, Page } from "@playwright/test";
import { TEST_URL } from "./setTestUrl";

test.describe("modal", async () => {
  test.beforeEach(async ({ page }: Page) => {
    await page.goto(TEST_URL);
    await page.getByText("Авторизоваться").click();
    const modalBackgroundElement1 = await page.$("#modal-background");
    expect(modalBackgroundElement1).toBeTruthy();
  });

  test("opens and closes by external click", async ({ page }: Page) => {
    await page.mouse.click(10, 10);
  });

  test("closes by clicking on #modal-closeBtn", async ({ page }: Page) => {
    await page.click("#modal-closeBtn");
  });

  test("closes by pressing Escape key", async ({ page }: Page) => {
    await page.keyboard.press("Escape");
  });

  test.afterEach(async ({ page }: Page) => {
    await page.waitForTimeout(500); // Дождаться анимации модального окна
    await page.waitForSelector("#modal", { state: "hidden" }); // Дождаться, пока модальное окно исчезнет или станет невидимым
    const modalBackgroundElement2 = await page.$("#modal-background");
    expect(modalBackgroundElement2).toBeNull();
  });
});
