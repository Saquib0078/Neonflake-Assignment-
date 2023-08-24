const express = require('express')
const route = require("./route/route")
const mongoose = require('mongoose')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(cors({
    origin: ['*']
  }))
app.use(express.json());

mongoose.connect("mongodb+srv://saquib007:IUnXazhITeBF13a0@cluster0.eo7jwgy.mongodb.net/cloudinary",{
    useNewUrlParser:true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use("/", route)



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
