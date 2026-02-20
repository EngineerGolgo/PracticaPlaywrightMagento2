import { Page, Locator, expect } from '@playwright/test';

export class JobsPage {
  readonly page: Page;
  readonly addNewJobButton: Locator;
  readonly enableJobToggle: Locator;
  readonly jobTitleInput: Locator;
  readonly BarraDesplegable1: Locator;
  readonly BarraDesplegable2: Locator;
  readonly BarraDesplegable3: Locator;
  readonly entitySelect: Locator;
  readonly importBehaviorSelect: Locator;
  readonly importSourceSelect: Locator;
  readonly importTypeSelect: Locator;
  readonly urlInput: Locator;
  readonly validatefileButton: Locator;
  readonly saveButton: Locator;
  readonly deleteButton: Locator;
  readonly dialogOk: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewJobButton = page.getByRole('button', { name: 'Add New Job' });
    this.enableJobToggle = page.locator('label').nth(1) 
    this.jobTitleInput = page.locator('input[name="title"]');
    this.BarraDesplegable1 = page.getByText('Import Settings Changes have')
    this.BarraDesplegable2 = page.getByText('Import Behavior Changes have')
    this.BarraDesplegable3 = page.getByText('Import Source Changes have')
    this.entitySelect = page.locator('select[name="entity"]');
    this.importBehaviorSelect = page.locator('select[name="behavior"]');
    this.importSourceSelect = page.locator('select[name="type_file"]');
    this.importTypeSelect = page.locator('select[name="import_source"]');
    this.urlInput = page.getByRole('textbox', { name: 'Url *' })
    this.validatefileButton = page.getByRole('button', { name: 'Validate File' });
    this.saveButton = page.getByRole('button', { name: 'Save Job' });
    this.deleteButton = page.getByRole('button', { name: 'Delete Import Job' });
    this.dialogOk = page.getByRole('button', { name: 'OK' });

  }


async addNewJob() {
  await this.addNewJobButton.click();
  await expect(this.page.getByText('General Settings')).toBeVisible({ timeout: 20000 });
  console.log('Página "New Job" cargada correctamente (verificado por label General Settings)');

  
}

  async fillJobForm() {
    await this.enableJobToggle.click();
    await this.jobTitleInput.fill('PruebaAuto');
    await this.BarraDesplegable1.click();
    await this.BarraDesplegable2.click(); 
    await this.BarraDesplegable3.click(); 
    await this.entitySelect.selectOption({ label: 'Orders' }); 
    await this.importBehaviorSelect.selectOption({ label: 'Add/Update' }); 
    await this.importSourceSelect.selectOption({ label: 'XML' }); 
    await this.importTypeSelect.selectOption({ label: 'Url' }); 
    await this.urlInput.fill('https://b2b.activeshop.com.pl/media/productsfeed/magento.xml');
  }

  async saveJob() {
    await this.validatefileButton.click();
    await expect(this.page.getByText(/File validated successfully/i)).toBeVisible({ timeout: 20000 });
    await this.saveButton.click();
    await expect(this.page.getByText(/Job was saved successfully./i)).toBeVisible({ timeout: 20000 });
  }

  async editJob() {
await expect(this.page.getByText(/PruebaAuto/i).first()).toBeVisible({ timeout: 20000 });

  const firstEditLink = this.page.getByRole('link', { name: 'Edit' }).first();
  await expect(firstEditLink).toBeVisible({ timeout: 15000 });
  await firstEditLink.click();

  await expect(this.page).toHaveURL(/\/import\/job\/edit\//, { timeout: 60000 });

  await expect(this.page.getByText('PruebaAuto', { exact: false })).toBeVisible({ timeout: 90000 });

  const jobTitleLocator = this.page.locator('input[name="title"]');
  await jobTitleLocator.waitFor({ state: 'visible', timeout: 90000 });
  await expect(jobTitleLocator).toBeEnabled({ timeout: 30000 });

  await jobTitleLocator.fill('PruebaAutoEditada');

  await this.saveButton.click();
  await expect(this.page.getByText(/Job was saved successfully./i)).toBeVisible({ timeout: 30000 });

  console.log('Edit completado – Job Title modificado');
  }

  async deleteJob() {
      await expect.soft(this.page.getByText(/PruebaAutoEditada/i)).toBeVisible({ timeout: 20000 });
      const firstEditLink = this.page.getByRole('link', { name: 'Edit' }).first();
      await expect(firstEditLink).toBeVisible({ timeout: 15000 });
      await firstEditLink.click();

     await expect(this.page).toHaveURL(/\/import\/job\/edit\//, { timeout: 60000 });

     await this.deleteButton.click();
    await this.dialogOk.click();
    await expect(this.page.getByText(/The job has been deleted./i)).toBeVisible({ timeout: 30000 });
    console.log('Delete completado – Job eliminado');
  }
}