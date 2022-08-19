import { Eiyuu, parseString } from "../src/index";
const search = new Eiyuu();

search.danbooru("jeanne").then(res => {
  console.log("No results found. Did you mean:", parseString(res));
});