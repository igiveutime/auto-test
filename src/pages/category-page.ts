import { expect } from "@playwright/test";
import { Page } from "playwright-core";

export class CategoryPage {
    private page: Page;

    private readonly titleSelector: string;
    private readonly listSelector: string;
    private readonly itemsSelector: string;

    constructor(page: Page) {
        this.page =page;
        this.titleSelector = '//*[@data-ui-id="page-title-wrapper"]';
        //*[@data-ui-id="page-title-wrapper"]
        //[data-ui-id="page-title-wrapper

        this.listSelector  = '//ol[contains(@class,"product-items")]';
        this.itemsSelector = '//ol[contains(@class,"product-items")]/child::li/descendant::a[@class="product-item-link"]';
    }

    public async selectRandomItem() {
        let numberOfItems = await this.countOfElements(this.itemsSelector);

        console.log(`${numberOfItems} товаров отображено на странице категории `);

        let itemToBeSelected = Math.floor((Math.random() * Number(numberOfItems)) + 1);

        console.log(`Выбираем товар под номером ${itemToBeSelected} в списке`)

        let targetUrl = await this.page.getAttribute(`(${this.itemsSelector})[${itemToBeSelected}]`,'href');

        console.log(`URL товара - ${targetUrl}`)

        await this.page.click(`(${this.itemsSelector})[${itemToBeSelected}]`);

        expect(this.page.url()).toBe(targetUrl);
    }

    public async verifyPage() {
        await expect(this.page.locator(this.titleSelector)).toBeVisible();
    }


    private async countOfElements(locator) {
        return await this.page.locator(locator).count();
    }
}