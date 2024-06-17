import { getMessages, createMessage } from "#app/utils/messages";

(function () {
  if (getMessages()) return;

  for (const text of ["One", "Two", "Three"]) {
    createMessage({ text });
  }
})();
