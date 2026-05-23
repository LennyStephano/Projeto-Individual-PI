var dashboardModel = require("../models/dashboardModel");

function obterDadosMembros(req, res) {
    dashboardModel.obterDadosMembros()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterKpis(req, res) {
    let kpis = {};

    dashboardModel.obterKpiMembroMaisVotado()
        .then(function (resultadoMembro) {
            if (resultadoMembro.length > 0) {
                kpis.membroMaisVotado = resultadoMembro[0].membro_mais_votado;
            } else {
                kpis.membroMaisVotado = "Nenhum";
            }

            return dashboardModel.obterKpiConhecimentoBanda();
        })
        .then(function (resultadoConhecimento) {
            if (resultadoConhecimento.length > 0 && resultadoConhecimento[0].porcentagem_conhecem != null) {
                kpis.porcentagemConhecimento = parseFloat(resultadoConhecimento[0].porcentagem_conhecem).toFixed(2);
            } else {
                kpis.porcentagemConhecimento = 0;
            }
            res.status(200).json(kpis);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os kpis.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterDadosMembros,
    obterKpis
};
