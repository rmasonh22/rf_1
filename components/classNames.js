// This is a utility function for joining TailwindCSS classNames together
// Makes conditional inclusion of classNames easier
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default classNames;
