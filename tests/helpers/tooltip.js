//ts-ignore
export default class ToolTip {
  async focusAndBlur(locator) {
    await this.focus(locator);
    await this.blur(locator);
  }
}
