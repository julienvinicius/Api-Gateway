const express = require('express');
const app = express();
const port = 3001;

app.get('/',(req,res) => {
    res.send( 'hello from chat service')
})

app.listen(port,() => {
    console.log(`chat service listen at http:/127.0.0.1:${port}`)
});