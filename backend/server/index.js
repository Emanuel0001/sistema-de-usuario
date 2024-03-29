const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv/config.js')
const app = express();
const port = process.env.PORT || 3001;
let user = [];

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
const { Client } = require('pg');
const { rows } = require('pg/lib/defaults');
const USER_BD = process.env.USER_BD
const HOST = process.env.HOST
const DATABASE = process.env.DATABASE
const PASSWORD_BD = process.env.PASSWORD_BD
const PORT_CLIENT = process.env.PORT_CLIENT

const client = new Client({
  user: USER_BD,
  host: HOST,
  database: DATABASE,
  password: PASSWORD_BD,
  port: PORT_CLIENT,
})

client.connect()
const SECRET = process.env.SECRET
const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).end();
    req.userId = decoded.userId;
    next();
  })
}

app.get('/client', verifyJWT, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
})

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  client.query(`select * from usuario WHERE email = $1 AND password = $2`, [email, password])
    .then(results => {
      const resultado = results
      if (resultado.rowCount === 1) {
        const token = jwt.sign({ userId: 1, email: email }, SECRET, { expiresIn: '1h' })
        return res.json({ "message": "Sucesso", auth: true, token, email });
      } else {
        return res.json({ "error": "Credencias Inválidas" });
      }
    })
    .catch(e => console.log(" erro!!",))
});

app.post('/cadastrar', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmacao = req.body.passwordConfirmacao;
  const name = req.body.name;
  client.query(`select * from usuario WHERE email = $1`, [email])
    .then(results => {
      const resultadoQuery = results
      if (resultadoQuery.rowCount === 1) {
        res.json({ "error": "E-mail já possui cadastro" })
      } else {
        if (password === passwordConfirmacao) {
          client.query(`INSERT INTO usuario (email,password,name,img) VALUES ($1, $2, $3, $4)`, [email, password, name, ""])
            .then(results => {
              const resultado = results
              if (resultado.rowCount === 1) {
                return res.json({ "cadastrado": "Usuario cadastrado com sucesso" });
              } else {
                return res.json({ "error": "Erro ao cadastrar" });
              }
            })
        } else {
          return res.json({ "error": "Erro: Senhas Diferentes" });
        }
      }
    });
});

app.post('/salvarFoto', (req, res) => {
  const email = req.body.email;
  const isBase64Code = req.body.code64;
  client.query('UPDATE usuario SET img = $1 WHERE email = $2', [isBase64Code, email])
    .then(results => {
      let resultado = results;
      if (resultado.rowCount === 1) {
        return res.json({ "message": "Salvo com sucesso!" });
      } else {
        return res.json({ 'error': "Erro ao salvar imagem" })
      }
    })
    .catch(e => console.log(error))
});

app.post('/imagem', (req, res) => {
  const email = req.body.email;
  client.query(`select img from usuario WHERE email = $1`, [email])
    .then(results => {
      let resultado = results
      const id_cod_img = results.rows[0];
      if (resultado.rowCount === 1) {
        return res.json({ "message": id_cod_img });
      }
      else {
      }
    })
});

app.post('/buscarRegistros', (req, res) => {
  client.query(`SELECT email,name , img FROM usuario`)
    .then(results => {
      var Resultado2 = results
      var usuarios = [Resultado2.rows];
      return res.json({ "usuarios": Resultado2 });
    })
});

app.post('/apagaImagem', (req, res) => {
  const email = req.body.email;
  const isBase64Code = '';
  client.query('UPDATE usuario SET img = $1 WHERE email = $2', [isBase64Code, email])
    .then(results => {
      let resultado = results
      if (resultado.rowCount === 1) {
        return res.json({ "message": 'Apagada com sucesso!' });
      } else {
        return res.json({ "error": 'Error ao apagar!' });
      }
    })
});

app.post('/alterarSenha', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const newPassword = req.body.passwordConfirmacao;
  console.log(email,password,newPassword)
  client.query('UPDATE usuario SET password = $1 WHERE email = $2', [newPassword, email])
    .then(results => {
      let resultado = results
    console.log(resultado)
      if (resultado.rowCount === 1) {
        return res.json({ "message": 'alterado com sucesso!' });
      } else {
        return res.json({ "error": 'Error ao alterar!' });
      }
    })
});
app.listen(port, () => console.log(`Rodando na porta: ${port}!`))



