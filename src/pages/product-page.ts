import { expect, Page } from '@playwright/test';

export class ProductPage {
    private page: Page;

    private readonly productTitleSelector: string;
    private readonly sizeSelector: string;
    private readonly colorSelector: string;
    private readonly addToCartSelector: string;
    private readonly cartSelector: string;

    constructor(page: Page) {
        this.page = page;

        this.productTitleSelector = 'h1.page-title span'
        this.sizeSelector = 'div[id*="option-label-size"]';
        this.colorSelector = 'div[id*="option-label-color"]';
        this.addToCartSelector = '#product-addtocart-button';
        this.cartSelector = '//a[text()="shopping cart"]';
    }

    public async ready() {
        await this.page.locator('.minicart-wrapper');
    }

    public async verifyPage() {
        await expect(this.page.locator(this.productTitleSelector)).toBeVisible();
    }

    public async navigate(endpoint: string) {
        await this.page.goto(endpoint);
    }

    public async selectAnySize() {

        let sizeElements = await this.countOfElements(`${this.sizeSelector}`);
        let choice = await this.selectRandom(`${sizeElements}`);
        let sizeChosen =`${this.sizeSelector}:nth-of-type(${choice})`;
        
        console.log(`Размер : ${await this.page.locator(sizeChosen).innerText()}`);
        await this.page.locator(sizeChosen).click();
    }

    public async selectAnyColor() {

        let colorElements = await this.countOfElements(`${this.colorSelector}`);
        let choice = await this.selectRandom(`${colorElements}`);
        let colorChosen =`${this.colorSelector}:nth-of-type(${choice})`;
        
        console.log(`Цвет : ${await this.page.locator(colorChosen).getAttribute('option-label')}`);
        await this.page.locator(colorChosen).click();
    }

    public async addProductToCart() {
      await this.page.locator(this.addToCartSelector).click();
      await this.page.locator(this.cartSelector).click();
    }

    private async countOfElements(locator) {
        return await this.page.locator(locator).count();
    }

    private async selectRandom(limit) {
        return Math.floor((Math.random() * Number(limit))+1);
    }
}