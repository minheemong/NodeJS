const express = require('express');
// const app = express();
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("<h1>Hello, Express router - users</h1>");
});

module.exports = router;
