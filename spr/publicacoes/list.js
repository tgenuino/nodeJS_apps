module.exports = function(p) {
    var me          = this,
        link        = me.app.callMod('db').getLink(),
        query       = "SELECT p.* FROM spr_publicacao p, spr_publicacoes_tipo pt ";

    var qString = me.req.query;
    
    // Seleciona somente ativos
    query += "WHERE Ativo = 1 ";
    
    // Adiciona a tabela de Tipos para conversão de nomes
    query += "AND p.IdTipoPublicacao = pt.IdTipo ";
    
    // Caso tenha especificado o tipo
    if(p[0]) {
        if (p[0] != 'all') {
            var inNum = (p[0]*1);

            if ((typeof inNum === 'number') && (!isNaN(inNum))) {
                query += "AND p.IdTipoPublicacao = ? ";
            } else {
                query += "AND pt.NomeTipo = ? ";
            }
        }
        
//        // Data inicial
//        if(p[1]) {
//            // Data final
//            if(p[2]) {
//                query += "AND BETWEEN (? AND ?) ";
//            } else {
//                query += "AND p.DataPublicacao <= ? ";
//            }
//        }
    }
    
    query += "ORDER BY p.DataPublicacao ";
    
    if (qString['limit']) {
        query += "LIMIT "+qString['limit']+' ';
    }
    
    link.query(query, p, function(err, result) {
        if (err)
            me.res.send(err);
        else
            me.res.send(result);
    });
    
};