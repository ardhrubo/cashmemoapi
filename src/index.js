import {app} from './app.js';
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})




app.listen(process.env.PORT || 8000, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })

