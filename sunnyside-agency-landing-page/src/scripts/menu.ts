const $ = {
  trigger: document.querySelector("[data-menu-trigger]") as HTMLButtonElement,
  menu: document.querySelector("[data-menu]") as HTMLElement,
};

const toggleMenu = ($trigger: HTMLButtonElement, state?: boolean) => {
  if (state === undefined) {
    state = $trigger.getAttribute("aria-expanded") !== "true";
  }
  $trigger.setAttribute("aria-expanded", `${state}`);
};

document.addEventListener("click", function (e) {
  if (e.target instanceof Node || e.target === null) {
    if (!$.trigger.contains(e.target) && !$.menu.contains(e.target)) {
      toggleMenu($.trigger, false);
    }
  }
});

$.trigger.addEventListener("click", function () {
  toggleMenu(this);
});

$.trigger.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    toggleMenu(this, false);
  }
});

$.menu.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    toggleMenu($.trigger, false);
  }
});
