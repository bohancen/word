const express = require('express')
// const md5 = require('md5')
const app = express()
const {createMap,findWords,findKeys} = require('./find')
const keymap = createMap()
const secretKey = 'z'


app.get('/words',function(req,res){
  let val = req.query.val
  if(val){
    res.send(secretKey + findWords(keymap,val).keys)
  }
})
app.get('/keys',function(req,res){
  let val = req.query.val
  if(val){
    val = val.replace(secretKey,'')
    res.send(findKeys(keymap,val).words)
  }
})

app.get('/base64',function(req,res){
  // console.log(req.query)
  let val = req.query.val
  if(val){
    const buf = Buffer.from(secertCode + val);
    res.send(buf.toString('base64'))
  }
})
app.get('/dbase64',function(req,res){
  // console.log(req.query)
  let val = req.query.val
  if(val){
    const buf = Buffer.from(val,'base64')
    res.send(buf.toString('utf8').replace(secertCode,''))
  }
})
app.get('/',function(req,res){
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div><input type="text" id="text" placeholder="加密" /></div>
      <div><input type="button" id="button" value="加密" /></div>
      <div><input type="button" id="dbutton" value="解密" /></div>
      <script>
        button.onclick=function(){
          let val = text.value
          fetch("/base64?val="+val).then(r=>r.text()).then(text=>{
            console.log(text)
          })
        }
        dbutton.onclick=function(){
          let val = text.value
          fetch("/dbase64?val="+val).then(r=>r.text()).then(text=>{
            console.log(text)
          })
        }
      </script>
    </body>
    </html>
  `)
})
app.listen(1024,function(){
  console.log('listen:1024')
})

// const buf = Buffer.from('陈');
// console.log(buf.toString('hex'))
// console.log(buf.toString('utf8'))