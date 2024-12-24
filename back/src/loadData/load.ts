import fs from 'fs'
import { connectDB } from '../config/configDB';
import { appendToAll } from '../DL/controlers/CreateControlers';
connectDB()

const fileName = 'data1.json' // Big
// const fileName = 'data2.json'  // Little
fs.readFile(`${__dirname}/${fileName}`, 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let attacks = JSON.parse(data)
    for (let attack of attacks){
      // if (!Number(attack.imonth))
      //   console.log(attack)
      //   minmonth = Math.min(minmonth, Number(attack.imonth))
      // maxmonth = Math.max(maxmonth, Number(attack.imonth))
        await appendToAll(attack)
        // console.log(attack.gname)
    }
    // console.log(minmonth, maxmonth)
    // attacks = attacks.filter(() => {

    // })
    // console.log(attacks.length)
    // console.log(attacks[0])
    // console.log(data);
  } )


// let stream = JSONStream.parse('rows.*.doc')
// stream.on('data', function(data) {
//     console.log('received:', data);
//     // console.log('received:');
//   });
//   //emits anything from _before_ the first match
//   stream.on('header', function (data) {
//     // console.log('header:', data) // => {"total_rows":129,"offset":0}
//     console.log('header:') // => {"total_rows":129,"offset":0}
//   })
// let dataJson = fs.createReadStream(__dirname + "/" + fileName)
// dataJson.pipe(stream)