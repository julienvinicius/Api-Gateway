const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();
const port = 3000;

//http:/127.0.0.1/chat-service => http:/127.0.0.1:3001
app.use('/chat-service',createProxyMiddleware({
    target:'http:/127.0.0.1:3001',
    pathRewrite:{
        '^/chat-service':'',
    }
}))

//http:/127.0.0.1:3000/feed-service
app.use('/feed-service',createProxyMiddleware({
    target:'http:/127.0.0.1:3002',
    pathRewrite:{
        '^/feed-service':'',
    }
}))
app.listen(port,() => {
    console.log(`API Gateway service listen at http:/127.0.0.1:${port}`)
});