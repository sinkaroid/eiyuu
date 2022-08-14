import c from "../src/base";
import p from "phin";
import { getHostname } from "../src/modifier";

const values = Object.values(c);
for (let i = 0; i < values.length; i++) {
  p({ url: `${values[i]}yuri` }).then(res => {
    if (res.statusCode !== 200) {
      console.log(`${getHostname(values[i])} is not available, status code: ${res.statusCode}`);
    } else {
      console.log(`${getHostname(values[i])} is available, can be scraped`);
    }
  });

}
