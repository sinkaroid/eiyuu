export function htmlDecode(abc: string) {
  return abc
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%2F/g, "/")
    .replace(/%3A/g, ":")
    .replace(/%27/g, "'");
}

export function getHostname(url: string) {
  return new URL(url).hostname;
}