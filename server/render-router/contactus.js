var db=require('../lib/db');
module.exports = function*(next) {
    try {
        delete require.cache[require.resolve('./navBar')]
        var navBar=yield require('./navBar');
        var contactusBanner=yield db.Style.findOne({type:"contactusBanner"}).exec().then(function(value){
            if(!value){
                return {}
            }else{
                return value.array[0];
            }
        })
        var contact=yield db.Style.findOne({type:'contact'},'array').exec().then(function(value){
            if(!value){
                return [];
            }else{
                return value.array;
            }
        });
        var chinese=this.query.language?false:true;
        var title=chinese?"你的标题":"your title";
        var data ={
            contact,
            navBar,
            chinese,
            title,
            contactusBanner
        }
        this.body = this.render('./view/contactus', data);
    } catch (error) {
        this.logger.error(error);
        yield next;
    }
}
