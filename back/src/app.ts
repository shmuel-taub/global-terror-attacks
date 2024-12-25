import { connectDB } from "./config/configDB";
import express from 'express'
import cors from 'cors'
import { analysisRouter } from "./routers/analysisRoute";
import { relationshipsRouter } from "./routers/relationshipsRouter";
import { getRouter } from "./routers/getRouter";
import { errorHandler } from "./midllewares/errorHandler";

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/analysis', analysisRouter)
app.use('/api/relationships', relationshipsRouter)
app.use('/api/getters', getRouter)
app.use(errorHandler)





app.listen(process.env.PORT || 3000, () => {
     console.log(`Listening on port ${process.env.PORT || 3000}`)}
)


// import { getAttacksByYear } from "./DL/controllers";

// (async () => {
//     const res = await getAttacksByYear(2018)
//     console.log(res[0])
//     console.log(res[20])
//     console.log(res.length)
// })();