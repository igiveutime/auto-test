import test from "@playwright/test";
import { HomePage } from '../src/pages/home-page';
import {ProductPage} from "../src/pages/product-page";

test('Клиент может зайти на продукт и добавить его в корзину', async({page})=> {
    const productPage = new ProductPage(page);
    await productPage.navigate(process.env.SPECIFIC_PDP_URL || '');
    await productPage.verifyPage();
    await productPage.selectAnySize();
    await productPage.selectAnyColor();
    await productPage.addProductToCart();
});