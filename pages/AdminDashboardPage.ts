import { Page, Locator, expect } from '@playwright/test';

export class AdminDashboardPage {
  readonly page: Page;
  readonly sidebarMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarMenu = page.locator('.admin__menu'); // Barra lateral izquierda
  }

  async verifyCintaOpciones() {
    await expect(this.sidebarMenu).toBeVisible({ timeout: 20000 });

    await expect(this.page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Sales/i })).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Catalog/i })).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Customers/i })).toBeVisible();
    await expect(this.page.getByRole('link', { name: /System/i })).toBeVisible();

    console.log('Cinta de opciones del admin verificada correctamente');
  }
}