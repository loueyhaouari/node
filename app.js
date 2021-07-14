const express=require('express')
const app=express();
const bodyParser=require('body-parser')
require('dotenv/config')
const morgan=require('morgan');
const mongoose=require('mongoose')
const productsRouter=require('./routers/products')
const categoriesRoutes = require('./routers/categories');
const usersRoutes = require('./routers/users');

const cors=require('cors')
const api=process.env.API_URL;
const Product=require('./models/product')
const authJwt =require('./helpers/jwt')
const errorHandler=require('./helpers/error-handler')
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt());
app.use(errorHandler);
app.use(`${api}/products`,productsRouter)
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);

app.use(cors())
app.options('*',cors())


mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'eshop-database'
})
    .then(()=>{
        console.log('Database connection is ready...')
    }).catch((err)=>{
        console.log(err);
})
app.listen(3000, ()=>{
    console.log(api);
    console.log('server is running http://localhost:3000')
})
