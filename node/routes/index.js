
/*
 * GET home page.
 */

exports.index = function(req, res){
	//if( req.session.userid == null ){
	//	res.render('login', { title: 'Express' });
	//} else {
		res.render('index', { title: 'Express' });
	//}
	//console.log( req.session );
};