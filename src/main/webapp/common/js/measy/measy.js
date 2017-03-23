/**
 * 类似判断
 */
var Objtype={
	//顶级类型判断
	typeOf:function(obj){
		return typeof(obj);
	},
	//类型比较，原型链类型比皆为真
	instanceOf:function(obj1,obj2){
		return obj1 instanceof obj2;
	},
	//获得类型
	prototypeOf:function(obj){
		return Object.prototype.toString.call(obj);
	}
}

/**
 * 兼容性强的事件函数模型
 */
var EventUtil = {
	addHandler:function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeHandler:function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	preventDefault:function (e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation:function(e){
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
	},
	event:function(e){
		return e?e:window.e;
	},
	type:function(e){
		return e.type;
	},
	element:function(e){
		return e.target || e.srcElement;
	}
};
//使用方法
//EventUtil.addHandler(element,"click",function(e){do something...})

/**
 * 加载遮罩
 */
var Loadmark={
	//创建遮罩层
	createLoader:function(){
		$(document.head).append('<link rel="stylesheet" href="js/measy/css/loadmark.css"/>');
		$(document.body).append('<div id="_layer_">'+
			'<div id="_MaskLayer_"></div>'+
			'<div id="_wait_">'+
				'<center><img src="js/measy/img/loading/loading.gif"/><h3>loading...</h3></center>'+
			'</div>'+
		'</div>');
	},
	//删除遮罩层
	removeLoader:function(){
		$('link[href="js/measy/loadmark/loadmark.css"]').remove();
		$('#_layer_').remove();
	},
	//显示遮罩层
	loaderShow:function() {
		Loadmark.createLoader();
		$('#_layer_').fadeIn('slow');
	},
	//隐藏遮罩层
	loaderHide:function(){ 
		$('#_layer_').fadeOut('slow','linear',Loadmark.removeLoader());
	}
};
//使用方法
/*$(document).ready(function(e) {
    Loadmark.loaderShow();
});
$(window).load(function(){
    Loadmark.loaderHide();
});*/

/**
 * 日期能力扩展
 */
var DateUtil=function(){
	var date = new Date();
	return {
		//当前年
		year:function(){
			return date.getFullYear();
		},
		month:function(){
			return date.getMonth() + 1;
		},
		day:function(){
			return date.getDate();
		},
		hour:function(){
			return date.getHours();
		},
		minute:function(){
			return date.getMinutes();
		},
		seconds:function(){
			return date.getSeconds();
		},
		quarter:function(){
			return Math.floor((date.getMonth()+3)/3);
		},
		milliseconds:function(){
			return date.getMilliseconds();
		},
		today:function(){
			return DateUtil.year()+"-"+DateUtil.month()+"-"+DateUtil.day();
		},
		now:function(){
			return DateUtil.hour()+":"+DateUtil.minute();
		},
		todayNow:function(){
			return DateUtil.today()+" "+DateUtil.now();
		},
		time:function(){
			return date.getTime();//获得现在距1970-1-1的毫秒数
		},
		days:function(month,year){
			var monthExpr=/^(0?[[1-9]|1[0-2])$/;//匹配1-12月
			var yearExpr=/^[1-2][0-9][0-9][0-9]$/;//匹配1000-2999年
			if(month && year){
				if(monthExpr.exec(month) && yearExpr.exec(year)){
					return new Date(year,month,0).getDate();
				}else{
					alert("您输入的月份和年份不正确");
					return;
				}
			}
			if(month){
				if(monthExpr.exec(month)){
					return new Date(date.getFullYear(),month,0).getDate();
				}else{
					alert("您输入的月份不正确");
					return;
				}
			}
			return new Date(date.getFullYear(), (date.getMonth()+1), 0).getDate();
		},
		tomorrow:function(){
			if(DateUtil.days()>=DateUtil.day()+1){
				return DateUtil.year()+"-"+DateUtil.month()+"-"+eval(DateUtil.day()+1);
			}else{
				if(DateUtil.month()==12){
					return eval(DateUtil.year()+1)+"-"+1+"-"+1;
				}
				return DateUtil.year()+"-"+eval(DateUtil.month()+1)+"-"+1;
			}
		},
		//格式化日期yyyy-MM-dd hh:mm:ss
		format:function(fmtDate,fmtType){
			var fmt="yyyy-MM-dd hh:mm:ss";
			if(fmtType){
				fmt=fmtType;
			}
			var y,M,d,h,m,s;
			
			if(fmtDate instanceof Date == true){
				y=fmtDate.getFullYear();
				M=fmtDate.getMonth() + 1;
				d=fmtDate.getDate();
				h=fmtDate.getHours();
				m=fmtDate.getMinutes();
				s=fmtDate.getSeconds();
			}
			//如果不是Date对象,就用另一种方法处理
			else{
				//匹配年月日yyyy-MM-dd或者yyyy.mm.dd或者yyyy/mm/dd
				var dateExpr=/([1-2][0-9][0-9][0-9])[\.\/-](0?[[1-9]|1[0-2])[\.\/-]([1-3][0-9]|0?[0-9])/
				var dateMatch=dateExpr.exec(fmtDate);
				if(!dateMatch || isNaN(dateMatch[1])  && isNaN(dateMatch[2]) && isNaN(dateMatch[3])){
					alert("您所要格式化的时期格式不正确");
					return;
				}
				y=dateMatch[1];
				M=dateMatch[2];
				d=dateMatch[3];
				h="00";
				m="00";
				s="00";
				
				//匹配时分hh:mm
				var timeExpr=/(0?[0-9]|[1-2][0-9]):([1-6][0-9]|0?[0-9])/
				var timeMatch=timeExpr.exec(fmtDate);
				if(timeMatch){
					h=timeMatch[1]?timeMatch[1]:"00";
					m=timeMatch[2]?timeMatch[2]:"00";
					s="00";
				}
				
				//匹配时分hh:mm:ss
				var tExpr=/(\d{2}|\d{1}):(\d{2}|\d{1}):(\d{2}|\d{1})/
				var tMatch=tExpr.exec(fmtDate);
				if(tMatch){
					h=tMatch[1]?tMatch[1]:"00";
					m=tMatch[2]?tMatch[2]:"00";
					s=tMatch[3]?tMatch[3]:"00";
				}
			}
			
			var dateExprs={
				"M+" :M,   
				"d+" :d,  
				"h+" :h,   
				"m+" :m,  
				"s+" :s
			};
			if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (y+"").substr(4 - RegExp.$1.length));
			}
			for(var k in dateExprs){
				//"("+ k +")"=(M+)、(d+)、(h+)...
				if(new RegExp("("+ k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (dateExprs[k]) : (("00"+ dateExprs[k]).substr((""+ dateExprs[k]).length)));   
				}
			}
			return fmt;
		},
		//时效性
		expires:function(cacheTime){
			var y=date.getFullYear();
			var M=date.getMonth() + 1;
			var d=date.getDate();
			var h=date.getHours();
			var m=date.getMinutes();
			var s=date.getSeconds();
			if(!cacheTime){
				alert("请传入合法的时效");
				return;
			}
			//当传入的是today，时效将保存到隔天0点0分
			if(cacheTime==="today"){
				d++;
				h=0;
				m=0;
				s=0;
			}
			//当传入的是数字，并且小于1，当作延长分钟
			if(!isNaN(cacheTime) && cacheTime<1){
				m+=Math.abs(Math.round(cacheTime*60));
				if(m>=60){
					m=m-60
					h+=1;
				}
			}
			//当传入的是数字，并且大于1，当作延长小时
			if(!isNaN(cacheTime) && cacheTime>1){
				h+=Math.abs(Math.round(cacheTime));
			}
			if(typeof cacheTime==="object"){
				if(!isNaN(cacheTime.year) && eval(cacheTime.year+y)<=2999){
					y=cacheTime.year?cacheTime.year+y:y;
				}
				if(!isNaN(cacheTime.month) && eval(cacheTime.month+M)<=12){
					M=cacheTime.month?cacheTime.month+M:M;
				}
				if(!isNaN(cacheTime.day) && eval(cacheTime.day+d)<=DateUtil.days()){
					d=cacheTime.day?cacheTime.day+d:d;
				}
				if(!isNaN(cacheTime.hour) && eval(cacheTime.hour+h)<24){
					h=cacheTime.hour?cacheTime.hour+h:h;
				}
				if(!isNaN(cacheTime.minute) && eval(cacheTime.minute+m)<60){
					m=cacheTime.minute?cacheTime.minute+m:m;
				}
				if(!isNaN(cacheTime.second) && eval(cacheTime.second+s)<60){
					s=cacheTime.second?cacheTime.second+s:s;
				}
			}
			return y+"-"+M+"-"+d+" "+h+":"+m+":"+s;
		},
		
	};
}();

/**
 * 本地数据库
 */
var DB = function() {
    var store = window.localStorage, doc = document.documentElement;
    if (!store) {
        doc.style.behavior = 'url(#default#userData)';//保存表单的值
		console.log("您当前的设备不支持本地数据库localstore");
    }
    return {
        /**
         * 保存数据
         */
        set : function(key, val, context) {
            if (store) {
                return store.setItem(key, val, context);
            } else {
                doc.setAttribute(key, value);
                return doc.save(context || 'default');
            }
        },
        /**
         * 读取数据
         */
        get : function(key, context) {
            if (store) {
                return store.getItem(key, context);
            } else {
                doc.load(context || 'default');
                return doc.getAttribute(key) || '';
            }
        },
        /**
         * 删除数据
         * @param {Object}
         * @param {Object}
         */
        del : function(key, context) {
            if (store) {
                return store.removeItem(key, context);
            } else {
                context = context || 'default';
                doc.load(context);
                doc.removeAttribute(key);
                return doc.save(context);
            }
        },
        /**
         * 清空数据
         */
        clear : function() {
            if (store) {
                return store.clear();
            } else {
                doc.expires = -1;
            }
        }
    };
}();
//使用方法
//DB.set("key","value");
//DB.get("key");

/**
 *百度地图 
 */
var BaiduMap={
	//gps回调
	gps:function(feature,featureHandler){
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(pos){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var point=pos.point,x=point.lng,y=point.lat;
				//这里是坐标point
				if(feature && feature==="point"){
					featureHandler(point);
				}
				//根据point得到地址
				var gpsPlace = new BMap.Geocoder();
				gpsPlace.getLocation(point, function(result){      
					if (result){
						//执行传入的回调函数
						if(feature && feature==="place"){
							featureHandler(result.address);
						}
					}
				});
			}else {
				alert("获取坐标失败"+this.getStatus());
			}
		},{enableHighAccuracy: true});
	},
	
	//一键导航
	mapGuide:function(guideopts){
		var lng=guideopts.point.lng;
		var lat=guideopts.point.lat;
		var title=guideopts.title;
		var content=guideopts.content;
		window.location.href='http://api.map.baidu.com/marker?location='+lat+','+lng+'&title='+title+'&content='+content+'&output=html';
	},
	
	//返回地址截图
	mapImg:function(mapImgOpt){
		var lng=mapImgOpt.point.lng;
		var lat=mapImgOpt.point.lat;
		var title=mapImgOpt.title;
		var content=mapImgOpt.content;
		var w=mapImgOpt.width;
		var h=mapImgOpt.height;
		
		var imgSrc="http://api.map.baidu.com/staticimage?width="+w+"&height="+h+"&center="+lng+","+lat+"&markers="+lng+","+lat+"&scale=1&zoom=15&markerStyles=-1,http://api.map.baidu.com/images/marker_red.png";
		return imgSrc;
	}
};

