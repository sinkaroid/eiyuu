import { Eiyuu } from "../src/index";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
chai.should();
const search = new Eiyuu();

describe("Eiyuu data tests", () => {
  describe("Danbooru wildcard", () => {
    let data: Promise<string[]>;
    before(async () => {
      data = search.danbooru("amber");
    });

    //expected data as aray
    it("should return array", async () => {
      await data.should.eventually.be.an("array");
    });

    //data should not empty array
    it("should not be empty", async () => {
      await data.should.eventually.be.not.empty;
    });

    //data should contain "amber_(genshin_impact)"
    it("should contain 'amber_(genshin_impact)'", async () => {
      await data.should.eventually.contain("amber_(genshin_impact)");
    });
  });
});