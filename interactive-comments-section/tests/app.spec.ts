import { test, expect, Page } from "@playwright/test";

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

  await comment.getByRole("button", { name: "edit" }).click();
  await comment
    .getByRole("textbox", { name: "edit message" })
    .fill("An updated comment");
  await comment.getByRole("button", { name: "update" }).click();

  await expect(comment).toHaveText(/an updated comment/i);
});

test("new comment has 0 points", async ({ page }) => {
  await page.goto("/");

  // Create
  await page
    .getByRole("textbox", { name: "add a comment" })
    .fill("Delete this comment");
  await page.getByRole("button", { name: "send" }).click();
  const comment = page
    .getByTestId("comment")
    .filter({ hasText: /delete this comment/i });
  // Upvote
  await comment.getByRole("button", { name: "upvote" }).click();
  // Delete
  await comment.getByRole("button", { name: "delete" }).click();
  await page.getByRole("button", { name: "delete" }).click();

  await page
    .getByRole("textbox", { name: "add a comment" })
    .fill("Another comment");
  await page.getByRole("button", { name: "send" }).click();
  const anotherComment = page
    .getByTestId("comment")
    .filter({ hasText: /another comment/i });

  await expect(anotherComment.getByTestId("score")).toHaveText(/0/i);
});

test("sort comments by score", async ({ page }) => {
  await createComments(page, ["Number three", "Number two", "Number one"]);

  const three = page
    .getByTestId("comment")
    .filter({ hasText: /number three/i });
  const one = page.getByTestId("comment").filter({ hasText: /number one/i });

  const first = page.getByTestId("comment").nth(-3);
  const second = page.getByTestId("comment").nth(-2);
  const third = page.getByTestId("comment").nth(-1);

  await expect(first).toHaveText(/number three/i);
  await expect(second).toHaveText(/number two/i);
  await expect(third).toHaveText(/number one/i);

  await three.getByRole("button", { name: "downvote" }).click();
  await one.getByRole("button", { name: "upvote" }).click();

  await expect(first).toHaveText(/number one/i);
  await expect(second).toHaveText(/number two/i);
  await expect(third).toHaveText(/number three/i);
});

test("reply to reply", async ({ page }) => {
  await page.goto("/");

  const comment = page.getByTestId("comment").nth(1);
  const reply = comment
    .getByRole("article")
    .filter({ hasText: "focusing on the fundamentals" });

  await reply.getByRole("button", { name: "reply" }).click();

  const textbox = reply.getByRole("textbox", { name: "reply" });

  // `.fill` overwrites default value
  await textbox.pressSequentially("This is a reply");
  await reply.getByRole("button", { name: "reply" }).nth(1).click();

  const newReply = comment.getByRole("article").last();

  await expect(textbox).not.toBeAttached();
  await expect(newReply).toHaveText(/this is a reply/i);
  await expect(newReply.getByTestId("score")).toHaveText(/0/i);
});

test("edit reply", async ({ page }) => {
  await page.goto("/");

  const comment = page.getByTestId("comment").nth(1);
  const reply = comment
    .getByRole("article")
    .filter({ hasText: "focusing on the fundamentals" });

  await reply.getByRole("button", { name: "reply" }).click();

  const textbox = reply.getByRole("textbox", { name: "reply" });

  // `.fill` overwrites default value
  await textbox.pressSequentially("This is a bad reply");
  await reply.getByRole("button", { name: "reply" }).nth(1).click();

  const newReply = comment.getByRole("article").last();

  await newReply.getByRole("button", { name: "edit" }).click();

  const editTextbox = newReply.getByRole("textbox", { name: "edit" });

  await editTextbox.fill("This is a great reply");
  await newReply.getByRole("button", { name: "update" }).click();

  await expect(editTextbox).not.toBeAttached();
  await expect(newReply).toHaveText(/this is a great reply/i);
});

test("delete reply", async ({ page }) => {
  await page.goto("/");

  const comment = page.getByTestId("comment").nth(1);
  const reply = comment
    .getByRole("article")
    .filter({ hasText: "focusing on the fundamentals" });

  await reply.getByRole("button", { name: "reply" }).click();

  const textbox = reply.getByRole("textbox", { name: "reply" });

  // `.fill` overwrites default value
  await textbox.pressSequentially("This is a reply");
  await reply.getByRole("button", { name: "reply" }).nth(1).click();

  const newReply = comment
    .getByRole("article")
    .filter({ hasText: /this is a reply/i });

  await newReply.getByRole("button", { name: "delete" }).click();
  await page.getByRole("button", { name: "delete" }).click();

  await expect(newReply).not.toBeAttached();
});

async function createComments(page: Page, contents: string[]) {
  await page.goto("/");

  for (const content of contents) {
    await page.getByRole("textbox", { name: "add a comment" }).fill(content);
    await page.getByRole("button", { name: "send" }).click();
  }
}
