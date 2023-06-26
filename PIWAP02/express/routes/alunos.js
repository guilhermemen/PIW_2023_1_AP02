var express = require('express');
var router = express.Router();
var AlunoServiceMongo = require("../services/aluno.services.mongo")

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get(
    '/listar',
     function(req, res, next) {
       AlunoServiceMongo.list(req,res)
    }
);


router.post(
    '/cadastrar',
     function(req, res, next) {
        AlunoServiceMongo.register(req,res)
    }
);



router.get(
    '/recuperar/:id',
     function(req, res, next) {
        AlunoServiceMongo.retrieve(req,res)
    }
);



router.put(
    '/atualizar/:id',
     function(req, res, next) {
        AlunoServiceMongo.update(req,res)
    }
);

router.delete(
    '/remover/:id',
     function(req, res, next) {
        AlunoServiceMongo.delete(req,res)
    }
);

module.exports = router;