
var express= require('express');
var app=express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
 /** ---------ROTAS------*/
const router=express.Router();
app.use('/', router.get('/', function(req, res){
	res.status(200).send({ status: "OK"})
}));
module.exports=app;
