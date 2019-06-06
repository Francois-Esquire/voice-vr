export function printTHREEScene(obj) {
  // eslint-disable-next-line no-console
  console.group(`<${obj.type}> ${obj.name}`);
  obj.children.forEach(printTHREEScene);
  // eslint-disable-next-line no-console
  console.groupEnd();
}
export function printAFRAMEScene(obj) {
  // eslint-disable-next-line no-console
  console.log(obj.children, obj.el && obj.el.id);
  console.group(`<${obj.type}> ${obj.uuid}`);
  obj.children.forEach(printAFRAMEScene);
  // eslint-disable-next-line no-console
  console.groupEnd();
}
