// @ts-check
import { test, expect } from '@playwright/test';
import { Config } from '@playwright/test';

const loginTD = {
    "email": "ben+pose@workwithloop.com",
    "password": "Password123"
};
const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];


test.describe('Asana Data-Driven Tests', () => {
    // loops through each Test Case object 
  testCases.forEach((data) => {

    test(`Asana ${data.name}`, async ({ page }) => {

      await test.step('Login to Asana', async () => {
        await page.goto('https://app.asana.com/-/login');
        const email = page.locator('[type="email"]');
        await email.fill(loginTD.email);
        await page.getByText('Continue', { exact: true }).click();
        const password = page.locator('[type="password"]');
        await password.fill(loginTD.password);
        await page.getByRole('button', { name: 'Log in'}).click();
      });

      await test.step('Navigate to the project page', async () => {
        // Navigate to the project 
        const leftNavItem = page.getByText(`${data.leftNav}`);
        await leftNavItem.click();
      });

      await test.step('Verify the card is within the right column', async () => {
        // Verify the card is within the right column
        await page.getByText(`${data.card_title}`).first().click();
        const columnTitle = page.getByText(`${data.column}`);
        await expect(columnTitle).toContainText(`${data.column}`);


        // const column = page.getByText(`${data.column}`);
        // await column.getByText(`${data.card_title}`);

      });
      
    });
  });
});

