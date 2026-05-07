# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: buttons.spec.ts >> Botones de Carrito >> botón Remove elimina item
- Location: tests-functional/buttons.spec.ts:90:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/carrito
Call log:
  - navigating to "http://localhost:3001/carrito", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Botones de Login/Registro', () => {
  4   |   test('botón Login existe y es clickeable', async ({ page }) => {
  5   |     await page.goto('/login');
  6   |     const loginBtn = page.getByRole('button', { name: /login/i });
  7   |     await expect(loginBtn).toBeVisible();
  8   |     await expect(loginBtn).toBeEnabled();
  9   |   });
  10  | 
  11  |   test('botón Create Account existe y es clickeable', async ({ page }) => {
  12  |     await page.goto('/login');
  13  |     await page.getByRole('tab', { name: /register/i }).click();
  14  |     const registerBtn = page.getByRole('button', { name: /create account/i });
  15  |     await expect(registerBtn).toBeVisible();
  16  |     await expect(registerBtn).toBeEnabled();
  17  |   });
  18  | 
  19  |   test('botón Login llama al handler', async ({ page }) => {
  20  |     await page.goto('/login');
  21  |     await page.getByRole('button', { name: /login/i }).click();
  22  |     page.on('dialog', dialog => expect(dialog.message()).toContain('Login'));
  23  |     await page.waitForTimeout(500);
  24  |   });
  25  | });
  26  | 
  27  | test.describe('Botones de Home', () => {
  28  |   test('botón Add to Cart existe y es clickeable', async ({ page }) => {
  29  |     await page.goto('/');
  30  |     const addBtn = page.getByRole('button', { name: /add to cart/i }).first();
  31  |     await expect(addBtn).toBeVisible();
  32  |     await expect(addBtn).toBeEnabled();
  33  |   });
  34  | 
  35  |   test('botón Add to Cart llama al handler', async ({ page }) => {
  36  |     await page.goto('/');
  37  |     page.on('dialog', dialog => expect(dialog.message()).toContain('cart'));
  38  |     await page.getByRole('button', { name: /add to cart/i }).first().click();
  39  |     await page.waitForTimeout(500);
  40  |   });
  41  | });
  42  | 
  43  | test.describe('Botones de Checkout', () => {
  44  |   test('botón Continue existe y es clickeable', async ({ page }) => {
  45  |     await page.goto('/checkout');
  46  |     const continueBtn = page.getByRole('button', { name: /continue/i });
  47  |     await expect(continueBtn).toBeVisible();
  48  |     await expect(continueBtn).toBeEnabled();
  49  |   });
  50  | 
  51  |   test('botón Back existe cuando no es primer step', async ({ page }) => {
  52  |     await page.goto('/checkout');
  53  |     const continueBtn = page.getByRole('button', { name: /continue/i });
  54  |     await continueBtn.click();
  55  |     const backBtn = page.getByRole('button', { name: /back/i });
  56  |     await expect(backBtn).toBeVisible();
  57  |   });
  58  | 
  59  |   test('botón Place Order existe en último step', async ({ page }) => {
  60  |     await page.goto('/checkout');
  61  |     await page.getByRole('button', { name: /continue/i }).click();
  62  |     await page.getByRole('button', { name: /continue/i }).click();
  63  |     const placeOrderBtn = page.getByRole('button', { name: /place order/i });
  64  |     await expect(placeOrderBtn).toBeVisible();
  65  |     await expect(placeOrderBtn).toBeEnabled();
  66  |   });
  67  | 
  68  |   test('botón Continue avanza al siguiente step', async ({ page }) => {
  69  |     await page.goto('/checkout');
  70  |     await page.getByRole('button', { name: /continue/i }).click();
  71  |     await page.waitForTimeout(300);
  72  |   });
  73  | });
  74  | 
  75  | test.describe('Botones de Carrito', () => {
  76  |   test('botón Remove existe y es clickeable', async ({ page }) => {
  77  |     await page.goto('/carrito');
  78  |     const removeBtn = page.getByRole('button', { name: /remove/i }).first();
  79  |     await expect(removeBtn).toBeVisible();
  80  |     await expect(removeBtn).toBeEnabled();
  81  |   });
  82  | 
  83  |   test('botón Proceed to Checkout existe y es clickeable', async ({ page }) => {
  84  |     await page.goto('/carrito');
  85  |     const checkoutBtn = page.getByRole('button', { name: /proceed to checkout/i });
  86  |     await expect(checkoutBtn).toBeVisible();
  87  |     await expect(checkoutBtn).toBeEnabled();
  88  |   });
  89  | 
  90  |   test('botón Remove elimina item', async ({ page }) => {
> 91  |     await page.goto('/carrito');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/carrito
  92  |     const initialCount = await page.locator('button:has-text("Remove")').count();
  93  |     await page.getByRole('button', { name: /remove/i }).first().click();
  94  |     await page.waitForTimeout(300);
  95  |   });
  96  | });
  97  | 
  98  | test.describe('Botones de Navegación', () => {
  99  |   test('link de navegación a Login existe', async ({ page }) => {
  100 |     await page.goto('/');
  101 |     const loginLink = page.locator('nav a[href="/perfil"]');
  102 |     await expect(loginLink).toBeVisible();
  103 |   });
  104 | 
  105 |   test('link de navegación a Carrito existe', async ({ page }) => {
  106 |     await page.goto('/');
  107 |     const cartLink = page.locator('nav a[href="/carrito"]');
  108 |     await expect(cartLink).toBeVisible();
  109 |   });
  110 | });
```