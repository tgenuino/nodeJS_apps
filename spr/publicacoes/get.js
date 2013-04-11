module.exports = function(p) {
    var me          = this,
        link          = me.app.callMod('db').getLink();
    
    link.query("SELECT * FROM spr_publicacao WHERE IdPublicacao = ?", p, function(err, result) {
        if (err) 
            me.res.send(err);
        else 
            me.res.send(result[0]);
    });
};