
/*
*	兼容html5 的 Exmobi js
*/
var o=1;//双击关闭，计数器
var decode;//扫码控件
var camerawindow;//拍照控件
var imageChoice;//照片选择控件
var gpsPosition;//gps定位
var $exmobi={
	os:function(){
		var osname=DeviceUtil.getOs().toLowerCase();
		return DeviceUtil.getOs().toLowerCase();
	},
	showProgress : function(cb){
		progressbar = progressbar||new ProgressBar();
		progressbar.setMessage("加载中");
    	progressbar.show();
		cb&&cb();
	},
	hideProgress : function(cb){
		progressbar&&progressbar.cancel();
		cb&&cb();
	},
	alert : function(str, cb){
		ExMobiWindow.alert(str, function(){
			cb&&cb();
		});
	},
	confirm : function(str, okcb, cancelcb){
		ExMobiWindow.confirm(str, function(){
			okcb&&okcb();
		},function(){
			cancelcb&&cancelcb();
		});
	},
	open:function(hash, isBlank){
		ExMobiWindow.open(hash, isBlank);
	},
	close:function(){
		ExMobiWindow.close();
	},
	dbclose:function(){
		if(o==1){
			var toast = new Toast();
			toast.setText("再按一次退出应用");
			toast.show();
		}
		else if(o==2){
			ExMobiWindow.close();
		}
		o++;
		setTimeout( function(){o=1} , 2000);
	},
	exit:function(mes){
		if(mes){
			ClientUtil.exit(mes);
			return;
		}
		ClientUtil.exitNoAsk();
	},
	dbexit:function(){
		if(o==1){
			var toast = new Toast();
			toast.setText("再按一次退出应用");
			toast.show();
		}
		else if(o==2){
			ClientUtil.exitNoAsk();
		}
		i++;
		setTimeout( function(){o=1} , 2000);
	},
	qrcode:function(){
		decode = new Decode();
		decode.onCallback = deCodeCallback;//设置解码结束回调函数
    	decode.startDecode();//开始解码
	},
	camera:function(){
		camerawindow = new CameraWindow();
		camerawindow.pwidth=600;
		camerawindow.onCallback=cameraCallback;
		camerawindow.startCamera();
	},
	imageChoice:function(pwidth,nums){
		var folder=new File("res:image/filechoice",true);
		imageChoice=new ImageChoice();
		imageChoice.pwidth=600;
		imageChoice.nums=1;
		if(pwidth){
			imageChoice.pwidth=pwidth;
		}
		if(nums){
			imageChoice.nums=nums;
		}
		imageChoice.onCallback=imageChoiceCallback;
		if(!folder.exists()){
			folder.mkdirs();
		}
		imageChoice.path = "res:image/filechoice";
		imageChoice.start();
	},
	gps:function(){
		var gpsLocation;
		if($exmobi.os()=="android"){
			gpsLocation=new BaiduLocation();
		}else{
			gpsLocation=new Gps();
		}
		gpsLocation.setTimeout(5000);
	    gpsLocation.onCallback =function(){
	    	if(!gpsLocation.isSuccess()){//返回定位是否成功
		       alert(gpsLocation.objName+"定位失败")//定位失败
		       gpsLocation.stopPosition()//停止定位
		       return;
		    }
		    var latitude = gpsLocation.latitude;//获得纬度
		    var longitude = gpsLocation.longitude;//获得经度
		    var locationtime = gpsLocation.locationtime;//定位成功时间
		    var accuracy = gpsLocation.accuracy;//获取定位精度
		    //alert("latitude:"+latitude+";longitude:"+longitude+";locationtime:"+locationtime+";accuracy:"+accuracy);
		    
		    //构建location对象
		    gpsPosition=new Location(); 
		    //设置回调函数
		    gpsPosition.onCallback=gpsCallback; 
		    //设置超时时间 
		    gpsPosition.setTimeout(5000);
		    gpsPosition.startGetLocationInfo(latitude,longitude);//通过纬度，经度获取位置信息
	    };
	    gpsLocation.startPosition();
	},
	tel:function(phonenumber){
		if(phonenumber){
			PhoneUtil.tel(phonenumber);
			return;
		}
		PhoneUtil.tel();
		return;
	},
	sms:function(phonenumber,content,isOpenSys){
		if(isOpenSys==true){
			if(phonenumber && content){
				SmsUtil.openSystemSms(phonenumber,content);
				return;
			}
			if(phonenumber){
				SmsUtil.openSystemSms(phonenumber);
				return;
			}
		}
		if(phonenumber && content){
			SmsUtil.sendSms(phonenumber,content);//发送短信
			return;
		}
		SmsUtil.openSystemSms();//调用打开系统短信界面
	},
	back:function(){
		history.go(-1);
	},
	openWebview:function(hash, isBlank, transition){
		var blank=isBlank||true;
		var url="res:page/www/"+hash;
		var fileName=url.substr(eval(url.lastIndexOf("/")+1));
		var fileId=fileName.split(".")[0];
		
		var strHtml='<html isbridge="true">\n'+
						'<head>\n'+
							'<title show="false">Agile Lite</title>\n'+
							'<script></script>\n'+
						'</head>\n'+
						'<body style="padding:0px;margin:0px;">\n'+
							'<webview id="browser" url="'+url.replace(/\&/g,'&amp;')+'" backmonitor="false"></webview>\n'+
						'</body>\n'+
					'</html>\n';
		ExMobiWindow.openData(strHtml, blank, false, '','');
	}
}