define([], function () {

	var GameBoard = function() {
		var board = this;
		// The current list of objects
		this.objects = [];
		this.cnt = [];
		
		// Add a new object to the object list
		this.add = function(obj) { 
			obj.board=this; 
			this.objects.push(obj); 
			this.cnt[obj.type] = (this.cnt[obj.type] || 0) + 1;
			return obj; 
		};
		
		// Mark an object for removal
		this.remove = function(obj) { 
			var wasStillAlive = this.objects.indexOf(obj) != -1;
			if(wasStillAlive) { this.removed.push(obj);  }
			return wasStillAlive;
		};
		
		// Reset the list of removed objects
		this.resetRemoved = function() { this.removed = []; }

		// Remove objects marked for removal from the list
		this.finalizeRemoved = function() {
			for(var i=0,len=this.removed.length;i<len;i++) {
				var idx = this.objects.indexOf(this.removed[i]);
				if(idx != -1) {
					this.cnt[this.removed[i].type]--;
					this.objects.splice(idx,1);
				}
			}
		}
		
		// Call the same method on all current objects 
		this.iterate = function(funcName) {
			var args = Array.prototype.slice.call(arguments,1);
			for(var i=0,len=this.objects.length;i<len;i++) {
				var obj = this.objects[i];
				obj[funcName].apply(obj,args)
			}
		};
		
		// Find the first object for which func is true
		this.detect = function(func) {
			for(var i = 0,val=null, len=this.objects.length; i < len; i++) {
				if(func.call(this.objects[i])) return this.objects[i];
			}
			return false;
		};
		
		// Call step on all objects and then delete
		// any objects that have been marked for removal		
		this.step = function(dt) { 
			this.resetRemoved();
			this.iterate('step',dt);
			this.finalizeRemoved();
		};
		
		// Draw all the objects
		this.draw= function(ctx) {
			this.iterate('draw',ctx);
		};
		
		this.overlap = function(o1,o2) {
			return !((o1.y+o1.h-1<o2.y) || (o1.y>o2.y+o2.h-1) ||
					 (o1.x+o1.w-1<o2.x) || (o1.x>o2.x+o2.w-1));
		};

		this.collide = function(obj,type) {
			return this.detect(function() {
				if(obj != this) {
					var isType = !type || this.type & type;
					var overlap = board.overlap(obj, this);
					var col = isType && overlap;
					return col ? this : false;
				}
			});
		};		
	}
	
	
	return GameBoard;
});