/*
 * Author:LN(Allison Lee)
 * Data:2013-01-31
 * Time:9:33
 * Descript:页面公共方法
 * Tips：有问题请找李宁-Allison Lee（UED 21楼）
 */
 
 //页面加载后绑定事件 执行相关事件
 $(document).ready(function(){
	 	//calLoginH();
	 	setMainH();
	 	var sideW=$(".aside").outerWidth(true);
		var sideBox=$(".aside").siblings(".device-checked-box").outerWidth(true);
		$(".main").css("margin-left",sideW+sideBox+"px")
		$(window).resize(function(e){
			//calLoginH();
			setMainH();
			if($("#Js-asideNav")&&$("#Js-asideNav").length>0){
				setTimeout(function(){
					if(window.skyScroll){
						var a = skyScroll({ 
		            		target:'JsasideNav',
		            		width:180, 
		               		height:$(".aside").outerHeight(true)
		       			 });
			 		}
				},500)
				
	 		}
		});
		
		//登陆模拟聚焦效果
		/* $(".login-text").each(function(){
			var _this=$(this)	
			if($.trim(_this.val())!=""){
				_this.siblings(".login-label").hide();
			}
			_this.focus(function(){
				if($.trim(_this.val())!=""){			
				}
				else
				{
					_this.siblings(".login-label").hide();	
				}
			}).blur(function(){
				if($.trim(_this.val())!=""){
					_this.siblings(".login-label").hide();			
				}
				else
				{
					_this.siblings(".login-label").show();	
				}
			})
			_this.siblings(".login-label").click(function(){
					_this.focus();
				})
		}) */
		$(".login-text").focusin(function(){
			_this=$(this);
			_this.addClass("focus-border");
		});
		$(".login-text").focusout(function(){
			_this=$(this);
			_this.removeClass("focus-border");
		});		
		$(".hide-header").click(function(){
			$(this).hide();
			$(".header > *").not(".info_line").hide();
			$(".show-header").show();
			//setMainH();
			$(window).resize();
		});
		$(".show-header").click(function(){
			$(this).hide();
			var conH=$(".container").height();
			$(".header > *").show();
			$(".show-header").hide();
			setMainH();
			$(window).resize();
		});		
		//控制主要内容模块的高度
		setMainH();
		//隐藏左侧菜单栏
	    $(".switch-bar").toggle(function(){
	    	var _this=$(this);
	    	var sideW=_this.siblings(".aside").outerWidth(true);
	    	_this.siblings(".aside").hide();
	    	var siblingDiv=_this.siblings(".aside").siblings(".device-checked-box") && _this.siblings(".aside").siblings(".device-checked-box").length>0 ? _this.siblings(".aside").siblings(".device-checked-box").outerWidth(true) : 0;
	    	var closeW=$(".switch-bar").outerWidth(true)
	    	//隐藏bar滚动
	    	//$(".aside-bar").hide();
	    	$(".switch-arrow").addClass("click");
	    	$(".main").not(".inner-main").css("margin-left",closeW+parseInt(siblingDiv)+"px");
	    	//控制子iframe的内页面的面包屑
	    	if($(getFrameBody("mainFrame").document.body).find(".main-hd") && $(getFrameBody("mainFrame").document.body).find(".main-hd").length>0){
	    		$(getFrameBody("mainFrame").document.body).find(".main-hd .crumb").css("padding-left","130px")
	    		
	    	}
	    },function(){
	    	var _this=$(this);
	    	var sideW=_this.siblings(".aside").outerWidth(true);
	    	var siblingDiv=_this.siblings(".aside").siblings(".device-checked-box") && _this.siblings(".aside").siblings(".device-checked-box").length>0 ? _this.siblings(".aside").siblings(".device-checked-box").outerWidth(true) : 0;
	    	_this.siblings(".aside").show();
	    	$(".switch-arrow").removeClass("click");
	    	$(".main").not(".inner-main").css("margin-left",sideW+parseInt(siblingDiv)+"px");
	    		//控制子iframe的内页面的面包屑
	    	if($(getFrameBody("mainFrame").document.body).find(".main-hd") && $(getFrameBody("mainFrame").document.body).find(".main-hd").length>0){
	    		$(getFrameBody("mainFrame").document.body).find(".main-hd .crumb").css("padding-left","0")
	    		
	    	}
	    	//控制滚动条是否显示
	    	//showScroll();
	    }
	    )
})
 
 
 //页面公共function
 
 /*
 	*计算login容器的高度 让login容器居中显示
 */

 function calLoginH(){
	 	var formH=$(".login-box").outerHeight(true);
		var winH=Math.max(document.documentElement.clientHeight,document.body.clientHeight)
		if(formH<winH)
		{
			$(".login-box").css({
					"top":Math.floor((parseInt(winH)-parseInt(formH))/2+30)+"px"
				})
		}
		else
		$(".login-box").css("top","0px")
	 }
//给右侧加载内容
function showPage(url){
	if(url){
		$("#mainFrame").attr("src",url)
	}
}
	
//动态计算高度（高度都已窗体的高度为基础（内页使用iframe框架））
function  setMainH(){
		var headH=$(".header").outerHeight(true);
		var footH=$(".footer").outerHeight(true);
		var asideMenuH=$("#Js-asideNav").outerHeight(true);
		var windH=$(window).outerHeight(true);
		$(".container,.aside,#mainFrame,.switch-bar,.main").css("height",windH-headH-footH+"px")
		if($(".main").hasClass("user-main")){
			$(".user-main,#mainFrame").css("height",windH-headH-footH-20+"px")
			$(".user-main-frame").css("height",windH-headH-footH-20+"px")
		}
		if($(".aside").siblings(".device-checked-box")){
			$(".aside").siblings(".device-checked-box").css("height",windH-headH-footH+"px")
		}
		//控制滚动条的出现
		//showScroll();
	}
//左侧导航栏滚动效果
var scrollObj={}
function asideScroll(){
	$(".aside-bar").mousedown(function(){
		var _this=$(this)
		scrollObj.o=$(this)
		_this.onmousemove(function(){
			alert(44)
		})
	})
	
	
}
//模拟浏览器滚动插件
$.fn.scrollPlugin=function(){
	var $this=$(this)
	//滚动事件
	$this.scroll(function(e){
		//alert(33)
	})
}