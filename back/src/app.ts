import { connectDB } from "./config/configDB";

connectDB()

import { getAttacksByYear } from "./DL/controllers";

(async () => {
    const res = await getAttacksByYear(2018)
    console.log(res[0])
    console.log(res[20])
    console.log(res.length)
})();