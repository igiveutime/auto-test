import test from '@playwright/test';
import { CartPage } from '../src/pages/cart-page';
import { HomePage } from '../src/pages/home-page';
import { ProductPage } from '../src/pages/product-page';
import { CategoryPage } from '../src/pages/category-page';

test('Клиент может: перейти с главной на категорию, выбрать товар и добавить в корзину', async({page}) => {
    const categoryName = process.env.SPECIFIC_CATEGORY_NAME || 'Men';

    await test.step('Главная страница', async () => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.selectCategory(categoryName);
    });

    await test.step(`Категория "${categoryName}"`, async () => {
        const categoryPage = new CategoryPage(page);
        await categoryPage.selectRandomItem();
    });

    await test.step(`Заходим в продукт и добавляем в корзину`, async () => {
        const productPage = new ProductPage(page);
        await productPage.verifyPage();
        await productPage.selectAnySize();
        await productPage.selectAnyColor();
        await productPage.addProductToCart();
    });

    await test.step(`Просмотр корзины`, async () => {
        const cartPage = new CartPage(page);
        await cartPage.checkOutCart();
    });
})