/**
 *社会化分享
 */


(function(window,undfined){
/**
 * 选择器
 */
	var queryDomElem=function(selector){
		var domElem,match,idExpr = /^#([\w-]*)$/;//匹配id(#id)
		if ( !selector ) {
			alert("请输入id或者传元素对象");
		}
		//判断传入的是id还是对象
		if ( typeof selector === "string" ) {
			match = idExpr.exec(selector);
			if(!match || !match[1] || !document.getElementById(match[1]) ){
				alert("您传入的id不存在");
				return;
			}
			domElem=document.getElementById(match[1]);	
		}else if(typeof selector === "object"){
			domElem=selector;
		}else{
			alert("您传入的参数既不是id，也不是一个对象");
		}
		return domElem;
	}
/**
 * 多媒体控件
 */
	var Media=function(selector){
		return new Media.fn.init(selector);
	};
	Media.fn=Media.prototype={
		constructor:Media,
		init:function(selector){
			this.mediaElem=queryDomElem(selector);
			return this;
		},
		//暂停与播放
		resume:function(){
			if(this.mediaElem.paused){
				this.mediaElem.play();
				return false;
			}else{
				this.mediaElem.pause();
				return true;
			}
		},
		//全屏与非全屏，w3c推荐标准，但尚未兼容
		fullScreen:function(){
			if(this.mediaElem.requestFullscreen){
				this.mediaElem.exitFullscreen();
				return false;
			}else{
				this.mediaElem.requestFullscreen();
				return true;
			}
		},
		//播放时间
		durationTime:function(){
			if(this.mediaElem.readyState!=4){
				alert("视频尚未加载完成，无法获得播放时间");
				return 0;
			}
			if(arguments.length>0){
				this.mediaElem.duration=arguments[0];
			}
			return this.mediaElem.duration;
		},
		//当前时间
		currentTime:function(){
			if(this.mediaElem.readyState!=4){
				alert("视频尚未加载完成，无法获得当前时间");
				return 0;
			}
			if(arguments.length>0){
				this.mediaElem.currentTime=arguments[0];
			}
			return this.mediaElem.currentTime;
		},
		//音量，值为0.0到1.0
		volume:function(){
			if(arguments.length>0){
				this.mediaElem.volume=arguments[0];
			}
			return this.mediaElem.volume;
		},
		//音量值大小
		volumeLvl:function(){
			var volnumber=this.mediaElem.volume;
			if(volnumber==0){
				return 0;
			}else if(volnumber>0 && volnumber<0.3){
				return 1;
			}else if(volnumber>0.3 && volnumber<0.6){
				return 2;
			}else if(volnumber>0.6 && volnumber<0.9){
				return 3;
			}else{
				return 4;
			}
		},
		//设置播放速度，默认为1.0秒
		rate:function(){
			if(arguments){
				this.mediaElem.defaultPlaybackRate=arguments[0];
			}
			return this.mediaElem.defaultPlaybackRate;
		},
		
		//是否支持此视频
		isSupport:function(mediaPostfix){
			var maybeMedia="";
			var probablyMedia="";
			switch(mediaPostfix){
				//音频
				case "aac":maybeMedia="audio/mp4",probablyMedia="audio/mp4; codecs=\"mp4a.40.2\"";break;
				case "mp3":maybeMedia="audio/mpeg",probablyMedia="audio/mpeg";break;
				case "vorbis":maybeMedia="audio/ogg",probablyMedia="audio/ogg; codecs=\"vorbis\"";break;//后缀通常为ogg
				case "wav":maybeMedia="audio/wav",probablyMedia="audio/wav; codecs=\"1\"";break;
				//视频
				case "h.264":maybeMedia="video/mp4",probablyMedia="video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"";break;//后缀通常为mpg4、mp4、mov
				case "theora":maybeMedia="video/ogg",probablyMedia="video/ogg; codecs=\"theora\"";break;//后缀通常为ogg
				case "webm":maybeMedia="video/webm",probablyMedia="video/webm; codecs=\"vp8, vorbis\"";break;//后缀通常为webm
			}
			if(maybeMedia!="" && probablyMedia!="" && (player.canPlayType(maybeMedia) || player.canPlayType(probablyMedia))){
				return true;
			}
			return false;
		},
		
		/*
		*事件
		*/
		//因为没有数据不能播放，readyState值为0
		dataunavailable:function(fun){
			EventUtil.addHandler(this.mediaElem,"dataunavailable",fun);
		},
		//当前帧已下载完成，readyState值为1
		canshowcurrentframe:function(fun){
			EventUtil.addHandler(this.mediaElem,"canshowcurrentframe",fun);
		},
		//可以播放时，readyState值为2
		canplay:function(fun){
			EventUtil.addHandler(this.mediaElem,"canplay",fun);
		},
		//播放可继续，而且应该不会中断，readyState值为3
		canplaythrough:function(fun){
			EventUtil.addHandler(this.mediaElem,"canplaythrough",fun);
		},
		//所有媒体已加载完成，load有可能会被废弃，建议使用canplaythrough
		load:function(fun){
			EventUtil.addHandler(this.mediaElem,"load",fun);
		},
		//媒体的第一帧已加载完成
		loadeddata:function(fun){
			EventUtil.addHandler(this.mediaElem,"loadeddata",fun);
		},
		//媒体的元数据已加载完成
		loadedmetadata:function(fun){
			EventUtil.addHandler(this.mediaElem,"loadedmetadata",fun);
		},
		//下载已开始
		loadstart:function(fun){
			EventUtil.addHandler(this.mediaElem,"loadstart",fun);
		},
		//正在下载
		progress:function(fun){
			EventUtil.addHandler(this.mediaElem,"progress",fun);
		},
		//下载中断
		abort:function(fun){
			EventUtil.addHandler(this.mediaElem,"abort",fun);
		},
		//浏览器尝试下载，但未接收到数据
		stalled:function(fun){
			EventUtil.addHandler(this.mediaElem,"stalled",fun);
		},
		//下载发生网络错误
		error:function(fun){
			EventUtil.addHandler(this.mediaElem,"error",fun);
		},
		//网络连接关闭
		emptied:function(fun){
			EventUtil.addHandler(this.mediaElem,"emptied",fun);
		},
		//发生错误阻止了媒体下载
		empty:function(fun){
			EventUtil.addHandler(this.mediaElem,"empty",fun);
		},
		//准备播放
		play:function(fun){
			EventUtil.addHandler(this.mediaElem,"play",fun);
		},
		//正在播放
		playing:function(fun){
			EventUtil.addHandler(this.mediaElem,"playing",fun);
		},
		//当前时间被不合理或意外的方式更新
		timeupdate:function(fun){
			EventUtil.addHandler(this.mediaElem,"timeupdate",fun);
		},
		//暂停
		pause:function(fun){
			EventUtil.addHandler(this.mediaElem,"pause",fun);
		},
		//播放暂停，等待下载更多数据
		waiting:function(fun){
			EventUtil.addHandler(this.mediaElem,"pause",fun);
		},
		//媒体已播放至末尾，播放停止
		ended:function(fun){
			EventUtil.addHandler(this.mediaElem,"ended",fun);
		},
		//更改音量事件
		volumechange:function(fun){
			EventUtil.addHandler(this.mediaElem,"volumechange",fun);
		},
		//更改播放速度事件
		ratechange:function(fun){
			EventUtil.addHandler(this.mediaElem,"ratechange",fun);
		},
		//搜索结束
		seeked:function(fun){
			EventUtil.addHandler(this.mediaElem,"seeked",fun);
		},
		//正在移动到新位置
		seeking:function(fun){
			EventUtil.addHandler(this.mediaElem,"seeking",fun);
		},
	}
	Media.fn.init.prototype=Media.fn;
	
	//使用方法
	/*Media('id').method();*/
	
	
/**
 * 天气控件
 */
	var weatherIcons={
		"qing" : "weather-icon-qing",
		"duoyun" : "weather-icon-duoyun",
		"zhenyu" : "weather-icon-zhenyu",
		"leizhenyu" : "weather-icon-leizhenyu",
		"leizhenyubanyoubingbao" : "weather-icon-leizhenyubanyoubingbao",
		"yujiaxue" : "weather-icon-yujiaxue",
		"xiaoyu" : "weather-icon-xiaoyu",
		"zhongyu" : "weather-icon-zhongyu",
		"dayu" : "weather-icon-dayu",
		"baoyu" : "weather-icon-baoyu",
		"dabaoyu" : "weather-icon-dabaoyu",
		"tedabaoyu" : "weather-icon-tedabaoyu",
		"zhenxue" : "weather-icon-zhenxue",
		"xiaoxue" : "weather-icon-xiaoxue",
		"zhongxue" : "weather-icon-zhongxue",
		"daxue" : "weather-icon-daxue",
		"baoxue" : "weather-icon-baoxue",
		"wu" : "weather-icon-wu",
		"dongyu" : "weather-icon-dongyu",
		"shachenbao" : "weather-icon-shachenbao",
		"xiaoyuzhuanzhongyu" : "weather-icon-xiaoyuzhuanzhongyu",
		"zhongyuzhuandayu" : "weather-icon-zhongyuzhuandayu",
		"dayuzhuanbaoyu" : "weather-icon-dayuzhuanbaoyu",
		"baoyuzhuandabaoyu" : "weather-icon-baoyuzhuandabaoyu",
		"dabaoyuzhuantedabaoyu" : "weather-icon-dabaoyuzhuantedabaoyu",
		"xiaoxuezhuanzhongxue" : "weather-icon-xiaoxuezhuanzhongxue",
		"zhongxuezhuandaxue" : "weather-icon-zhongxuezhuandaxue",
		"daxuezhuanbaoxue" : "weather-icon-daxuezhuanbaoxue",
		"fuchen" : "weather-icon-fuchen",
		"yangsha" : "weather-icon-yangsha",
		"qiangshachenbao" : "weather-icon-qiangshachenbao",
		"mai" : "weather-icon-mai",
		"yin" : "weather-icon-yin"
	},
	
	Weather=function(selector){
		return new Weather.fn.init(selector);
	};
	Weather.fn=Weather.prototype={
		construct:Weather,
		init:function(selector){
			this.weatherElem=queryDomElem(selector);
			return this;
		},
		reWeatherIcon:function(weatherImg){
			var weatherImgName = weatherImg.substring(weatherImg.lastIndexOf('/')+1, weatherImg.lastIndexOf('.'));
			var weatherIconClass='weather-icon-qing';
			weatherIconClass=weatherIcons[weatherImgName];
			return weatherIconClass;
		},
		airqualityLvl:function(pm25){
			airquality="";
			if(pm25<=50){
				airquality="优";
			}else if(pm25>50 && pm25<=100){
				airquality="良";
			}else if(pm25>100 && pm25<=150){
				airquality="轻度污染";
			}else if(pm25>150 && pm25<=200){
				airquality="中度污染";
			}else if(pm25>200 && pm25<=300){
				airquality="重度污染";
			}else{
				airquality="严重污染";
			}
			return airquality;
		},
		showWeather:function(argCity,argExpire){
			var weatherExpire=argExpire||"today";
			var that=this;
			//如果本地数据库已存在，并且没有过期，就不再读取baidu天气api
			/*if(DB.get("weatherJson") && DB.get("weatherJson_expires")>DateUtil.format(DateUtil.today())){
				console.log("正在读取缓存天气，缓存于"+DB.get("weatherJson_expires")+"过期");
				this.showWeatherHandler(JSON.parse(DB.get("weatherJson")));
				return;
			}*/
			$.ajax({
				url: 'http://api.map.baidu.com/telematics/v3/weather?location='+argCity+'&output=json&ak=W79uNeeyw7QXp6FGUzR6r8lY',
				type: 'GET',
				dataType: 'jsonp',
				success: function(json) {
					if (!json) {
						alert("你填写的现居地有误 ");
						return;
					}
					console.log("正在读取服务器天气..");
					//存储到本地数据库，并定义时效
					/*console.log("正在定义缓存时效，时效截止于"+DateUtil.format(DateUtil.expires(weatherExpire)));
					DB.set("weatherJson",JSON.stringify(json));
					DB.set("weatherJson_expires",DateUtil.format(DateUtil.expires(weatherExpire)));*/
					that.showWeatherHandler(json);
				}
			});
		},
		showWeatherHandler:function(json){
			var temperatureExpr=/(-)?\d*℃/;
			var weekExpr=/(周|星期|礼拜)[1-7一二三四五六七天日]/;
			if (json.status == 'success') {
					//获得当前城市
					$(".weather-current-city",this.weatherElem).html(json.results[0].currentCity);
					//获得当前日期
					$("#weather-current-date",this.weatherElem).html(json.date);
					var today=json.results[0].weather_data[0].date;
					temperatureMatch=temperatureExpr.exec(today);
					weekMatch=weekExpr.exec(today);
					//获得当前温度
					$("#weather-current-temperature",this.weatherElem).html(temperatureMatch[0]);
					//获得当天温度
					$("#weather-today-temperature",this.weatherElem).html(json.results[0].weather_data[0].temperature);
					var pm25=json.results[0].pm25;
					var airquality=this.airqualityLvl(pm25);
					//获得当前空气pm2.5
					$(".weather-current-pm25",this.weatherElem).html(pm25);
					//获得当前空气质量
					$(".weather-air-quality",this.weatherElem).html(airquality);
					//获得当前天气图标
					$("#weather-current-icon",this.weatherElem).attr("class",this.reWeatherIcon(json.results[0].weather_data[0].dayPictureUrl));
					//获得当天天气名称
					$(".weather-name",this.weatherElem).html(json.results[0].weather_data[0].weather);
					//获得当天风向与级数
					$("#weather-current-wind").html(json.results[0].weather_data[0].wind);
					for(var i=0;i<4;i++){
						if (6 < DateUtil.hour() < 18) {
							$(".weather-otherday i",this.weatherElem).eq(i).attr("class",this.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
						}else{
							$(".weather-otherday i",this.weatherElem).eq(i).attr("class",this.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
						}
						$(".weather-otherday p",this.weatherElem).eq(i).html(json.results[0].weather_data[i].temperature);
						$(".weather-otherday small",this.weatherElem).eq(i).html(json.results[0].weather_data[i].date);
						/*$(this.weatherElem).append("天气:" + json.results[0].weather_data[i].weather+"    ");
						$(this.weatherElem).append("风向:" + json.results[0].weather_data[i].wind+"    ");*/
					}
					$(".weather-otherday small",this.weatherElem).eq(0).html(weekMatch[0]);
				}else{
					alert("天气获取失败,请刷新后重试");
				}
			},
	};
	Weather.fn.init.prototype=Weather.fn;
	//使用方法
	/*Weather('id').showWeather('城市名');*/
	
	/**
	 * chart控件
	 */
	 	
		var Charts=function(selector){
			return new Charts.fn.init(selector);	
		}
		Charts.fn=Charts.prototype={
			init:function(selector){
				this.elem=queryDomElem(selector);
				return this;
			},
			setGaugeOption:function(option){
				var percent=eval(option.currentValue/option.maxValue);//当前比例
				var execDuration=new Number(percent*2).toFixed(1);//执行时间长度
				var bgLvl=eval(percent.toFixed(1)*10)+1;//背景等级
				if(bgLvl>=11){
					bgLvl=10;
				}
				var gauge=this.elem;
				var gaugePoint=this.elem.querySelector(".gauge-pointer");
				var gaugeText=this.elem.querySelector(".gauge-text");
				
				//设置指针
				var pointRotate=eval(270*percent);
				if(pointRotate>=270){
					pointRotate=270;
				}
				gaugePoint.setAttribute("style","-webkit-transform:rotate("+pointRotate+"deg);-webkit-transition:all "+execDuration+"s");
				//设置数字
				gaugeText.innerHTML=option.currentValue;
				//设置背景
				gauge.setAttribute("class","gauge-box water_box bg"+bgLvl);
				gauge.setAttribute("style","-webkit-animation-duration:"+execDuration+"s;animation-duration:"+execDuration+"s;");
			}
		}
		Charts.fn.init.prototype=Charts.fn;

/**
 * 设备能力控件
 */
	var Phone=function(selector){
		return new Phone.fn.init(selector);
	}
	Phone.fn=Phone.prototype={
		constructor:Phone,
		init:function(selector){
			this.selector=selector;
			this.elem=queryDomElem(selector);
			return this;
		},
		swipe:function(opts){
			var xDown,yDown,xUp,yUp,xRange=0,yRange=0,orientation=opts.orientation||"left",elem=opts.elem,fun=opts.fun;//执行方法

			EventUtil.addHandler(elem,"touchstart",function(evt){
				xDown = evt.touches[0].clientX;
				yDown=evt.touches[0].clientY;
			});
			EventUtil.addHandler(elem,'touchmove',function(evt){
				if(!xDown||!yDown){
					return;
				}
				xUp=evt.touches[0].clientX;
				yUp=evt.touches[0].clientY;
				//console.log("xDown:"+xDown+";yDown:"+yDown+";xUp:"+xUp+";yUp:"+yUp);
				var xDiff=xDown-xUp;
				var yDiff=yDown-yUp;
				if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
					if (xDiff>xRange && opts.orientation=="left") {
						if(fun)fun(evt);
						return "left";
					} else if(xDiff<parseInt('-'+xRange) && orientation=="right"){
						if(fun)fun(evt);
						return "right";
					}
				} else {
					if(yDiff>parseInt(yRange) && orientation=="up") {
						if(fun)fun(evt);
						return "up";
					}else if(yDiff<parseInt('-'+yRange) && orientation=="down"){
						if(fun)fun(evt);
						return "down";
					}
				}
				xDown = null;
				yDown = null;
			});
		},
		swipeToUp:function(fun){
			var opts={orientation:"up",fun:fun,elem:this.elem};
			this.swipe(opts);
		},
		swipeToDown:function(fun){
			var opts={orientation:"down",fun:fun,elem:this.elem};
			this.swipe(opts);
		},
		swipeToLeft:function(fun){
			var opts={orientation:"left",fun:fun,elem:this.elem};
			this.swipe(opts);	
		},
		swipeToRight:function(fun){
			var opts={orientation:"right",fun:fun,elem:this.elem};
			this.swipe(opts);
		},
	}
	Phone.extend = Phone.fn.extend = function() {
		//定义一些参数
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		//判断是否深拷贝
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// 跳过布尔和目标
			i = 2;
		}
		//判断目标参数是否正确
		if ( typeof target !== "object" && typeof target !== "function") {
			target = {};
		}
		//判断是否插件的情况
		if ( length === i ) {
			target = this;
			--i;
		}
		//可能是多个对象的情况
		for ( ; i < length; i++ ) {
			if ( (options = arguments[ i ]) != null ) {
				//扩展目标参数
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					//防止自身赋值于自身，无休止的循环
					if ( target === copy ) {
						continue;
					}
					//深拷贝
					if ( deep && copy && ( Object.prototype.toString.call(copy)==='[object Object]' || (copyIsArray=copy instanceof Array) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && src instanceof Array? src : [];
						} else {
							clone = src && Object.prototype.toString.call(src)==='[object Object]' ? src : {};
						}
						target[ name ] = Phone.extend( deep, clone, copy );
					//浅拷贝
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		// 返回修改后的对象
		return target;
	};
	Phone.extend({
		speed:200,
		maskcount:0,
		hasPop:false,
		currentId:{},
		animate:{
			opacity:"1"
		},
		animateCancel:{
			opacity:"0"
		},
		animateCancel:{
			opacity:"0"
		},
		middleAnimate:{
			opacity:"1"
		},
		middleAnimateCancel:{
			opacity:"0"
		},
		topAnimate:{
			opacity:"1",
			top:"0"
		},
		topAnimateCancel:{
			opacity:"0",
			top:"-100%"
		},
		bottomAnimate:{
			opacity:"1",
			bottom:"0"
		},
		bottomAnimateCancel:{
			opacity:"0",
			bottom:"-100%"
		},
		toastAnimate:{
			opacity:"1",
			bottom:"50px"
		},
		toastAnimateCancel:{
			opacity:"0"
		},
		showPop:function(){
		},
		showPopup:function(id,easing){
			//如果是toast，则允许弹出
			if(easing=="toast"){
				$("#_popup_toast_").css({"display":"-webkit-box"}).animate({opacity:"1",bottom:"50px"},200,function(){
					setTimeout(function(){
						$("#_popup_toast_").animate({opacity:"0"},200,function(){
							$("#_popup_toast_").css({"display":"none","bottom":"-100%"})
						});
					},1000);
				});
				return;
			}
			//如果已经有弹出框了，则先隐藏些弹出框
			if(this.hasPop==true){
				//如果弹出的对象相同，则不处理
				if(typeof id==="object" && typeof this.currentId==="object" && $(id).children().attr("id")===$(this.currentId).children().attr("id")){
					return;
				}
				//如果已弹出和将要弹出的元素id相同，则不处理
				if(id===this.currentId){
					return;
				}
				this.maskcount++;
				Phone.hidePopup(this.currentId,this.easing);
			}
			
			this.currentId=id;
			switch(easing){
				case "middle":this.animate=this.middleAnimate,this.animateCancel=this.middleAnimateCancel;break;
				case "top":this.animate=this.topAnimate,this.animateCancel=this.topAnimateCancel;break;
				case "bottom":this.animate=this.bottomAnimate,this.animateCancel=this.bottomAnimateCancel;break;
				case "toast":this.animate=this.toastAnimate,this.animateCancel=this.toastAnimateCancel;break;
			}
			$(this.currentId).css({"display":"block"}).animate(this.animate,this.speed);
			
			$("#_popup_mask_").css({"display":"block"}).animate({opacity:".4"},this.speed);
			//记录弹出框标识为false
			this.hasPop=true;
		},
		hidePopup:function(id,easing,handler,event){
			var hideId=id||this.currentId;
			var hideSpeed=this.speed;
			var hideAnimate=easing||this.animateCancel;
			var hideHandler=handler||null;
			console.log("hideId："+id+"，hideSpeed:"+hideSpeed+"，hideAnimate："+hideAnimate);
			if($(id).length>0){
				hideId=id;
			}
			if(easing){
				switch(easing){
					case "middle":hideAnimate=this.middleAnimateCancel;break;
					case "top":hideAnimate=this.topAnimateCancel;break;
					case "bottom":hideAnimate=this.bottomAnimateCancel;break;
					case "toast":hideAnimate=this.toastAnimateCancel;break;
				}
			}
			$(hideId).animate(hideAnimate,hideSpeed,function(){
				 $(this).css({"display":"none"})
				 if(hideHandler){
				 	hideHandler();
				 }
			});
			if(this.maskcount>0){
				this.maskcount--;
				return;
			}
			$("#_popup_mask_").animate({opacity:"0"},this.speed,function(){
				 $(this).css({"display":"none"})
			});
			
			//记录弹出框标识为false
			this.hasPop=false;
			console.log("hide hasPop:"+this.hasPop);
		},
		callback:function(fun,event){
			fun(event);
		},
		//系统弹出框
		alert:function(msg){
			//主体是否存在，不存在就生成一个，存在就赋予它一个信息值
			if($("#_popup_alert_").length<=0){
				$(document.body).append(
					'<div class="popup middle" id="_popup_alert_">'+
					'<div class="popup-title">提示</div>'+
						'<div class="popup-content">'+msg+'</div>'+
						'<div class="popup-handler"><a class="popup-handler-ok" onclick="Phone.hidePopup(\'#_popup_alert_\',\'middle\')">确定</a></div>'+
					'</div>'
				);
			}else{
				$("#_popup_alert_ .popup-content").html(msg);
			}
			//遮罩是否存在，不存在就生成一个，存在就置空click
			if($("#_popup_mask_").length<=0){
				$(document.body).append(
					'<div class="popup-mask" id="_popup_mask_"></div>'
				);
			}else{
				$("#_popup_mask_").attr("onclick","");
			}
			this.showPopup("#_popup_alert_","middle");
		},
		confirm:function(msg,okCallback,cancelCallback){
			//主体是否存在，不存在就生成一个，存在就赋予它一个信息值，并替换它的点击回调
			if($("#_popup_confirm_").length<=0){
				$(document.body).append(
					'<div class="popup middle" id="_popup_confirm_">'+
						'<div class="popup-title">询问</div>'+
						'<div class="popup-content">'+msg+'</div>'+
						'<div class="popup-handler">'+
							'<a class="popup-handler-cancel" onclick="Phone.callback('+cancelCallback.toString().replace(/"/g, "'")+',event)">取消</a>'+
							'<a class="popup-handler-ok" onclick="Phone.callback('+okCallback.toString().replace(/"/g, "'")+',event)">确定</a>'+
						'</div>'+
					'</div>'
				);
			}else{
				$("#_popup_confirm_ .popup-content").html(msg);
				$("#_popup_confirm_ .popup-handler-cancel").attr('onclick','Phone.callback('+cancelCallback.toString().replace(/"/g, "'")+',event)');
				$("#_popup_confirm_ .popup-handler-ok").attr('onclick','Phone.callback('+okCallback.toString().replace(/"/g, "'")+',event)');
			}
			//遮罩是否存在，不存在就生成一个，存在就置空click
			if($("#_popup_mask_").length<=0){
				$(document.body).append(
					'<div class="popup-mask" id="_popup_mask_"></div>'
				);
			}else{
				$("#_popup_mask_").attr("onclick","");
			}
			this.showPopup("#_popup_confirm_","middle");
		},
		actionsheet:function(sheetGroup){
			var sheetStr="";
			for(var i=0;i<sheetGroup.length;i++){
				sheetStr+='<button onclick="Phone.callback('+sheetGroup[i].handler.toString().replace(/"/g, "'")+',event)">'+sheetGroup[i].text+'</button>';
			}
			if($("#_popup_actionsheet_").length>0){
				$("#_popup_actionsheet_").remove();
			}
			$(document.body).append(
				'<div class="popup bottom" id="_popup_actionsheet_">'+
					'<div class="actionsheet">'+
						'<div class="actionsheet-group">'+
							sheetStr+
						'</div>'+
						'<button data-toggle="popup" onclick="Phone.hidePopup(\'#_popup_actionsheet_\',\'bottom\')">取消</button>'+
					'</div>'+
				'</div>'
			);
			//遮罩是否存在，不存在就生成一个，存在就添加click事件
			if($("#_popup_mask_").length<=0){
				$(document.body).append(
					'<div class="popup-mask" id="_popup_mask_" onclick="Phone.hidePopup()"></div>'
				);
			}else{
				$("#_popup_mask_").attr("onclick","Phone.hidePopup()");
			}
			this.showPopup("#_popup_actionsheet_","bottom");
		},
		toast:function(msg){
			//主体是否存在，不存在就生成一个，存在就赋予它一个信息值，并替换它的点击回调
			if($("#_popup_toast_").length<=0){
				$(document.body).append(
					'<div class="popup-toast-box" id="_popup_toast_">'+
						'<div class="popup-toast">'+msg+'</div>'+
					'</div>'
				);
			}else{
				$("#_popup_toast_ .popup-toast").html(msg);
			}
			this.showPopup("#_popup_toast_","toast");
		},
		//自定义弹出框
		/*dialog:function(id,pos){
			//主体是否存在，不存在就生成一个
			if(!$(id).parent().hasClass("popup")){
				$(id).wrap('<div class="popup '+pos+' dialog"></div>');
			}
			//遮罩是否存在，不存在就生成一个，存在就添加click事件
			if($("#_popup_mask_").length<=0){
				$(document.body).append(
					'<div class="popup-mask" id="_popup_mask_" onclick="Phone.hidePopup($(\''+id+'\').parent(),\''+pos+'\')"></div>'
				);
			}else{
				$("#_popup_mask_").attr('onclick','Phone.hidePopup($("'+id+'").parent(),"'+pos+'")');
			}
			this.showPopup($(id).parent(),pos);
		},*/
		versions:function () {
        	var u=navigator.userAgent,app=navigator.appVersion;
        	return {//移动终端浏览器版本信息
	            isTrident:u.indexOf('Trident') > -1, //IE内核
	            isPresto:u.indexOf('Presto') > -1, //opera内核
	            isWebKit:u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	            isGecko:u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	            isMobile:!!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
	            isAndroid:u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
	            isiPhone:u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
	            isiPad:u.indexOf('iPad') > -1, //是否iPad
	            isWebApp:u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
	            isIos:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),//ios终端
				isWeiXin:app.toLowerCase().indexOf("micromessenger") > -1,//判断是否是微信
				isUC:app.toLowerCase().indexOf("ucbrowser") > -1,//判断是否是UC
				isQQ:app.toLowerCase().indexOf("mqqbrowser") > -1,//判断是否是UC
	        };
	    }(),
	    language:(navigator.browserLanguage || navigator.language).toLowerCase()
	});
	Phone.fn.extend({
		dialog:function(pos){
			//主体是否存在，不存在就生成一个
			if(!$(this.selector).parent().hasClass("popup")){
				$(this.selector).wrap('<div class="popup '+pos+' dialog"></div>');
			}
			//遮罩是否存在，不存在就生成一个，存在就添加click事件
			if($("#_popup_mask_").length<=0){
				$(document.body).append(
					'<div class="popup-mask" id="_popup_mask_" onclick="Phone.hidePopup($(\''+this.selector+'\').parent(),\''+pos+'\')"></div>'
				);
			}else{
				$("#_popup_mask_").attr('onclick','Phone.hidePopup($(\''+this.selector+'\').parent(),"'+pos+'")');
			}
			$(this.selector).css({"display":"block"});
			Phone.showPopup($(this.selector).parent(),pos);
		}
	});
	Phone.fn.init.prototype=Phone.fn;
	//使用方法
	//Phone(element).swipeToDown(function(){do something...});
	
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Media=Media;//多媒体控件
		window.Weather=Weather;//天气控件
		window.Phone=Phone;//设备能力控件，滑动
		window.Charts=Charts;//chart控件
	}
})(window);

/**
* 扩展jquery原型方法
*/
$.fn.extend({
	//计数器
	countTo:function (options) {
		options = options || {};
		return $(this).each(function () {
			//设置当前元素的选项
			var settings = $.extend({}, {
				from: $(this).data('from')||0, //元素应该开始于
				to: $(this).data('to')||0, //元素的数目应该结束
				speed: $(this).data('speed')||1000,  //时长
				refreshInterval: $(this).data('refresh-interval')||100,  //如何经常更新元素
				decimals: $(this).data('decimals')||0,  //数字显示的小数位数
				formatter: formatter,  //在渲染前格式化的处理程序
				onUpdate: null, //每次更新元素的回调方法
				onComplete: null  //元素完成更新时的回调方法
			}, options);
			
			//更新多少次，以及如何在每次更新上增加值
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			//每一个更新的引用和变量
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			//首先明确如果一个现有的时间间隔可以被发现
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			//将元素初始化为起始值
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					//清除定时器
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
			
			function formatter(value, settings) {
				return value.toFixed(settings.decimals);
			}
		});
	},
	//动画执行一次后销毁
	animateOnce:function(anim){
		$(this).addClass(anim+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass(anim+' animated');
		});
	}
});