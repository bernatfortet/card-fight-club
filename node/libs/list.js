/* 
 * List
 * DesafioChampions, Kotoc
 * author Marc Freixas.
 */

function List ()
{
	this.list = [];
	
	this.Count = function()
	{
		return this.list.length;
	}
	
	this.Add = function ( e )
	{
		this.list[this.Count()] = e;
	}
	
	this.Remove = function ( e )
	{
		var l = [];
		for ( var i = 0; i < this.Count(); i++ ) {
			var o = this.list[i];
			if ( o != e ) {
				l[l.length] = o;
			}
		}
		this.list = l;
	}
	
	this.Get = function (idx)
	{
		if ( 0 <= idx && idx < this.Count() ) {
			return this.list[idx];
		}
		else {
			return null;
		}
	}	
	
	//REVISAR
	this.Clear = function() {
		this.list = [];
	}
}
module.exports = List;