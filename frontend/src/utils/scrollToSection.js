export function scrollToElementId(id) {
  const el = document.getElementById(id);
  if (!el) return false;

  // scroll-snap containers block scrollIntoView from passing through
  // intermediate sections, so disable snapping while we scroll
  const snapContainer = el.closest(".snap-y");
  const previousSnapType = snapContainer?.style.scrollSnapType;
  if (snapContainer) {
    snapContainer.style.scrollSnapType = "none";
  }

  el.scrollIntoView({ behavior: "smooth" });

  if (snapContainer) {
    setTimeout(() => {
      snapContainer.style.scrollSnapType = previousSnapType || "";
    }, 700);
  }

  return true;
}

// Scrolls to a section by id without ever putting a hash in the URL.
// If the section isn't on the current page, it navigates home first and
// asks Products.jsx (via router state) to scroll once it has mounted.
export function goToSection(navigate, pathname, id) {
  if (pathname === "/" && scrollToElementId(id)) return;
  navigate("/", { state: { scrollTo: id } });
}
