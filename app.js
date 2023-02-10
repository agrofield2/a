const express = require("express");
const app = express();
const rotaAreas = require("./routes/areas")
const rotaClientes = require("./routes/clientes")
const rotaUsuarios = require("./routes/usuarios")
const morgan = require("morgan")
const bodyParser = require("body-parser")

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})) //apenas dados simples
app.use(morgan("dev")); // retorna o status da req no console;

app.use((req, res, next) =>{
  res.header("Acces-Control-Allow-Origin", "*")
  res.header("Acces-Control-Allow-Header",
             "Origin, X-Requested-With, Content-Type, Accept, Authorization",
             
             )
  if(req.method === "OPTIONS"){
    res.header("Acces-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send()
  }

  next();
})

app.use("/areas", rotaAreas);
app.use("/clientes", rotaClientes);
app.use("/usuarios", rotaUsuarios);

app.use((req, res, next) =>{
  const erro = new Error("Rota não encontrada")
  erro.status= 404;
  next(erro)
})

app.use((error, req, res, next) =>{
  res.status(error.status || 500);
  return res.send({
    mensagem: error.message
  })
})

module.exports= app;
