import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { adminCredentials, CUSTOMER_URL, HOME_URL } from '../utils/constantes';
import { JobsPage } from '../pages/JobsPage';
import { CustomersPage } from '../pages/CustomersPage';
import { CatalogPage } from '../pages/CatalogPage';

test.describe('Flujo E2E Magento Admin Demo', () => {

  test('Login admin y verificar cinta de opciones + Creacion, Edicion y Eliminacion de Jobs + Creacion de Usuario + Creacion de Producto', async ({ page }) => {
    await page.goto(HOME_URL);

    const adminLoginLink = page.getByRole('link', { name: /Log into the administrator panel/i });
    await expect(adminLoginLink).toBeVisible({ timeout: 15000 });
    await adminLoginLink.click();

    await expect(page).toHaveURL(/admin/, { timeout: 30000 });

    const loginPage = new AdminLoginPage(page);
    await loginPage.fillCredentials(adminCredentials.username, adminCredentials.password);
    await loginPage.submit();

    await loginPage.verifySuccess();

    const dashboardPage = new AdminDashboardPage(page);
    await dashboardPage.verifyCintaOpciones();


    const jobsPage = new JobsPage(page);

    await jobsPage.addNewJob();
    await jobsPage.fillJobForm();
    await jobsPage.saveJob();

    await jobsPage.editJob();
    
    await jobsPage.deleteJob();

    const customerpage = new CustomersPage(page);

    await customerpage.createNewCustomer();

    await customerpage.validatePrefixAndSuffix(
  'antoni.danilo@example.com',
  'Ant',  
  'lo'    
);  

    const catalogPage = new CatalogPage(page);

    await catalogPage.AddNewProduct();

    await catalogPage.saveProduct();
      

  });



 

});

