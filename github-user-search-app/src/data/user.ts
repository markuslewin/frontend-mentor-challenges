import { Octokit, RequestError } from "octokit";
import userData from "../data/user.json";

const parse = (formData: FormData) => {
  const username = formData.get("username");
  if (typeof username !== "string") {
    return { error: "`username` is not a string" };
  }
  return { data: { username } };
};

const octokit = new Octokit();
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

export { parse, getUser };
