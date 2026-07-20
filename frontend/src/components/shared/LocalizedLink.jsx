import { Link } from "react-router-dom";
import { useLocalizedPath } from "./localizedRouting";

// Drop-in replacement for react-router-dom's <Link> that auto-prefixes `to`
// with the current locale.
export default function LocalizedLink({ to, ...rest }) {
  const href = useLocalizedPath(to);
  return <Link to={href} {...rest} />;
}
