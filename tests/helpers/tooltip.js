//ts-ignore
export default class ToolTip {
  async clickAndBlur(elementid, page) {
    const element = await page.getByTestId(elementid);
    await element.click();
    await element.blur();
  }
}
