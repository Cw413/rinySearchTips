var rinySearchTips=function(options){

	this.options=options;
	this.el=document.getElementById(this.options.el);
	this.list=document.getElementById(this.options.list);

	this.match();
	this.listHandler();

	this.list.style.display="none";

};

rinySearchTips.prototype.match=function(){

	var _this=this;

	function valHandler(val){

		var val=val.replace(/(^\s*)|(\s*$)/g,'');

		if(val=='') return false;

		var output=[];

		if(typeof _this.options.data[0]=='object'){

			var reg=new RegExp('^'+val);

			for(var i=0;i<_this.options.data.length;i++){
				if(_this.options.data[i][_this.options.name].indexOf(val)!=-1 || reg.test(_this.options.data[i][_this.options.pinyin])){
					output.push(_this.options.data[i][_this.options.name]);
				};
			};

		}else{

			for(var j=0;j<_this.options.data.length;j++){
				if(_this.options.data[j].indexOf(val)!=-1){
					output.push(_this.options.data[j]);
				};
			};

		};

		if(output[0]){
			return output;
		}else{
			return false;
		};
	};

	_this.el.addEventListener('input',function(e){

		var output=valHandler(e.currentTarget.value);

		_this.output=output;
		_this.append();

	},false);

};

rinySearchTips.prototype.append=function(){

	var output=this.output;

	var html='';

	if(output){

		if(this.options.limit){
			output=output.slice(0,this.options.limit);
		};

		for(var i=0;i<output.length;i++){
			html+=this.options.listTemplate.replace(/>\s*listTemplate\s*/,' rinytips=1>'+output[i]);
		};

		this.list.style.display='block';

	}else{

		this.list.style.display='none';

	};

	this.list.innerHTML=html;

};

rinySearchTips.prototype.listHandler=function(){

	var _this=this;

	_this.el.addEventListener('focus',function(){
		if(!_this.output) return;
		_this.list.style.display='block';
	});

	document.documentElement.addEventListener('click',function(e){

		if(!_this.output) return;

		if(e.target.getAttribute('rinytips')==1){
			_this.el.value=e.target.textContent;
		};

		if(e.target.id!=_this.options.el && e.target.id!=_this.options.list){
			_this.list.style.display="none";
		};
		
	},false);

};