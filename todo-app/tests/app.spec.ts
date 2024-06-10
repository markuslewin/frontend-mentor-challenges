import { test, expect, Page } from "@playwright/test";

function getTextbox(page: Page) {
  return page.getByRole("textbox", { name: "create a new todo" });
}

function getTodos(page: Page) {
  return page.getByRole("list", { name: "todos" }).getByRole("listitem");
}

test("adds new todo", async ({ page }) => {
  const textbox = getTextbox(page);
  const todos = getTodos(page);
  const todo = todos.first();

  const text = "Complete online JavaScript course";
  const whitespaceText = "         ";

  await page.goto("/");
  await textbox.fill(text);
  await textbox.press("Enter");

  await expect(textbox).toBeEmpty();
  await expect(todos).toHaveCount(1);
  await expect(todo).toHaveText(new RegExp(text, "i"));
  await expect(todo.getByRole("checkbox", { name: text })).not.toBeChecked();

  await textbox.press("Enter");

  await expect(todos).toHaveCount(1);

  await textbox.fill(whitespaceText);
  await textbox.press("Enter");

  await expect(textbox).toHaveValue(whitespaceText);
  await expect(todos).toHaveCount(1);
});

test.skip("completes todo", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test.skip("deletes todo", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test.skip("filters todos", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test.skip("clears completed todos", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test.skip("drags and drops todos", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test.skip("persists application state", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test.skip("toggles todos", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});
