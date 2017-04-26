var db=require('../lib/db');
module.exports = function*(next) {
    try {
        delete require.cache[require.resolve('./navBar')]
        var navBar=yield require('./navBar');
        var chinese=this.query.language?false:true;
        var title=chinese?"你的标题":"your title";
        var data ={
            navBar,
            title,
            chinese
        }
        this.body = this.render('./view/quote', data);
        //this.body=this.render('test',{test:a});
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}
