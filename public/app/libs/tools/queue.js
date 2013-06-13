/*
Queue.js
Created by Stephen Morley - http://code.stephenmorley.org/ - under CC
*/

function Queue()
{
	var queue  = [];

	var offset = 0;

	this.queue = function(){
		return queue;
	}

	this.Count = function(){
		return (queue.length - offset);
	}

	this.isEmpty = function(){
		return (queue.length == 0);
	}

	this.Enqueue = function(item){
		queue.push(item);
	}

	this.Dequeue = function(){
		if (queue.length == 0) return undefined;
		var item = queue[offset];
		if (++ offset * 2 >= queue.length){
		  queue  = queue.slice(offset);
		  offset = 0;
		}
		return item;
	}
	
	this.GetQueue = function()
	{
		return queue;
	}

	this.Get = function (idx)
	{
		if ( 0 <= idx && idx < this.Count() ) {
			return this.queue[idx];
		}
		else {
			return null;
		}
	}	

	this.Peek = function(){
		return (queue.length > 0 ? queue[offset] : undefined);
	}
	
	this.Clear = function()
	{
		queue = [];
	}

}
