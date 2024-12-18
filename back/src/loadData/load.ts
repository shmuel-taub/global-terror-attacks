import fs from 'fs'
import { connectDB } from '../config/configDB';
import { appendToAttackSchema } from '../DL/controllers';
connectDB()

const fileName = 'data.json'
fs.readFile(`${__dirname}/${fileName}`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let attacks = JSON.parse(data)
    for (let attack of attacks){
        appendToAttackSchema(attack)
        // console.log(attack.gname)
    }
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