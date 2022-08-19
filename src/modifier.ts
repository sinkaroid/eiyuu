import p from "phin";

/**
 * Scrape request
 * @param {string} url - The url to scrape
 * @param {string} query - The query to scrape
 * @param {string} sort - The sorting method to use
 * @param {string} useragent - Custom user agent
 * @param {boolean} redirect - Apply redirects
 * @return {Promise<p.IResponse>} Phin response
 */
export async function request(url: string, query: string, sort: string,
  useragent: string, redirect: boolean): Promise<p.IResponse> {
  const res = await p({
    url: url + query + sort,
    "headers": {
      "User-Agent": useragent
    },
    followRedirects: redirect
  });
  return res;
}

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
