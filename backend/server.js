const express=require('express')
const path=require('path')
const dotenv=require('dotenv').config()
const {errorHandler}=require('./middleware/errorMiddleware')
const cors=require('cors')
const connectDB =require('./config/db')
const port=process.env.PORT || 5001

connectDB()

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/personal-pref',require('./routes/personalPrefRoutes'))
app.use("/api/professional-info", require("./routes/professionalInfoRoutes"));
app.use("/admin",require('./routes/adminRoutes'))

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../client/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../','client','build','index.html'))
    })
}
else{
    app.get('/',(req,res)=>{
        res.send('Set To Production Mode')
    })
}

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})