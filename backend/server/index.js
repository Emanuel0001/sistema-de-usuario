const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;


let user = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;

    if (email === 'hitallosoares1@gmail.com' && password === "123456") {

        return res.json({"message": "Sucesso"});


    } else {
        return res.json({"error":"Credencias Inválidas"});
    }
});


app.listen(port, () => console.log(`Rodando na porta: ${port}!`))