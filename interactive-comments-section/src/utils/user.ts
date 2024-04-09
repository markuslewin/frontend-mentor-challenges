import { currentUser } from "../data/data.json";

// todo: Signed in user
export function useUser() {
  return { user: currentUser };
}
