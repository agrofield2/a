const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");

// CADASTRO (PRONTO)
router.post("/",(req,res,next)=>{
mysql.getConnection((error, conn)=>{
  if(error){return res.status(500).send({error : error, response: null})}
  conn.query(`select * from usuarios where usuario = ?`,[req.body.usuario],
  (error,resultado)=>{
    conn.release();
    if(error){return res.status(500).send({error: error})}
    if(resultado.length>0){
      res.status(409).send({mensagem:"Usuário ja cadastrado!"})
    }else{
      bcrypt.hash(req.body.senha, 10, (errBcrypt, hash)=>{
        if(errBcrypt){return res.status(500).send({error: errBcrypt})}
        conn.query(`INSERT INTO usuarios (usuario, senha) VALUES (?,?)`,
        [req.body.usuario,hash],
        (error, resultado)=>{
          conn.release();
          if(error){return res.status(500).send({error: error})}
          return res.status(201).send({mensagem:"Usuário criado com sucesso!", usuarioCriado: req.body.usuario})
        }
        )
      })
    }
  }
  )
  
})
})

router.post("/login",(req,res,next)=>{
  mysql.getConnection((error, conn) =>{
    if(error){return res.status(500).send({error: error})}
    conn.query(`SELECT * from usuarios where usuario = ?`, [req.body.usuario],(error,results,fields)=>{
      conn.release()
      if(error){return res.status(500).send({error: error})}
      if ( results.length < 1){
        return res.status(401).send({mensagem: "Falha na autenticação"})
      }
      bcrypt.compare(req.body.senha, results[0].senha, (err, result)=>{
        if(err){return res.status(401).send({mensagem: "Falha na autenticação"})}
        if(result){
          return res.status(200).send({mensagem: "Autenticado com sucesso!"})
        }
        return res.status(401).send({mensagem: "Falha na autenticação"})
      })
    })
  })
})
      

module.exports = router;