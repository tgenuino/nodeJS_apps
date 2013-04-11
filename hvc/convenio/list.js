module.exports = function(p) {
    var me          = this,
        link          = me.app.callMod('db').getLink();
    
    link.query("SELECT * FROM hvc_convenio", function(err, result) {
        if (err) me.res.send(err);

        me.res.send(result);
    });
};