import test from "@playwright/test";
import { HomePage } from '../src/pages/home-page';
import {ProductPage} from "../src/pages/product-page";
import {CategoryPage} from "../src/pages/category-page";

test('Клиент может зайти на продукт и добавить его в корзину', async({page})=> {
    const categoryName = process.env.SPECIFIC_CATEGORY_NAME || 'Men';

    await test.step('Главная страница', async () => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.selectCategory(categoryName);
    });

    await test.step(`Категория "${categoryName}"`, async () => {
        const categoryPage = new CategoryPage(page);
        await categoryPage.verifyPage();
    });
});