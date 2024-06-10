import { test, expect, Page } from "@playwright/test";

function getTextbox(page: Page) {
  return page.getByRole("textbox", { name: "create a new todo" });
}

function getTodos(page: Page) {
  return page.getByRole("list", { name: "todos" }).getByRole("listitem");
}

function getItemsLeft(page: Page) {
  return page.getByTestId("items-left");
}

async function createTodos(page: Page, quantity?: number) {
  const textbox = getTextbox(page);

  for (const todo of TODO_ITEMS.slice(0, quantity)) {
    await textbox.fill(todo);
    await textbox.press("Enter");
  }
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
  const itemsLeft = getItemsLeft(page);

  const whitespaceText = "         ";

  await textbox.fill(TODO_ITEMS[0]);
  await textbox.press("Enter");

  await expect(textbox).toBeEmpty();
  await expect(todos).toHaveText([new RegExp(TODO_ITEMS[0])]);
  await expect(
    todos.first().getByRole("checkbox", { name: TODO_ITEMS[0] })
  ).not.toBeChecked();
  await expect(itemsLeft).toHaveText("1");

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
  await expect(itemsLeft).toHaveText("2");
});

test("completes todo", async ({ page }) => {
  const todos = getTodos(page);
  const itemsLeft = getItemsLeft(page);

  await createTodos(page, 3);

  await expect(itemsLeft).toHaveText("3");

  todos.first().getByRole("checkbox").check();

  await expect(itemsLeft).toHaveText("2");

  todos.nth(2).getByRole("checkbox").check();

  await expect(itemsLeft).toHaveText("1");

  todos.nth(1).getByRole("checkbox").check();

  await expect(itemsLeft).toHaveText("0");
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
