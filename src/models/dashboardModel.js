var database = require("../database/config");

function obterDadosMembros() {
    // Faz JOIN com membro para garantir que todos os membros apareçam,
    // mesmo os que ainda não foram escolhidos por nenhum usuário (LEFT JOIN)
    var instrucaoSql = `
        SELECT m.nome AS membro_favorito, COUNT(u.id) AS votos
        FROM membro m
        LEFT JOIN usuario u ON u.fk_membro = m.id
        GROUP BY m.id
        ORDER BY votos DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterKpiMembroMaisVotado() {
    var instrucaoSql = `
        SELECT m.nome AS membro_mais_votado
        FROM usuario u
        JOIN membro m ON u.fk_membro = m.id
        GROUP BY m.id
        ORDER BY COUNT(u.id) DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterKpiConhecimentoBanda() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM usuario WHERE conhece_banda = 'S') * 100.0 / COUNT(*) AS porcentagem_conhecem
        FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterDadosMembros,
    obterKpiMembroMaisVotado,
    obterKpiConhecimentoBanda
};
