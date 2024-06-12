import test from '@playwright/test';
import { ProductPage } from '../src/pages/product-page';
import { CheckoutPage } from '../src/pages/checkout';;

test('should complete checkout process', async ({ page }) => {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Переход на страницу продукта и добавление в корзину
    await productPage.navigate(process.env.SPECIFIC_PDP_URL || '');
    await productPage.verifyPage();
    await productPage.selectAnySize();
    await productPage.selectAnyColor();
    await productPage.addProductToCart();
    
    // Переход к оформлению заказа
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingInformation();
    await checkoutPage.placeOrder();
    await checkoutPage.verifyOrderSuccess();
});
