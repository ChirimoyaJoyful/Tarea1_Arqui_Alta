const express = require('express')
const pool = require('./db')
//const routes = require('./routes')
const cors = require('cors')

const app = express();
const port = process.env.port;

//app.use("/", routes);
app.use(express.json());

app.use(cors());

//ROUTES
app.get('', async (req,res) =>{
    qry = 'select Gname, Release_Date from Games'
    data = await pool.query(qry);
    console.log(data);
    res.send(data);
});

app.get('/allgames', async (req,res) =>{
    qry = 'SELECT * from Games'
    data = await pool.query(qry);
    res.send(data.rows);
});

app.post('/addgame', async (req,res) => {
    console.log(req.body);
    var {name, date} = req.body;
    qry = 'INSERT INTO Games (Gname, Release_Date) VALUES ($1, $2) Returning *';
    const result = await pool.query(qry,[name,date]);
    console.log(result);
    res.send(result.rows);   

});

app.get('/game/:id', async (req,res) => {
    id = req.params['id'];
    console.log(id);
    qry = 'select * from Games where Id = $1';
    data = await pool.query(qry, [id]);
    res.send(data.rows);
});

app.put('/review/', async (req,res) =>{
    var { id, text } = req.body;
    qry = 'UPDATE Games SET comment = $1 where id = $2';
    console.log(id)
    console.log(text)
    await pool.query(qry, [text, id]);
    console.log(req.body);
    res.send('aqui se hacen reseñas');
});

app.delete('/delete/:id', async (req,res) =>{
    console.log(req.params)
    var id = req.params['id'];
    console.log(id)
    qry = 'DELETE from games where id = $1';
    await pool.query(qry, [id]);
});

app.listen(port, () =>{
    console.log('Server running on port', port)
});