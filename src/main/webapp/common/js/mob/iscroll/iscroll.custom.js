(function(window,undfined){
	var iScroll=function(selector,config){
		return new iScroll.fn.init(selector,config);
	}
	iScroll.fn=iScroll.prototype={
		init:function(selector,config){
			this.articleSelector=selector;
			this.y=0;//顶部y
			this.endY=0;//松手时的y
			this.startY=0;
			this.isPullDown=false;
			this.isBottom=false;
			this.isPullDownDone;
			this.isBottomDone;
			this.config={
				scrollbars: true,
				mouseWheel: true,
				probeType: 3,
				fadeScrollbars: true,
				preventDefault:false
				//startY:50
			}
			if(config && typeof config ==="object"){
				this.config=config;
			}
			this.selector=selector;
			this.pullScroll=new IScroll(selector,this.config);
			
			return this;
		},
		pullStatus:function(pullOption,status){
			if(status=="init"){
				$(pullOption.pullBlock).removeClass("flip");
				$(pullOption.pullBlock).removeClass("loading");
				$(".pullDownLabel",pullOption.pullBlock).html(pullOption.pullDownLableInit);
			}else if(status=="draging"){
				$(pullOption.pullBlock).addClass("flip");
				$(".pullDownLabel",pullOption.pullBlock).html(pullOption.pullDownLableDraging);
			}else if(status=="refresh"){
				$(pullOption.pullBlock).addClass("loading");
				$(".pullDownLabel",pullOption.pullBlock).html(pullOption.pullDownLableRefresh);
			}else{
				console.log("请传入当前下拉块处于的状态：init、draging、refresh");
			}
		},
		pull:function(pullOption){
			if(!pullOption && typeof !pullOption==="object"){
				alert("您传入的下拉刷新参数不正确");
			}
			this.pullOption={
				"pullBlock":pullOption.pullBlock||document.getElementById(this.selector.substr(1)).getElementsByClassName("pullDown")[0],
				"pullDownText1":pullOption.pullDownLableInit||"下拉刷新",
				"pullDownText2":pullOption.pullDownLableDraging||"释放立即刷新",
				"pullDownText3":pullOption.pullDownLableRefresh||"正在刷新",
				"pullDownRange":pullOption.pullDownRange||50,
				"onPullDown":pullOption.onPullDown,
				"onPullDownDone":pullOption.onPullDownDone||null,
				"onPullDownError":pullOption.onPullDownError||null,
				"onPullBottom":pullOption.onPullBottom||null,
				"onPullBottomDone":pullOption.onPullBottomDone||null,
				"onPullBottomError":pullOption.onPullBottomError||null
			}
			//console.log(this.pullOption);
			var self=this;
			this.pullScroll.on('scrollStart', function () {
				self.startY=this.y>>0;
				console.log("开始滚动"+self.startY);
			});
			this.pullScroll.on('scroll', function () {
				self.y=this.y>>0;
				//滚动到底部，触发底部事件
				if(self.pullScroll.maxScrollY<0 && self.pullOption.onPullBottom && self.y<=self.pullScroll.maxScrollY){
					self.isBottom=true;
				}else{
					self.isBottom=false;
				}
				//向下拉动，如果拉的不到位，将会隐藏
				var marTop=eval(self.y-self.pullOption.pullDownRange)<0?eval(self.y-self.pullOption.pullDownRange):0;
				if(self.y>0 && self.endY<self.pullOption.pullDownRange){
					$(self.pullOption.pullBlock).css({"display":"block","margin-top": marTop+"px"});
				}
				//松手处
				document.addEventListener("touchend",function(){
					//若不是从头部向上滚动，则不可以刷新
					if(self.startY<-150){
						self.isPullDown=false;
						return;
					}
					self.endY=self.y;
					if(self.endY>=self.pullOption.pullDownRange){
						self.isPullDown=true;
						$(self.pullOption.pullBlock).css({"display":"block","margin-top": "0px"});
					}else{
						self.isPullDown=false;
					}
				},false);
			});
			this.pullScroll.on('scrollEnd', function () {
				//滚动至底部时，执行底部函数
				if(self.isBottom){
					self.pullOption.onPullBottom();
					var listenBottomDone=window.setInterval(function(){
						//判断是否加载成功
						if(iScroll.isBottomDone==true){
							window.clearInterval(listenBottomDone);
							if(self.pullOption.onPullBottomDone){
								self.pullOption.onPullBottomDone();
							}
							scrollRefresh();
						}else if(iScroll.isBottomDone==false){
							window.clearInterval(listenPullDownDone);
							if(self.pullOption.onPullBottomError){
								self.pullOption.onPullBottomError();
							}
						}
					},200)
				}
				//刷新状态时，改变图标样式，并执行刷新函数
				if(self.isPullDown==true){
					self.pullStatus(self.pullOption,"refresh");
					self.isPullDown=false;
					self.pullOption.onPullDown();
					var listenPullDownDone=window.setInterval(function(){
						//判断是否加载成功
						console.log("isPullDownDone:"+iScroll.isPullDownDone);
						if(iScroll.isPullDownDone==true){
							window.clearInterval(listenPullDownDone);
							if(self.pullOption.onPullDownDone){
								self.pullOption.onPullDownDone();
							}
							scrollRefresh();
						}else if(iScroll.isPullDownDone==false){
							window.clearInterval(listenPullDownDone);
							if(self.pullOption.onPullDownError){
								self.pullOption.onPullDownError();
							}
						}
					},200)
				}
				function scrollRefresh(){
					//最后初始化
					self.pullStatus(self.pullOption,"init");//下拉块内容初始化
					$(self.pullOption.pullBlock).css({"display":"none","margin-top": 0+"px"});//隐藏下拉块
					self.endY=0;//松手处初始化
					self.pullScroll.refresh();
				}
			});
		}
	}
	iScroll.fn.init.prototype=iScroll.fn;
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.iScroll=iScroll;//自定义iScroll对象
	}
})(window)