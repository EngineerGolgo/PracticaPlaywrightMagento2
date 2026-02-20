import { Page, Locator, expect } from '@playwright/test';

export class CustomersPage {
  readonly page: Page;

  
  readonly allCustomersLink: Locator;
  readonly addNewCustomerButton: Locator;
 

  readonly prefixInput: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly suffixInput: Locator;
  readonly emailInput: Locator;
  readonly saveCustomerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.allCustomersLink = page.getByRole('link', { name: 'All Customers' })
    this.addNewCustomerButton = page.getByRole('button', { name: 'Add New Customer' })

    this.prefixInput = page.getByRole('textbox', { name: 'Name Prefix' })
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' })
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name/Initial' })
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' })
    this.suffixInput = page.getByRole('textbox', { name: 'Name Suffix' })
    this.emailInput = page.getByRole('textbox', { name: 'Email *' })
    this.saveCustomerButton = page.getByRole('button', { name: 'Save Customer' })
  }




  async createNewCustomer() {

await this.page.evaluate(() => {
    const menuItem = document.querySelector('#menu-magento-customer-customer');
    menuItem?.classList.add('_show');
    
    const submenu = menuItem?.querySelector('.submenu');
    if (submenu) {
      (submenu as HTMLElement).style.display = 'block';
      (submenu as HTMLElement).setAttribute('aria-expanded', 'true');
    }
  });

  await this.page.waitForTimeout(300);

    const subMenu = this.page.getByRole('link', { name: 'All Customers' });
    await subMenu.waitFor({ state: 'visible', timeout: 10000 });
    await subMenu.click();



    await this.addNewCustomerButton.click();
    await this.prefixInput.fill('Ant');
    await this.firstNameInput.fill('Antonio');
    await this.middleNameInput.fill('Lopez');
    await this.lastNameInput.fill('Danilo');
    await this.suffixInput.fill('lo');
     await this.emailInput.fill('antoni.danilo@example.com');


    await this.saveCustomerButton.click();

    await expect(this.page.getByText(/You saved the customer./i)).toBeVisible({ timeout: 30000 });
        console.log('Creado Correctamente');

  }

async validatePrefixAndSuffix(email: string, expectedPrefix: string, expectedSuffix: string) {
  const customerRow = this.page.locator('tr').filter({
    has: this.page.locator(`td:has-text("${email}")`)
  });

  await expect(customerRow).toBeVisible({ timeout: 15000 });

  const nameCell = customerRow.locator('td').nth(2); 
  await expect(nameCell).toContainText(expectedPrefix);
  await expect(nameCell).toContainText(expectedSuffix);

  console.log(`Validación completada – Prefix "${expectedPrefix}" y Suffix "${expectedSuffix}" verificados en la fila de ${email}`);
}
}