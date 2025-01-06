export function getType(object: any) {
  return Object.prototype.toString.call(object);
}
