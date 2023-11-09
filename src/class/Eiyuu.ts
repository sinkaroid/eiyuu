import { load } from "cheerio";
import { HttpsProxyAgent } from "https-proxy-agent";
import { request, htmlDecode } from "../modifier";
import defaults from "../defaults";
import c from "../base";

export default class Eiyuu {
  private gelbooruURL: string;
  private danbooruURL: string;
  private hypnohubURL: string;
  private konachanURL: string;
  private lolibooruURL: string;
  private rule34URL: string;
  private realbooruURL: string;
  private safebooruURL: string;
  private tbibURL: string;
  private xbooruURL: string;
  private yandereURL: string;

  private searchElements: string;
  private useragent: string
  private searchSortings: string;
  private searchSortingsMoebooruBased: string;
  private followRedirects: boolean;
  private httpsProxyAgent?: HttpsProxyAgent<string>;

  /**
   * Eiyuu
   * @param useragent custom useragent
   * @param followRedirects enable HTTP redirect following
   * @param httpsProxyAgent custom https proxy agent
  */
  public constructor(useragent?: string, followRedirects?: boolean, httpsProxyAgent?: HttpsProxyAgent<string>) {
    this.useragent = useragent || defaults.useragent;
    this.followRedirects = followRedirects || defaults.followRedirects;
    this.httpsProxyAgent = httpsProxyAgent;
    this.searchElements = "table.highlightable";
    this.searchSortings = "*&sort=desc&order_by=index_count";
    this.searchSortingsMoebooruBased = "*&type=&order=count";

    this.gelbooruURL = c.GELBOORU;
    this.danbooruURL = c.DANBOORU;
    this.hypnohubURL = c.HYPNOHUB;
    this.konachanURL = c.KONACHAN;
    this.lolibooruURL = c.LOLIBOORU;
    this.rule34URL = c.RULE34;
    this.realbooruURL = c.REALBOORU;
    this.safebooruURL = c.SAFEBOORU;
    this.tbibURL = c.TBIB;
    this.xbooruURL = c.XBOORU;
    this.yandereURL = c.YANDERE;

  }


  /**
   * Search arbitrary query on danbooru.
   * @param query The query to search.
   * @example
   * ```js
   * search.danbooru("amber").then(res => { console.log(res); });
   * ```
   * https://danbooru.donmai.us/tags?commit=Search&search%5Bhide_empty%5D=yes&search%5Bname_or_alias_matches%5D=
   */
  public async danbooru(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.danbooruURL, `*${query}`, "*%2A&search%5Border%5D=count",
        this.useragent, this.followRedirects, this.httpsProxyAgent);
        
      const $ = load(res.body);

      const gets = $("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("/posts?tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;

    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }

  }

  /**
   * Search arbitrary query on gelbooru.
   * @param query The query to search.
   * @example
   * ```js
   * search.gelbooru("amber").then(res => { console.log(res); });
   * ```
   * https://gelbooru.com/index.php?page=tags&s=list&tags=
   */
  public async gelbooru(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.gelbooruURL, `*${query}`, this.searchSortings,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $(this.searchElements).find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("&tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }
  }

  /**
   * Search arbitrary query on hypnohub.
   * @param query The query to search.
   * @example
   * ```js
   * search.hypnohub("erza").then(res => { console.log(res); });
   * ```
   * https://hypnohub.net/index.php?page=tags&s=list&tags=
   */
  public async hypnohub(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.hypnohubURL, `*${query}`, this.searchSortings,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $(this.searchElements).find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("&tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }

  }

  /**
   * Search arbitrary query on konachan.
   * @param query The query to search.
   * @example
   * ```js
   * search.konachan("amber").then(res => { console.log(res); });
   * ```
   * https://konachan.com/tag?name=
   */
  public async konachan(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.konachanURL, `*${query}`, this.searchSortingsMoebooruBased,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $("tbody").find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("/post?tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }

  }

  /**
   * Search arbitrary query on lolibooru.
   * @param query The query to search.
   * @example
   * ```js
   * search.lolibooru("kanna").then(res => { console.log(res); });
   * ```
   * https://lolibooru.moe/tag?name=
   */
  public async lolibooru(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.lolibooruURL, `*${query}`, this.searchSortingsMoebooruBased,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $("tbody").find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("/post?tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }

  }

  /**
   * Search arbitrary query on rule34.
   * @param query The query to search.
   * @example
   * ```js
   * search.rule34("lisa").then(res => { console.log(res); });
   * ```
   * https://rule34.xxx/index.php?page=tags&s=list&tags=
   */
  public async rule34(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.rule34URL, `*${query}`, this.searchSortings,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $(this.searchElements).find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("&tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }
  }

  /**
   * Search arbitrary query on realbooru.
   * @param query The query to search.
   * @example
   * ```js
   * search.realbooru("anri").then(res => { console.log(res); });
   * ```
   * https://realbooru.com/index.php?page=tags&s=list&tags=
   */
  public async realbooru(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.realbooruURL, `*${query}`, this.searchSortings,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $(this.searchElements).find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("&tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }
  }

  /**
   * Search arbitrary query on safebooru.
   * @param query The query to search.
   * @example
   * ```js
   * search.safebooru("scathach").then(res => { console.log(res); });
   * ```
   * https://safebooru.org/index.php?page=tags&s=list&tags=
   */
  public async safebooru(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.safebooruURL, `*${query}`, this.searchSortings,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $(this.searchElements).find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("&tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }
  }

  /**
   * Search arbitrary query on tbib.
   * @param query The query to search.
   * @example
   * ```js
   * search.tbib("erza").then(res => { console.log(res); });
   * ```
   * https://tbib.org/index.php?page=tags&s=list&tags=
   */
  public async tbib(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.tbibURL, `*${query}`, this.searchSortings,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $(this.searchElements).find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("&tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }
  }

  /**
   * Search arbitrary query on xbooru.
   * @param query The query to search.
   * @example
   * ```js
   * search.xbooru("amber").then(res => { console.log(res); });
   * ```
   * https://xbooru.com/index.php?page=tags&s=list&tags=
   */
  public async xbooru(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.xbooruURL, `*${query}`, this.searchSortings,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $(this.searchElements).find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("&tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }
  }

  /**
   * Search arbitrary query on yandere.
   * @param query The query to search.
   * @example
   * ```js
   * search.yandere("eula").then(res => { console.log(res); });
   * ```
   * https://yande.re/tag?name=
   */
  public async yandere(query: string): Promise<string[]> {
    try {
      const res = await request(
        this.yandereURL, `*${query}`, this.searchSortingsMoebooruBased,
        this.useragent, this.followRedirects, this.httpsProxyAgent);

      const $ = load(res.body);

      const gets = $("tbody").find("a").map((i, el) => $(el).attr("href")).get();
      const tags = gets.map(el => el.split("/post?tags=")[1]).filter(el => el !== undefined);
      const replaced = tags.map(el => htmlDecode(el));
      return replaced;
    } catch (e) {
      const error = e as string;
      throw new Error(error);
    }

  }

}
