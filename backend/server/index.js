const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;


let user = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Client } = require('pg');
const { rows } = require('pg/lib/defaults');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'banco_usuario',
    password: '18066081',
    port: 5432,
})
client.connect()

app.post('/', (req, res) => {
   
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;


   
client.query(`select * from usuario WHERE email = $1 AND password = $2`,[email,password])
.then(results => {
    const resultado = results
   
    console.log(resultado.rowCount )
    
    
    if (resultado.rowCount === 1) {

        return res.json({"message": "Sucesso"});

    } else {
        return res.json({"error":"Credencias Inválidas"});
    }
})
.catch(e => console.log(" erro!!",)) 
  
    
});


app.post('/cadastrar', (req, res) => {
   
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmacao = req.body.passwordConfirmacao;
    const name = req.body.name; 
if(password === passwordConfirmacao){   
client.query(`INSERT INTO usuario (email,password,name) VALUES ($1, $2, $3)`,[email,password,name])
.then(results => {
    const resultado = results
   
    console.log(resultado.rowCount )
    
    if (resultado.rowCount === 1) {

        return res.json({"message": "Usuario cadastrado com sucesso"});

    } else {
        return res.json({"error":"Erro ao cadastrar"});
    }
})
.catch(e => res.json({"error":"E-mail já possui cadastro"})) 
  
} else {
    return res.json({"error":"Erro: Senhas Diferentes"});

}
});

app.listen(port, () => console.log(`Rodando na porta: ${port}!`))



