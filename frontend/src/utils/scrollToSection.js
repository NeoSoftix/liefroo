export function scrollToElementId(id) {
  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({ behavior: "smooth" });

  return true;
}

// Scrolls to a section by id without ever putting a hash in the URL.
// If the section isn't on the current page, it navigates to the current
// locale's home ("/de" or "/en") and asks Products.jsx (via router state) to
// scroll once it has mounted.
export function goToSection(navigate, pathname, id, lng) {
  const homePath = `/${lng}`;
  if (pathname === homePath && scrollToElementId(id)) return;
  navigate(homePath, { state: { scrollTo: id } });
}
