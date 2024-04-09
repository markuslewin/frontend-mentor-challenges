import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/interactive comments section/i);
});

test("has initial data", async ({ page }) => {
  await page.goto("/");

  await expect(
    page
      .getByRole("article")
      .filter({ has: page.getByRole("button", { name: "upvote" }) })
  ).not.toHaveCount(0);
});

test("add a comment", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("textbox", { name: "add a comment" })
    .fill("A new comment");
  await page.getByRole("button", { name: "send" }).click();

  await expect(page.getByRole("article").last()).toHaveText(/a new comment/i);
});

test("delete comment", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("textbox", { name: "add a comment" })
    .fill("Delete this comment");
  await page.getByRole("button", { name: "send" }).click();
  const comment = page
    .getByRole("article")
    .filter({ hasText: /delete this comment/i });

  const comments = await page
    .getByRole("article")
    .filter({ has: page.getByRole("button", { name: "delete" }) });
  const commentsCount = await comments.count();

  await comment.getByRole("button", { name: "delete" }).click();
  await page.getByRole("button", { name: "delete" }).click();

  await expect(comment).not.toBeAttached();
  await expect(comments).toHaveCount(commentsCount - 1);
});
