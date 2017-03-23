/*
*	Slider.js主要用于手机端滑动
*	Version	:	1.0.0
*	Author	:	WangMingzhu
*	Email	:	wangmingzhu@nj.fiberhome.com.cn
*   Copyright 2015 (c) 南京烽火星空通信发展有限公司
*/

(function(){
	'use strict';
    /*===========================
    Slider
    ===========================*/
	var sliderWrapper,slider,translateX=0,index=0,xDown,yDown,x,y,xDiff,yDiff,xUp,yUp,moveX,sliderWidth=0,sliderLvl=[];
	var Slider=function(container,params){
		var self=this;
		//初始化
		sliderWrapper=document.querySelector(container).querySelector(".slider-wrapper");
		slider=sliderWrapper.querySelectorAll(".slider-slide");
		sliderWidth=document.body.clientWidth;
		for(var i=0;i<slider.length;i++){
			sliderWrapper.style.width=sliderWidth*(i+1)+"px";
			slider[i].style.width=sliderWidth+"px";
			sliderLvl[i]=-sliderWidth*i;
		}
		document.getElementById("pageslider").addEventListener("touchstart",function(e){
			document.addEventListener("touchmove",preventHandler,false);
			xDown=e.touches[0].clientX;
			yDown=e.touches[0].clientY;
		},false);
		document.getElementById("pageslider").addEventListener("touchmove",function(e){
			x=e.touches[0].clientX;
			y=e.touches[0].clientY;
			xDiff=xDown-x;
			yDiff=yDown-y;
			//console.log("当前索引为："+index);
			//判断是否是上下滑动
			if(Math.abs(yDiff)>Math.abs(xDiff)){
				//console.log("您正在上下滑动");
				self.slideTo(index);
				document.removeEventListener("touchmove",preventHandler,false);
				return;
			}
			
			moveX=0;
			moveX=translateX-xDiff;
			if(moveX>0){
				moveX=0;
			}
			if(moveX < -(slider.length-1)*sliderWidth){
				moveX=-(slider.length-1)*sliderWidth;
			}
			sliderWrapper.style.left=moveX+"px";
			
		},false);
		document.getElementById("pageslider").addEventListener("touchend",function(e){
			document.addEventListener("touchmove",preventHandler,false);
			//获得
			translateX=moveX;
			
			//判断是否是点击
			xUp = e.changedTouches[0].clientX,
			yUp = e.changedTouches[0].clientY;
			if( Math.abs(xUp - xDown) < 6){
				self.slideTo(index);
				return;
			}
			
			//当滑动超过屏幕一半时
			var xRange=sliderWidth/3;
			var xRangePrecent=xDiff/xRange;
		
			if(xRangePrecent>1){
				//console.log("下一页");
				self.slideTo(index+1,params);
			}else if(xRangePrecent>0 && xRangePrecent<1){
				//console.log("还原");
				self.slideTo(index,params);
			}else if(xRangePrecent<-1){
				//console.log("上一页");
				self.slideTo(index-1,params);
			}else if(xRangePrecent>-1 && xRangePrecent<0){
				//console.log("还原");
				self.slideTo(index,params);
			}
		},false);
		
	};
	Slider.prototype={
		slideTo:function(toIndex,params){
			index=toIndex;
			//console.log("改变后索引为："+index);
			if(index<0){
				index=0;
			}
			if(index>=slider.length){
				index=slider.length-1;
			}
			translateX=sliderLvl[index];
			for(var i=0;i<slider.length;i++){
				slider[i].className=slider[i].className.replace(/\s{1,}active/,"");
			}
			slider[index].className+=" active";
			//移动至index
			sliderWrapper.style.webkitTransitionDuration="300ms";
			sliderWrapper.style.left=translateX+"px";
			setTimeout(function(){
				sliderWrapper.style.webkitTransitionDuration="0ms";
				if(params && params["onSliderEnd"] && typeof params["onSliderEnd"] == "function"){
					params["onSliderEnd"](index,slider[index]);
				}
			},300);
			
		},
	};
	function preventHandler(e){
		e.preventDefault()
	}
	window.Slider=Slider;
})();