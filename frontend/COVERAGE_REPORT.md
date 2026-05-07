# Coverage Report

## Pruebas Funcionales de Botones

| Métrica | Valor |
|---------|-------|
| Estado | CRÍTICA |
| Botones testeados | 0 |
| Botones pasados | 0 |
| Botones fallidos | 0 |

### Detalle de Botones

| Componente | Botón | Tipo | Estado |
|------------|-------|------|--------|
| - | - | - | - |

### Botones Detectados

| Archivo | Botón | Variante |
|---------|-------|----------|
| pages/06-Login-Registro.tsx | Login | primary, submit |
| pages/06-Login-Registro.tsx | Create Account | primary, submit |
| pages/01-Home.tsx | Add to Cart | primary |
| pages/05-Checkout.tsx | Back | outline |
| pages/05-Checkout.tsx | Continue | primary |
| pages/05-Checkout.tsx | Place Order | primary |
| pages/04-Carrito.tsx | Remove | ghost |
| pages/04-Carrito.tsx | Proceed to Checkout | primary |
| pages/03-Detalle-Producto.tsx | Add to Cart | primary |
| pages/02-Catálogo.tsx | Add to Cart | primary |
| pages/07-Perfil.tsx | Save Changes | primary |
| pages/07-Perfil.tsx | Add New Address | outline |
| pages/10-Admin-Productos.tsx | Add Product | primary |
| pages/13-Admin-Cupones.tsx | Add Coupon | primary |
| pages/17-Mobile-Carrito.tsx | Checkout | primary |
| pages/14-Mobile-Home.tsx | Add | primary |

### Fallos Detectados

- **Error de conexión**: El servidor de desarrollo no está corriendo
  - Causa: `net::ERR_CONNECTION_REFUSED at http://localhost:3001`
  - Los tests fueron ejecutados pero el servidor de desarrollo no pudo iniciar
  - Playwright webServer timeout: 120000ms

### Notas

- Playwright chromium instalado correctamente
- 14 tests creados para botones en 5 categorías
- Tests no pudieron ejecutarse debido a que el dev server no está disponible
- Los tests fueron diseñados para ejecutarse contra http://localhost:3001 (puerto configurado en package.json)