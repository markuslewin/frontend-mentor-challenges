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

  const comments = page
    .getByRole("article")
    .filter({ has: page.getByRole("button", { name: "delete" }) });
  const commentsCount = await comments.count();

  await comment.getByRole("button", { name: "delete" }).click();
  await page.getByRole("button", { name: "delete" }).click();

  await expect(comment).not.toBeAttached();
  await expect(comments).toHaveCount(commentsCount - 1);
});

test("reply to comment", async ({ page }) => {
  await page.goto("/");

  const comment = page.getByRole("article").first();

  await comment.getByRole("button", { name: "reply" }).first().click();

  const replyTextbox = comment.getByRole("textbox", { name: "reply" });
  await expect(replyTextbox).toHaveValue("@amyrobson ");

  // `.fill` gets overwritten by React state
  await replyTextbox.pressSequentially("This is a reply");

  await comment.getByRole("button", { name: "reply" }).nth(1).click();

  await expect(replyTextbox).not.toBeAttached();
  await expect(comment.getByRole("article").first()).toHaveText(
    /this is a reply/i
  );

  await comment.getByRole("button", { name: "reply" }).first().click();

  await expect(replyTextbox).toHaveValue("@amyrobson ");
});

test("vote on comment", async ({ page }) => {
  await page.goto("/");

  const comment = page.getByTestId("comment").first();
  const score = comment.getByTestId("score");

  await expect(score).toHaveText(/12/i);

  const upvote = comment.getByRole("button", { name: "upvote" });
  const downvote = comment.getByRole("button", { name: "downvote" });
  await upvote.click();

  await expect(score).toHaveText(/13/i);
  await upvote.click();
  await expect(score).toHaveText(/12/i);
  await upvote.click();
  await expect(score).toHaveText(/13/i);
  await downvote.click();
  // -1 (unpress upvote) + -1 (downvote) = -2
  await expect(score).toHaveText(/11/i);
  await downvote.click();
  await expect(score).toHaveText(/12/i);
});

test("edit comment", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("textbox", { name: "add a comment" })
    .fill("A new comment");
  await page.getByRole("button", { name: "send" }).click();

  const comment = page.getByTestId("comment").last();
  await expect(comment).toHaveText(/a new comment/i);

  comment.getByRole("button", { name: "edit" }).click();
  comment
    .getByRole("textbox", { name: "edit comment" })
    .fill("An updated comment");
  comment.getByRole("button", { name: "update" }).click();

  await expect(comment).toHaveText(/an updated comment/i);
});
