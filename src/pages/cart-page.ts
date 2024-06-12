import { expect, Page } from "@playwright/test";

export class CartPage {
    private page: Page;
    
    private readonly goCheckoutSelector : string;
    private readonly cartTotalSelector: string;

    constructor(page:Page) {
        this.page = page;

        this.cartTotalSelector  = 'div[id="cart-totals"]';
        this.goCheckoutSelector = 'div[class="cart-summary"] button[title="Proceed to Checkout"]';
    }

    public async checkOutCart() {
        await expect(this.page.locator(this.cartTotalSelector)).toBeVisible();
        await expect(this.page.locator(this.goCheckoutSelector)).toBeVisible();
        await this.page.locator(this.goCheckoutSelector).click();
    }
}