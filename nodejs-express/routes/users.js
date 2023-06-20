var express = require('express');
var router = express.Router();
let db=require('../database');
/* GET home page. */
router.get('/form', function(req, res, next) {
  res.render('users');
});
router.post('/create',(req,res,next)=>{
  const userDetail=req.body;

  let sql='INSERT INTO users SET ?';
  db.query(sql,userDetail,(err,data)=>{
    if (err) throw err;
    console.log("User data inserted successfully");
  });
  res.redirect('/users/form');
  
});

router.get('/user-list',(req,res,next)=>{
 let sql='SELECT * FROM users';
 db.query(sql,function(err,data){
  if(err) throw err;
  res.render('user-list',{userData: data});//{title:'',userData: data} kao argumenti

 });

});

router.get('/delete/:id',(req,res,next)=>{
let id=req.params.id;
  let sql='DELETE FROM users WHERE id=?';
db.query(sql,[id],function(err,data){
  if(err) throw err;
console.log(data.affectedRows+" records deleted");
});
res.redirect('/users/user-list');
});

router.get('/edit/:id', (req,res,next)=>{
  let id=req.params.id;
  let sql='SELECT * FROM users WHERE id=?';
  //let sql='SELECT * FROM users WHERE id=${id}';
  db.query(sql,[id],(err,data)=>{
    if(err) throw err;
    res.render('users-form',{editData:data[0]});
  });
});

router.post('/edit/:id', (req,res,next)=>{
let updatedData=req.body;
let id=req.params.id;
let sql='UPDATE users SET ? WHERE id=?';
db.query(sql,[updatedData,id],(err,data)=>{
if(err) throw err;
console.log(data.affectedRows+" record updated");
});
res.redirect('/users/user-list');
});
//
module.exports = router;
