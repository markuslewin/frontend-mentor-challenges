import { test, expect, Page } from "@playwright/test";

function getToggleAllCheckbox(page: Page) {
  return page.getByRole("checkbox", { name: "toggle all" });
}

function getTextbox(page: Page) {
  return page.getByRole("textbox", { name: "create a new todo" });
}

function getTodos(page: Page) {
  return page
    .getByRole("list", { name: "Todos", exact: true })
    .getByRole("listitem");
}

function getItemsLeft(page: Page) {
  return page.getByTestId("items-left");
}

function getFilters(page: Page) {
  return page.getByRole("list", { name: "filter" });
}

async function createTodos(page: Page, quantity?: number) {
  const textbox = getTextbox(page);
  const todos = TODO_ITEMS.slice(0, quantity);

  for (const todo of todos) {
    await textbox.fill(todo);
    await textbox.press("Enter");
  }

  return todos;
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

  todos.nth(0).getByRole("checkbox").check();

  await expect(itemsLeft).toHaveText("2");

  todos.nth(2).getByRole("checkbox").check();

  await expect(itemsLeft).toHaveText("1");

  todos.nth(1).getByRole("checkbox").check();

  await expect(itemsLeft).toHaveText("0");

  todos.nth(0).getByRole("checkbox").uncheck();

  await expect(itemsLeft).toHaveText("1");
});

test("deletes todo", async ({ page }) => {
  const todos = getTodos(page);
  const itemsLeft = getItemsLeft(page);

  const texts = await createTodos(page, 3);

  await todos.nth(0).getByRole("button", { name: "delete" }).click();

  await expect(todos).toHaveText([new RegExp(texts[1]), new RegExp(texts[2])]);
  await expect(itemsLeft).toHaveText("2");

  await todos.nth(1).getByRole("button", { name: "delete" }).click();

  await expect(todos).toHaveText([new RegExp(texts[1])]);
  await expect(itemsLeft).toHaveText("1");

  await todos.nth(0).getByRole("button", { name: "delete" }).click();

  await expect(todos).toHaveCount(0);
  await expect(itemsLeft).toHaveText("0");
});

test("filters todos", async ({ page }) => {
  const todos = getTodos(page);
  const itemsLeft = getItemsLeft(page);
  const filters = getFilters(page);

  const texts = await createTodos(page, 6);
  await todos.nth(0).getByRole("checkbox").check();
  await todos.nth(2).getByRole("checkbox").check();
  await todos.nth(4).getByRole("checkbox").check();
  await filters.getByRole("button", { name: "active" }).click();

  await expect(todos).toHaveText([
    new RegExp(texts[1]),
    new RegExp(texts[3]),
    new RegExp(texts[5]),
  ]);
  await expect(itemsLeft).toHaveText("3");

  await filters.getByRole("button", { name: "completed" }).click();

  await expect(todos).toHaveText([
    new RegExp(texts[0]),
    new RegExp(texts[2]),
    new RegExp(texts[4]),
  ]);
  await expect(itemsLeft).toHaveText("3");

  await filters.getByRole("button", { name: "all" }).click();

  await expect(todos).toHaveText(texts.map((text) => new RegExp(text)));
  await expect(itemsLeft).toHaveText("3");
});

test("clears completed todos", async ({ page }) => {
  const todos = getTodos(page);
  const itemsLeft = getItemsLeft(page);

  const texts = await createTodos(page, 6);
  await todos.nth(0).getByRole("checkbox").check();
  await todos.nth(1).getByRole("checkbox").check();
  await todos.nth(2).getByRole("checkbox").check();

  await expect(itemsLeft).toHaveText("3");

  await page.getByRole("button", { name: "clear" }).click();

  await expect(todos).toHaveText([
    new RegExp(texts[3]),
    new RegExp(texts[4]),
    new RegExp(texts[5]),
  ]);
  await expect(itemsLeft).toHaveText("3");
});

test("toggles all todos", async ({ page }) => {
  const toggleAll = getToggleAllCheckbox(page);
  const todos = getTodos(page);
  const itemsLeft = getItemsLeft(page);

  await createTodos(page, 6);
  await todos.nth(1).getByRole("checkbox").check();
  await todos.nth(3).getByRole("checkbox").check();
  await todos.nth(5).getByRole("checkbox").check();

  await expect(itemsLeft).toHaveText("3");

  toggleAll.check();

  await expect(itemsLeft).toHaveText("0");
  for (const todo of await todos.all()) {
    await expect(todo.getByRole("checkbox")).toBeChecked();
  }

  toggleAll.uncheck();

  await expect(itemsLeft).toHaveText("6");
  for (const todo of await todos.all()) {
    await expect(todo.getByRole("checkbox")).not.toBeChecked();
  }
});

test.skip('"toggle all" checkbox updates according to state of todos', async ({
  page,
}) => {
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
