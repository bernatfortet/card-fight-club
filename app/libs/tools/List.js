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

	this.isEmpty = function(){
		return ( this.list.length == 0);
	}

	this.Clear = function() {
		this.list = [];
	}

	this.Insert = function( index, item ){
		this.list.splice( index, 0, item )
		return this.list;
	}

	this.Move = function( index, newIndex ){
		var item = this.list[index];
		this.Remove( item );
		this.Insert( newIndex, item )
		return this.list;
	}
}
