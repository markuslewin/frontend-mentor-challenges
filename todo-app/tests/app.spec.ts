import { test, expect, Page } from "@playwright/test";

function getTextbox(page: Page) {
  return page.getByRole("textbox", { name: "create a new todo" });
}

function getTodos(page: Page) {
  return page.getByRole("list", { name: "todos" }).getByRole("listitem");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const TODO_ITEMS = [
  "Complete online JavaScript course",
  "Jog around the park 3x",
  "10 minutes meditation",
  "Read for 1 hour",
  "Pick up groceries",
  "Complete Todo App on Frontend Mentor",
];

test("adds new todo", async ({ page }) => {
  const textbox = getTextbox(page);
  const todos = getTodos(page);

  const whitespaceText = "         ";

  await textbox.fill(TODO_ITEMS[0]);
  await textbox.press("Enter");

  await expect(textbox).toBeEmpty();
  await expect(todos).toHaveText([new RegExp(TODO_ITEMS[0])]);
  await expect(
    todos.first().getByRole("checkbox", { name: TODO_ITEMS[0] })
  ).not.toBeChecked();

  await textbox.press("Enter");

  await expect(todos).toHaveCount(1);

  await textbox.fill(whitespaceText);
  await textbox.press("Enter");

  await expect(textbox).toHaveValue(whitespaceText);
  await expect(todos).toHaveCount(1);

  await textbox.fill(TODO_ITEMS[1]);
  await textbox.press("Enter");

  await expect(todos).toHaveText([
    new RegExp(TODO_ITEMS[0]),
    new RegExp(TODO_ITEMS[1]),
  ]);

  // todo: Expect items left
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
