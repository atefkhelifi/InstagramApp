 const express = require('express')
 const app = express()
 const mongose =require("mongoose")
 const PORT = process.env.PORT|| 5000
 const {MONGOURI}=require('./config/keys')


 


 mongose.connect(MONGOURI,{
     useNewUrlParser:true,
     useUnifiedTopology:true
 })
 mongose.connection.on('connected',()=>{
   console.log("connection to mongo")  
 })
 mongose.connection.on('error',(err)=>{
    console.log("err connection to mongo",err)  
  })
  require('./models/user')
  require('./models/post')

  app.use(express.json())
 app.use(require('./routes/auth'))
 app.use(require('./routes/post'))
 app.use(require('./routes/user'))
/* const customMiddleware =(req,rs,next)=>{
    console.log("middleware execute !")
    next()
}
app.use(customMiddleware)

 app.get('/home',(req,res)=>{
     res.send("hello world")
 })
 app.get('/about',(req,res)=>{
    res.send("about page")
})
 */
if(process.env.NODE_ENV=="production"){
    app.use(express.static('instagram_front/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'instagram_front','build','index.html'))
    })
}

 app.listen(PORT,()=>{
     console.log("server is running on",PORT)
 })