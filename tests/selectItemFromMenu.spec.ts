import test from "@playwright/test";
import { HomePage } from '../src/pages/home-page';

test('Клиент может выбрать пункт меню', async({page})=> {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.selectCategory('Men');
});