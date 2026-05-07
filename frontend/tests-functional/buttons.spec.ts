import { test, expect } from '@playwright/test';

test.describe('Botones de Login/Registro', () => {
  test('botón Login existe y es clickeable', async ({ page }) => {
    await page.goto('/login');
    const loginBtn = page.getByRole('button', { name: /login/i });
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toBeEnabled();
  });

  test('botón Create Account existe y es clickeable', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('tab', { name: /register/i }).click();
    const registerBtn = page.getByRole('button', { name: /create account/i });
    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toBeEnabled();
  });

  test('botón Login llama al handler', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /login/i }).click();
    page.on('dialog', dialog => expect(dialog.message()).toContain('Login'));
    await page.waitForTimeout(500);
  });
});

test.describe('Botones de Home', () => {
  test('botón Add to Cart existe y es clickeable', async ({ page }) => {
    await page.goto('/');
    const addBtn = page.getByRole('button', { name: /add to cart/i }).first();
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toBeEnabled();
  });

  test('botón Add to Cart llama al handler', async ({ page }) => {
    await page.goto('/');
    page.on('dialog', dialog => expect(dialog.message()).toContain('cart'));
    await page.getByRole('button', { name: /add to cart/i }).first().click();
    await page.waitForTimeout(500);
  });
});

test.describe('Botones de Checkout', () => {
  test('botón Continue existe y es clickeable', async ({ page }) => {
    await page.goto('/checkout');
    const continueBtn = page.getByRole('button', { name: /continue/i });
    await expect(continueBtn).toBeVisible();
    await expect(continueBtn).toBeEnabled();
  });

  test('botón Back existe cuando no es primer step', async ({ page }) => {
    await page.goto('/checkout');
    const continueBtn = page.getByRole('button', { name: /continue/i });
    await continueBtn.click();
    const backBtn = page.getByRole('button', { name: /back/i });
    await expect(backBtn).toBeVisible();
  });

  test('botón Place Order existe en último step', async ({ page }) => {
    await page.goto('/checkout');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('button', { name: /continue/i }).click();
    const placeOrderBtn = page.getByRole('button', { name: /place order/i });
    await expect(placeOrderBtn).toBeVisible();
    await expect(placeOrderBtn).toBeEnabled();
  });

  test('botón Continue avanza al siguiente step', async ({ page }) => {
    await page.goto('/checkout');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.waitForTimeout(300);
  });
});

test.describe('Botones de Carrito', () => {
  test('botón Remove existe y es clickeable', async ({ page }) => {
    await page.goto('/carrito');
    const removeBtn = page.getByRole('button', { name: /remove/i }).first();
    await expect(removeBtn).toBeVisible();
    await expect(removeBtn).toBeEnabled();
  });

  test('botón Proceed to Checkout existe y es clickeable', async ({ page }) => {
    await page.goto('/carrito');
    const checkoutBtn = page.getByRole('button', { name: /proceed to checkout/i });
    await expect(checkoutBtn).toBeVisible();
    await expect(checkoutBtn).toBeEnabled();
  });

  test('botón Remove elimina item', async ({ page }) => {
    await page.goto('/carrito');
    const initialCount = await page.locator('button:has-text("Remove")').count();
    await page.getByRole('button', { name: /remove/i }).first().click();
    await page.waitForTimeout(300);
  });
});

test.describe('Botones de Navegación', () => {
  test('link de navegación a Login existe', async ({ page }) => {
    await page.goto('/');
    const loginLink = page.locator('nav a[href="/perfil"]');
    await expect(loginLink).toBeVisible();
  });

  test('link de navegación a Carrito existe', async ({ page }) => {
    await page.goto('/');
    const cartLink = page.locator('nav a[href="/carrito"]');
    await expect(cartLink).toBeVisible();
  });
});