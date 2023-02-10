const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool

// LISTAR TODAS AREAS CADASTRADAS (PRONTA) ID
router.get("/", (req,res,next)=>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from areas ",
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }


        res.status(201).send({
          mensagem:"Lista de areas cadastradas.",
          response: resultado
        })
      }
    )
  })
})

// LISTAR TODAS AREAS CADASTRADAS (PRONTA) TAM ASC
router.get("/tam/asc", (req,res,next)=>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from areas order by tamanho ASC ",
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }


        res.status(201).send({
          mensagem:"Lista de areas cadastradas.",
          response: resultado
        })
      }
    )
  })
})
// get BETWEEN
router.get("/invest/:a1/:a2", (req,res,next)=>{
  const a2= req.params.a2
  const a1= req.params.a1
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from areas where val_ha*tamanho between ? and ? ",[
        a1,a2
      ],
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }


        res.status(201).send({
          mensagem:"Lista de areas cadastradas.",
          response: resultado
        })
      }
    )
  })
})

// LISTAR TODAS AREAS CADASTRADAS (PRONTA) TAM DESC
router.get("/tam/desc", (req,res,next)=>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from areas order by tamanho DESC ",
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }


        res.status(201).send({
          mensagem:"Lista de areas cadastradas.",
          response: resultado
        })
      }
    )
  })
})

// LISTAR TODAS AREAS CADASTRADAS (PRONTA) VAL-HA DESC
router.get("/val/desc", (req,res,next)=>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from areas order by val_ha DESC ",
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }


        res.status(201).send({
          mensagem:"Lista de areas cadastradas.",
          response: resultado
        })
      }
    )
  })
})

// LISTAR TODAS AREAS CADASTRADAS (PRONTA) VAL-HA ASC
router.get("/val/asc", (req,res,next)=>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from areas order by val_ha ASC ",
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }


        res.status(201).send({
          mensagem:"Lista de areas cadastradas.",
          response: resultado
        })
      }
    )
  })
})
// ADICIONAR NOVA AREA (PRONTA)
router.post("/", (req, res, next) =>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      "INSERT INTO areas (tamanho,municipio,uf,dist_asf,val_ha,prazo,aptidao,agenciador,proprietario,obs,solo,infra) VALUES (?,?,?,?,?,?,?,?,?,?,?,?); ",
      [req.body.tamanho,
        req.body.municipio,
        req.body.uf,
        req.body.dist_asf,
        req.body.val_ha,
        req.body.prazo,
        req.body.aptidao,
        req.body.agenciador,
        req.body.proprietario,
        req.body.obs,
        req.body.solo,
        req.body.infra],
      (error, resultado, field) =>{
        conn.release();
        if(error){
          return res.status(500).send({error : error, response: null})
        }

        res.status(201).send({
          mensagem:"Área adicionada com sucesso!",
          id_area: resultado.insertId
        })
      }
    )
  })

})
// GET POR AGENCIADOR (PRONTA)
router.get("/ag/:agenciador", (req,res,next)=>{
  const agenciador= req.params.agenciador
  
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from areas where agenciador = ? ",[agenciador.toString().trim()],
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }

        res.status(201).send({
          mensagem:`Lista de areas cadastradas em  ${agenciador} `,
          response: resultado
        })
      }
    )
  })
})
// GET POR APTIDAO (PRONTA)
router.get("aptidao/:aptidao", (req,res,next)=>{
  const aptidao= req.params.aptidao
  
  mysql.getConnection((error, conn)=>{
    conn.query(
      "select * from areas where aptidao = ? ",[aptidao.toLowerCase()],
      (error, resultado, field) =>{
        conn.release();

        if(error){
          return res.status(500).send({error : error, response: null})
        }

        res.status(201).send({
          mensagem:`Lista de areas aptas para  ${aptidao} `,
          response: resultado
        })
      }
    )
  })
})
// ATUALIZAR VALOR AREA (PRONTO)
router.patch("/valor/:id", (req, res, next) =>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      `UPDATE areas
        SET val_ha= ?
        WHERE id=?`,
      [req.body.val_ha,req.params.id],
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

// VENDER AREA (PRONTO)
router.delete("/delete/:id", (req, res, next) =>{
  mysql.getConnection((error, conn)=>{
    conn.query(
      `DELETE FROM areas WHERE id=?`,[req.params.id],
      (error, resultado, field) =>{
        conn.release();

        if(error){  
          return res.status(500).send({error : error, response: null})
        }

        res.status(202).send({
          mensagem:"Area vendida com sucesso!",
        })
      }
    )
  })
})



module.exports= router;