export function zeroPad(n, places) {
  return n.toString().padStart(3, '0');
};

export function slugify(str) {
  return str.toLowerCase().trim().replace(' ', '-');
}