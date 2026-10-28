// Attaches translated copy to a static list of `{ key, Icon, ... }` items.
// `fields` maps each output prop to a sub-key under `<prefix>.<item.key>`;
// an empty sub-key reads `<prefix>.<item.key>` itself:
//   translateItems(t, "qrOrdering.featureGrid.items", items)
//     -> [{ key, Icon, title: t("….<key>.title"), desc: t("….<key>.desc") }]
//   translateItems(t, "qrOrdering.hero.features", items, { label: "" })
//     -> [{ key, Icon, label: t("….<key>") }]
export function translateItems(t, prefix, items, fields = { title: "title", desc: "desc" }) {
  return items.map((item) => {
    const translated = { ...item };
    for (const [prop, sub] of Object.entries(fields)) {
      translated[prop] = t(sub ? `${prefix}.${item.key}.${sub}` : `${prefix}.${item.key}`);
    }
    return translated;
  });
}
