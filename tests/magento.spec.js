import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { adminCredentials, CUSTOMER_URL, HOME_URL } from '../utils/constantes';
import { JobsPage } from '../pages/JobsPage';
import { CustomersPage } from '../pages/CustomersPage';
import { CatalogPage } from '../pages/CatalogPage';

test.describe('Flujo E2E Magento Admin Demo', () => {

  test('Login admin y verificar cinta de opciones + Creacion, Edicion y Eliminacion de Jobs + Creacion de Usuario + Creacion de Producto', async ({ page }) => {
   // 1. Ir a la homepage
    await page.goto(HOME_URL);

    // 2. Click en el link "Log into the administrator panel" (directo en el test)
    const adminLoginLink = page.getByRole('link', { name: /Log into the administrator panel/i });
    await expect(adminLoginLink).toBeVisible({ timeout: 15000 });
    await adminLoginLink.click();

    // 3. Espera a que cargue la página de login admin
    await expect(page).toHaveURL(/admin/, { timeout: 30000 });

    // 4. Llenar credenciales y submit (usando POM)
    const loginPage = new AdminLoginPage(page);
    await loginPage.fillCredentials(adminCredentials.username, adminCredentials.password);
    await loginPage.submit();

    // 5. Verificar login exitoso (redirige a dashboard)
    await loginPage.verifySuccess();

    // 6. Verificar la cinta de opciones (sidebar admin)
    const dashboardPage = new AdminDashboardPage(page);
    await dashboardPage.verifyCintaOpciones();

    // ... después de dashboardPage.verifyCintaOpciones()

    const jobsPage = new JobsPage(page);

    // 6. Añadir nuevo Job
    await jobsPage.addNewJob();
    await jobsPage.fillJobForm();
    await jobsPage.saveJob();

    // 7. Editar Re-Index after Import
    await jobsPage.editJob();
    

    // 8. Eliminar
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

