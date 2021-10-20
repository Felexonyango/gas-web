require('dotenv/config')
require('process')
const express =require('express')
var cors =require('cors')
const path =require('path')
const connectDB = require('./db');
const  userRouter=require('./routes/user')
const productRouter =require('./routes/product')
const orderRouter =require('./routes/order')
const checkout = require('./routes/mpesa')
const Stripe =require('./routes/payment')
const app = express();
//const ngrok = require('ngrok');

//(async function() {
  //const url = await ngrok.connect();
//})();

app.use(cors())
app.use(express.json());
//connect to db 
connectDB()

// Server static assets in prodcution
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
  }

//Routes 
app.use('/api/users', userRouter);
app.use('/api/products', productRouter)
app.use('/api/order',orderRouter)
app.use('/api/payment',Stripe)

 app.use('/api/payment',checkout)
  // Init MIddleware
app.use(express.json({ extended: false }));


  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));