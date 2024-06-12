import { expect, Page } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    private readonly checkoutButtonSelector: string;
    private readonly emailInputSelector: string;
    private readonly firstNameInputSelector: string;
    private readonly lastNameInputSelector: string;
    private readonly addressInputSelector: string;
    private readonly cityInputSelector: string;
    private readonly regionInputSelector: string;
    private readonly postcodeInputSelector: string;
    private readonly phoneInputSelector: string;
    private readonly shippingMethodSelector: string;
    private readonly continueButtonSelector: string;
    private readonly placeOrderButtonSelector: string;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButtonSelector = 'button[title="Proceed to Checkout"]';
        //this.emailInputSelector = 'input[id="customer-email"]';
        //this.emailInputSelector = '#customer-email';
        this.emailInputSelector = 'input.input-text[type="email"][name="username"]#customer-email';
        this.firstNameInputSelector = 'input[name="firstname"]';
        this.lastNameInputSelector = 'input[name="lastname"]';
        this.addressInputSelector = 'input[name="street[0]"]';
        this.cityInputSelector = 'input[name="city"]';
        this.regionInputSelector = 'select[name="region_id"]';
        this.postcodeInputSelector = 'input[name="postcode"]';
        this.phoneInputSelector = 'input[name="telephone"]';
        this.shippingMethodSelector = 'input[type="radio"][value="flatrate_flatrate"]';
        this.continueButtonSelector = 'button[data-role="opc-continue"]';
        this.placeOrderButtonSelector = 'button[title="Place Order"]';
    }

    public async proceedToCheckout() {
        await this.page.click(this.checkoutButtonSelector);
        await this.page.waitForLoadState('networkidle');
        console.log('Proceeded to checkout');
    }

    public async fillShippingInformation() {

        // try {
        //     console.log('Waiting for email input to be visible...');
        //     await this.page.waitForSelector(this.emailInputSelector, { state: 'visible', timeout: 30000 });
        //     console.log('Email input is visible');
        // } catch (error) {
        //     console.error(`Error: Could not find email input - ${error}`);
        // }        
    // await this.page.waitForSelector(this.firstNameInputSelector, { state: 'visible' });
    // await this.page.waitForSelector(this.lastNameInputSelector, { state: 'visible' });
    // await this.page.waitForSelector(this.addressInputSelector, { state: 'visible' });
    // await this.page.waitForSelector(this.cityInputSelector, { state: 'visible' });
    // await this.page.waitForSelector(this.regionInputSelector, { state: 'visible' });
    // await this.page.waitForSelector(this.postcodeInputSelector, { state: 'visible' });
    // await this.page.waitForSelector(this.phoneInputSelector, { state: 'visible' });
    // await this.page.waitForSelector(this.shippingMethodSelector, { state: 'visible', timeout: 10000 });

    await this.page.fill(this.emailInputSelector, 'test@example.com');
    await this.page.fill(this.firstNameInputSelector, 'John');
    await this.page.fill(this.lastNameInputSelector, 'Doe');
    await this.page.fill(this.addressInputSelector, '123 Main St');
    await this.page.fill(this.cityInputSelector, 'Los Angeles');
    await this.page.selectOption(this.regionInputSelector, 'California');
    await this.page.fill(this.postcodeInputSelector, '90001');
    await this.page.fill(this.phoneInputSelector, '1234567890');
    await this.page.click(this.shippingMethodSelector);

    
        // await this.page.fill(this.emailInputSelector, 'test@example.com');
        // await this.page.fill(this.firstNameInputSelector, 'John');
        // await this.page.fill(this.lastNameInputSelector, 'Doe');
        // await this.page.fill(this.addressInputSelector, '123 Main St');
        // await this.page.fill(this.cityInputSelector, 'Los Angeles');
        // await this.page.selectOption(this.regionInputSelector, 'California');
        // await this.page.fill(this.postcodeInputSelector, '90001');
        // await this.page.fill(this.phoneInputSelector, '1234567890');
        // await this.page.click(this.continueButtonSelector);
    }

    public async placeOrder() {
        
        await this.page.click(this.continueButtonSelector);
        await this.page.click(this.placeOrderButtonSelector);
        await this.page.waitForNavigation();
    }

    public async verifyOrderSuccess() {
        await expect(this.page).toHaveURL(/\/checkout\/onepage\/success/);
        await expect(this.page.locator('h1')).toHaveText('Thank you for your purchase!');
    }
}
