import { expect, Page } from "@playwright/test";

export class HomePage {
    private page: Page;
    private readonly menuSelector: string;
    private readonly urlSelector: string;

    constructor(page: Page) {
        this.page = page;

        this.menuSelector = 'div[id="store.menu"]';
        this.urlSelector  = `${process.env.BASE_URL}`;
    }

    public async selectCategory(item) {
        const element = `(//span[text()="${item}"]/parent::a)[1]`;
        await this.page.locator(element).click();
        console.log(`Кликнули на ${element}`);
    }


    public async navigate() {
        await this.page.goto(this.urlSelector);
    }
}
