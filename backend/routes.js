const express = require('express');
const router = express.Router();
const functions = require('./functions');

router.get('/allgames', async (req,res) =>{
    data = await functions.getGames();
    console.log(data);
    res.send(data);
});



module.exports = router;