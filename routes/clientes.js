const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// LISTAR TODOS CLIENTES CADASTRADOS (PRONTA)
router.get("/", (req,res,next)=>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from clientes ",
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }

        res.status(201).send({
          mensagem:"Lista de clientes cadastrados.",
          response: resultado
        })
      }
    )
  })
})

// CADASTRAR NOVO CLIENTE (PRONTO)
router.post("/", (req, res, next) =>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      "INSERT INTO clientes (nome, cpf, municipio, uf, interesse, valor,corretor) VALUES (?,?,?,?,?,?,?); ",
      [req.body.nome, req.body.cpf, req.body.municipio, req.body.uf, req.body.interesse, req.body.valor,req.body.corretor],
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }

        res.status(201).send({
          mensagem:"Cliente cadastrado com sucesso!",
          resultado
        })
      }
    )
  })

})

// ATUALIZAR VALOR DE INVESTIMENTO DO CLIENTE (PRONTO)
router.patch("/:id", (req, res, next) =>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      `UPDATE clientes
        SET valor= ?
        WHERE id=?`,
      [req.body.valor,req.params.id],
      (error, resultado, field) =>{
        conn.release();

        if(error){  
          return res.status(500).send({error : error, response: null})
        }

        res.status(202).send({
          mensagem:"Valor alterado com sucesso!",
        })
      }
    )
  })
})

// EXCLUIR CLIENTE (PRONTO)
router.delete("/delete/:id", (req, res, next) =>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      `DELETE from clientes
        WHERE id=?`,
      [req.params.id],
      (error, resultado, field) =>{
        conn.release();

        if(error){  
          return res.status(500).send({error : error, response: null})
        }

        res.status(202).send({
          mensagem:"Cliente excluido com sucesso!",
        })
      }
    )
  })
})



module.exports= router;