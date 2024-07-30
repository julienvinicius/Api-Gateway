const express = require('express');
const app = express();
const port = 3002;

app.get('/',(req,res) => {
    res.send( 'hello from feed service')
})

app.get('/friends',(req,res) => {
    res.send( 'your friends')
})

app.listen(port,() => {
    console.log(`feed service listen at http:/127.0.0.1:${port}`)
});