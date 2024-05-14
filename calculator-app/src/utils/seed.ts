import { createMessage, getMessages } from "./messages";

(function () {
  if (getMessages()) return;

  for (const text of ["One", "Two", "Three"]) {
    createMessage({ text });
  }
})();
