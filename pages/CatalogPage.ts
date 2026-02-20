import { Page, Locator, expect } from '@playwright/test';

export class CatalogPage {


   readonly ProductsLink: Locator;
   readonly AddNewProductButton: Locator;
   readonly productNameInput: Locator;
   readonly SKUInput: Locator;
   readonly PriceInput: Locator;
   readonly barraDesplegableProducto1: Locator;
   readonly barraDesplegableProducto2: Locator;
   readonly NumberText1: Locator;
   readonly NumberText2: Locator;


  constructor(private page: Page) {
    this.ProductsLink = page.getByRole('link', { name: 'Products' })
    this.AddNewProductButton = page.getByRole('button', { name: 'Add Product', exact: true })
    this.productNameInput = page.getByRole('textbox', { name: '[STORE VIEW] Product Name *' })
    this.SKUInput = page.getByRole('textbox', { name: '[GLOBAL] SKU *' })
    this.PriceInput = page.getByRole('textbox', { name: '[GLOBAL] Price * $' })
    this.barraDesplegableProducto1 = page.getByText('Attributes Changes have been')
    this.barraDesplegableProducto2 = page.getByText('Images And Videos Changes')
    this.NumberText1 = page.getByRole('textbox', { name: '[STORE VIEW] QA262 *' })
    this.NumberText2 = page.getByRole('textbox', { name: '[STORE VIEW] 12345# *' })

  }


  async navigateToProducts() {
    await this.page.evaluate(() => {
      const menuItem = document.querySelector('#menu-magento-catalog-catalog');
      menuItem?.classList.add('_show');
      const submenu = menuItem?.querySelector('.submenu');
      if (submenu) {
        (submenu as HTMLElement).style.display = 'block';
        (submenu as HTMLElement).setAttribute('aria-expanded', 'true');
      }
    });

    await this.page.waitForTimeout(300);


    await this.page.waitForLoadState('networkidle');
  }

async clickAddNewProduct() {
  await this.page.evaluate(() => {
    const toggleBtn = document.querySelector(
      'button[data-ui-id="products-list-add-new-product-button-dropdown"]'
    ) as HTMLElement;
    toggleBtn?.click();
  });

  await this.page.waitForTimeout(500);

  await this.page.evaluate(() => {
    const span = document.querySelector(
      'span[data-ui-id="products-list-add-new-product-button-item-simple"]'
    ) as HTMLElement;
    span?.click();
  });

  await this.page.waitForURL('**/catalog/product/new/**', { timeout: 15000 });
}

  async AddNewProduct() {

    await this.navigateToProducts();

    await this.ProductsLink.click();

    await this.clickAddNewProduct();


    await this.barraDesplegableProducto1.click();
    await this.barraDesplegableProducto2.click();
    await this.productNameInput.fill('Producto de Prueba');
    await this.SKUInput.fill('PRUEBA123');
    await this.PriceInput.fill('19.99');
    await this.NumberText1.fill('262');
    await this.NumberText2.fill('264');


  }


async saveProduct() {
  await this.page.evaluate(() => {
    const btn = document.querySelector('button[data-ui-id="save-button"]') as HTMLElement;
    btn?.click();
  });
}
}