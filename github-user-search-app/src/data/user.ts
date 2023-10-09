import { Octokit, RequestError } from "octokit";
import userData from "../data/user.json";

const parse = (formData: FormData) => {
  const username = formData.get("username");
  if (typeof username !== "string") {
    return { error: "`username` is not a string" };
  }
  return { data: { username } };
};

let abortController: AbortController | undefined;
const getUser = async (username: string) => {
  // todo: Remove
  if (import.meta.env.DEV) {
    // return { error: { message: "No results" } };
    const user = {
      ...userData,
      bio: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.",
    };
    return { data: user };
  }

  try {
    abortController?.abort();
    abortController = new AbortController();
    const octokit = new Octokit({
      request: { signal: abortController.signal },
    });
    const response = await octokit.rest.users.getByUsername({
      username,
    });
    return { data: response.data };
  } catch (error) {
    // todo: Handle error
    // if (error instanceof RequestError) {
    //   return { error };
    // }
    // throw error;
    return { error: { message: "No results" } };
  }
};

type User = Awaited<
  ReturnType<Octokit["rest"]["users"]["getByUsername"]>
>["data"];

export { parse, getUser };
export type { User };
