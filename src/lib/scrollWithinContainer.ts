export function scrollWithinContainer(
  container: HTMLElement | null,
  child: HTMLElement | null,
  options?: { axis?: "x" | "y"; behavior?: ScrollBehavior },
) {
  if (!container || !child) return;

  const axis = options?.axis ?? "y";
  const behavior = options?.behavior ?? "smooth";
  const containerRect = container.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  if (axis === "y") {
    if (childRect.top < containerRect.top) {
      container.scrollTo({
        top: container.scrollTop + (childRect.top - containerRect.top),
        behavior,
      });
    } else if (childRect.bottom > containerRect.bottom) {
      container.scrollTo({
        top: container.scrollTop + (childRect.bottom - containerRect.bottom),
        behavior,
      });
    }
    return;
  }

  if (childRect.left < containerRect.left) {
    container.scrollTo({
      left: container.scrollLeft + (childRect.left - containerRect.left),
      behavior,
    });
  } else if (childRect.right > containerRect.right) {
    container.scrollTo({
      left: container.scrollLeft + (childRect.right - containerRect.right),
      behavior,
    });
  }
}
