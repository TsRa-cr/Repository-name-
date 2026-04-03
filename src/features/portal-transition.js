export function createPortalTransition({ root, scrollController }) {
  let busy = false;

  function play({ href, origin }) {
    if (busy) {
      return;
    }

    busy = true;
    root.style.setProperty("--portal-x", `${origin.x}px`);
    root.style.setProperty("--portal-y", `${origin.y}px`);
    document.body.classList.add("is-portal-transition");

    window.setTimeout(() => {
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          scrollController.jumpTo(target.offsetTop);
        }
      } else {
        window.location.href = href;
      }
    }, 260);

    window.setTimeout(() => {
      document.body.classList.remove("is-portal-transition");
      busy = false;
    }, 760);
  }

  return { play };
}

export function bindPortalLinks({ root, transition }) {
  root.querySelectorAll("[data-portal-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const rect = link.getBoundingClientRect();
      transition.play({
        href: link.getAttribute("href"),
        origin: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      });
    });
  });
}
