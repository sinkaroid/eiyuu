import { Eiyuu } from "../src/index";
const search = new Eiyuu();

switch (process.argv.pop()) {
case "--gelbooru":
  search.gelbooru("amber").then(res => {
    console.log(res);
  });
  break;
case "--danbooru":
  search.danbooru("jeanne").then(res => {
    console.log(res);
  });
  break;
case "--hypnohub":
  search.hypnohub("erza").then(res => {
    console.log(res);
  });
  break;
case "--konachan":
  search.konachan("eula").then(res => {
    console.log(res);
  });
  break;
case "--lolibooru":
  search.lolibooru("kanna").then(res => {
    console.log(res);
  });
  break;
case "--rule34":
  search.rule34("lisa").then(res => {
    console.log(res);
  });
  break;
case "--realbooru":
  search.realbooru("anri").then(res => {
    console.log(res);
  });
  break;
case "--safebooru":
  search.safebooru("scathach").then(res => {
    console.log(res);
  });
  break;
case "--tbib":
  search.tbib("jeanne").then(res => {
    console.log(res);
  });
  break;
case "--xbooru":
  search.xbooru("erza").then(res => {
    console.log(res);
  });
  break;
case "--yandere":
  search.yandere("amber").then(res => {
    console.log(res);
  });
  break;
default:
  throw new Error("Invalid argument");
}
