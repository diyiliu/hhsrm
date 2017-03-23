/*
 * desc:百度地图API实现层
 * author:于宏洲
 * date:2013-05-22
 */
(function(){

	
    var mapKey = "8830f84901336e9afd2c6d7033d2ebe5";
    var mapUrl = "http://api.map.baidu.com/api?v=2.0&ak=" + mapKey;
    
//    var debugUrl = getBasePath() + "/common/js/gis/debug/baidu_debug.js";
    
    if(!window.LoadJS){
        window.LoadJS = function(url, call){
            var doc = document.createElement("script");
            doc.type= "text/javascript";
            doc.src = url;
            
            doc.onload = doc.onreadystatechange = call;
            document.getElementsByTagName("head")[0].appendChild(doc);
        }
        
    }
    window.loadJS = function(src) {
        document.write('<' + 'script src="' + src + '"' + ' type="text/javascript"><' + '/script>');
    };
    
    loadJS(mapUrl);
//    loadJS(debugUrl);
    
    /**
     * 定义公共函数，非空默认取值
     */
    if(!window.nvl){
        window.nvl = function()
        {
            return arguments[0] == null ? arguments[1] : arguments[0];
        };
    }
    
    /**
     * 定义公共函数，判断对象是否为空
     */
    if(!window.isNull)
    {
        window.isNull = function(obj)
        {
            if(obj == null || typeof(obj) == 'undefined' || obj == '')
            {
                return true;
            } else
            {
                return false;
            }
        };
    }
    
    if(!window.isNotNull)
    {
        window.isNotNull = function(obj)
        {
            return !isNull(obj);
        };
    }
    /* String 对象转换为JSON对象 */
    window.s2j = function(strObj)
    {
       if(strObj instanceof Object)
       {
           return strObj;
       }
       try{
           return eval('(' + strObj + ')');
       }catch(e){
           return strObj;
       }
    };
    /* 检查经纬度合法性 */
    window.checkLonlat = function(point)
    {
       var lat = point.lat;
       var lon = point.lon;
       try
       {
           if(isNull(lon) || isNull(lat))
           {
               return false;
           } else if(parseFloat(lat) == 0 || parseFloat(lat) > 180)
           {
               return false;
           } else if(parseFloat(lon) == 0 || parseFloat(lon) > 180)
           {
               return false;
           }
           return true;
       } catch(e)
       {
           return false;
       }
    };
    
    /**
     * 将数组中的公共接口坐标，批量转换为地图坐标
     */
    window.conver = function(lonlats)
    {
        var iMPoints = new Array();
        if(lonlats != null && lonlats.length > 0)
        {
            var len = lonlats.length;
            for(var i = 0; i < len; i++)
            {
                iMPoints.push(lonlats[i].toMap());
            }
        }
        return iMPoints;
    };
    /**
     * 计算两点之间距离
     */
    window.distance = function(x1,y1,x2,y2)
    {
        //x = Math.cos(3 * Math.PI) + Math.sin(Math.LN10) y = Math.tan(14 * Math.E)
        var radY1 = y1 * Math.PI / 180;
        var radY2 = y2 * Math.PI / 180;
        var a = radY1 - radY2;
        var b = x1 * Math.PI / 180 - x2 * Math.PI / 180;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radY1) * Math.cos(radY2)
            * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378137.0;  // 取WGS84标准参考椭球中的地球长半径(单位:m)
        s = Math.round(s * 10000) / 10000;
        return s;
    };
    
    /**
     * 计算某一条覆盖线和12点钟方向直线之间的夹角
     */
    window.angs = function(x2,y2,x3,y3)
    {
        var a = distance(x2,y3,x2,y2);
        var b = distance(x2,y2,x3,y3);
        var c = distance(x2,y3,x3,y3);
        var cos = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
        var ang = Math.acos(cos) / Math.PI * 180;
        return ang;
    };
    
    window.angs360 = function(x2,y2,x3,y3)
    {
        var ang = angs(x2,y2,x3,y3);
        var ang360 = 0;
        if(x2 == x3)
        {
            if(y2 <= y3 )
            {
                ang360 = 0;
            } else
            {
                ang360 = 180;
            }
        } else if(x2 < x3)
        {
            if(y2 == y3)
            {
                ang360 = 90;
            } else if(y2 < y3)
            {
                ang360 = ang;
            } else
            {
                ang360 = 180 - ang;
            }
        }
        else
        {
            if(y2 == y3)
            {
                ang360 = 270;
            } else if(y2 < y3)
            {
                ang360 = 360 - ang;
            } else
            {
                ang360 = 180 + ang;
            }
        }
        //alert(ang360);
        return ang360;
    };
    /**
     * 将字符串坐标转换为标准坐标
     */
    window.s2pt = function(sLonlat)
    {
        var ll = sLonlat.split(",");
        return new IMPoint(ll[0], ll[1]);
    };
    /** 用这个类来表示经纬度， 以隔离GMap和mapabc的类耦合 */
	if(!window.FLatLng){
		window.FLatLng = function(lat, lng){this.latx = lat;this.lngy=lng;};
		window.FLatLng.prototype.lat = function(){
			return this.latx;
		};

		window.FLatLng.prototype.lng = function(){
			return this.lngy;
		};

		window.FLatLng.prototype.toString = function(){
			return this.latx + "," + this.lngy;
		};
	} 
	if(!window.FHashMap){
		window.FHashMap = function(){
			this.count = 0;
		};
		window.FHashMap.prototype.put = function(obj){
			var c = this.count++;
			this[c] = obj;
			return c;
		};
		
		window.FHashMap.prototype.putAt = function(obj, token){
            //var c = this.count++;
            this[token] = obj;
            return token;
        };
        
		window.FHashMap.prototype.get = function(i){
			return  this[i];
		};
		window.FHashMap.prototype.getAndRemove = function(i){
			var obj = this[i];
			delete this[i];
			return obj;
		};
		window.FHashMap.prototype.remove = function(i){
			delete this[i];
		}
	}
})();

(function(){
	
	/**
	 * 这里扩展FLatLng类，便于其跟图吧的MPoint之间 的相互转换。
	 * 
	 * @return
	 */
	window.FLatLng.prototype.toBMapPoint = function()
	{
		return new BMap.Point(this.lng(), this.lat());
	};

	window.FLatLng.fromMPoint = function(mptr)
	{
		if (typeof mptr == "string")
		{
			var ptr = cq.vp(mptr);
			return new FLatLng(ptr[1], ptr[0]);
		}
		return new FLatLng(mptr.lat, mptr.lng);
	};
    /* IMPoint to Map Point*/
    window.FLatLng.prototype.toMap = function()
    {
    	return new MLngLat(this.lon, this.lat);
    };
    
   /**
     * 定义标准接口坐标对象
     */
    if(!window.IMPoint)
    {
        window.IMPoint = function(lon,lat){this.lon = lon; this.lat = lat;};
        /* Longitude Jing du*/
        window.IMPoint.prototype.lon = function(){
            return this.lon;
        };
        /* Latitude Wei du*/
        window.IMPoint.prototype.lat = function(){
            return this.lat;
        };
        window.IMPoint.prototype.toString = function(){
            return this.lon + "," + this.lat;
        };
        
     }
    
    /**
     * 地图初始化接口
     */
	window.FMap = function(id, latlng, zoom,mapType){
		
        /* 初始化地图 */
        var defaultZoom    = zoom || 5;
        var defaultDiv     = id || 'mapObj';
        var hashmap = new FHashMap();
        if(window.mapLocation){
		    var flags = window.mapLocation.split(',');
    		latlng = nvl(latlng, new FLatLng(flags[0],flags[1]));
		}else{
    		latlng = nvl(latlng, new FLatLng(31.99527,118.73444));
		}

		var map = new BMap.Map(defaultDiv);
		map.enableScrollWheelZoom();
		map.centerAndZoom(latlng.toBMapPoint(),defaultZoom);
		var opts = {type: BMAP_NAVIGATION_CONTROL_LARGE};
		//添加放大控制
		var navigationC = new BMap.NavigationControl(opts);
		var scaleC = new BMap.ScaleControl();
		//添加小地图查看
		var overviewC = new BMap.OverviewMapControl();
		map.addControl(navigationC);
		map.addControl(scaleC);
		map.addControl(overviewC);
		var markBuf = {};
		// Mapbar Api依赖全局变量maplet
		window.maplet = map;
        this.ctrlbar = function(showBar,overView,scale)
        {
            if(showBar)
            {
                map.addControl(navigationC);
            } else
            {
                map.removeControl(navigationC);
            }
            if(overView)
            {
                 map.addControl(overviewC);
            } else
            {
                map.removeControl(overviewC);
            }
            if(scale)
            {
                 map.addControl(scaleC);
            } else
            {
                 map.removeControl(scaleC);
            }
        };
        
        this.setAutoZoom = function(){
    		var layouts = map.getOverlays();
    		var points = new Array();
    		for(var i=0;i<layouts.length;i++)
    		{   try{
        			var p = layouts[i].getPosition();
        			if(p != null && typeof p != 'undefined'){
        				points.push(p);
        			}
                }catch(e){
                
                }
    		}

			map.setViewport(points);
        };
        
        this.setViewport = function(points){
        	map.setViewport(points);
        };
        
        this.addPanel = function(div)
        {
        		map.getPanes().markerPane.appendChild(div);
        };
        
        this.mouseDistance = function()
        {
			alert('待实现');
        };
        
        this.to = function(lonlat)
        {
            map.centerAndZoom(lonlat.toBMapPoint(),defaultZoom);
        };
				
        this.moveTo = function(lon,lat)
        {
            this.to(new FLatLng(lon,lat));
        };
        
        /* 地图缩放到某一级别 */
        this.zoomTo = function(zoom)
        {
            map.setZoom(nvl(zoom,defaultZoom));
        };
          this.getZoom = function()
        {
        	
           return  map.getZoom();
        };
        /*在某一级别下 以某一中心点缩放地图 */
        this.zoom = function(lonlat,zoom)
        {
            map.centerAndZoom(lonlat.toBMapPoint(),zoom);
        };
        
        this.setZoomEnabled = function(isEnable)
        {
            map.setZoomEnabled(isEnable);
        };
        
        this.setZoomEnabled = function(isEnable)
        {
            alert('待实现');
        };
        
        /* 获取比例尺 */
        this.getScale = function()
        {
           alert('待实现');
        };
        
        /* 经纬度坐标转像素 */
        this.toPixel = function(lonlat)
        {
						var xy = map.pointToPixel(map.toBMapPoint(lonlat));
						return new IMPoint(xy.y,xy.x);
        };
        
        /* 像素转经纬度坐标 */
        this.toPoint = function(lonlat){
        	 var pix = new BMap.Pixel(lonlat.lon,lonlat.lat);
					 var ll = map.pointToPixel(pix);
					 return ll;
        };
        this.isGoogle = function(){
            return false;
        };
        
        this.mark = function(flatlng, html, cfg, tok, title, label){
        	// 数据初始化 兼容其他地图接口
        	if(cfg){
	        	flatlng=nvl(cfg.lonlat,flatlng);
	        	
	        	html=nvl(cfg.html,html);
	        	
	        	tok=nvl(cfg.tok,tok);
	        	
	        	title=nvl(cfg.title,title);
	        	
	        	label=nvl(cfg.label,label);
        	}
			var mTitle = (title == null || title == undefined)?"":title;
			if(label == null || label == undefined || label == ""){
			}else {
			   label = label;					   
			}
			cfg = (cfg == null? {} : cfg);
			var imagePath = cfg.path == null ? "marker.png" : cfg.path;
			var width = cfg.width == null ? 20 : cfg.width;
			var height = cfg.height == null ? 34 : cfg.height;
			var anchorX = cfg.anchorX == null ? 10 : cfg.anchorX;
			var anchorY = cfg.anchorY == null ? 34 : cfg.anchorY;
			var positionX = cfg.positionX == null ? 0 : cfg.positionX;
			var positionY = cfg.positionY == null ? 0 : cfg.positionY;
			var offset = new BMap.Size(width,height);
			var auchor = new BMap.Size(anchorX,anchorY);
			var imageOffset = new BMap.Size(positionX, positionY);
			var myIcon = new BMap.Icon(imagePath,offset);
			myIcon.setAnchor(auchor);
			myIcon.setImageOffset(imageOffset);
			var pt = new BMap.Point(flatlng.lng(), flatlng.lat());
			//map.centerAndZoom(pt,defaultZoom);
			var opts = {
				enableMessage:false
			}
			var infoWindow = new BMap.InfoWindow(html,opts);
			var marker1 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
			if(label == null || label == undefined || label==""){
				
			}else{
				var tempLabel = new BMap.Label(label);
				tempLabel.setOffset(new BMap.Size(16,20));
				marker1.setLabel(tempLabel);
        	}
			if(title == null || title == undefined){
				
			}else{
				marker1.setTitle(title);
			}
			
			map.addOverlay(marker1);
			if(html == null || html == '')
			{
			}else{
				marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow);});   
			}
            if(cfg.id)
            {
            	marker1.id = cfg.id;
            } else
            {
            	marker1.id = "m_" + Math.random();
            }
            marker1.text=label;
			return marker1;
        };
		
        this.simplePolygon = function(pts, html, cfg)
		{
		    var pg = new BMap.Polygon(pts, {strokeColor:cfg.strokeColor, strokeWeight:cfg.strokeWeight, strokeOpacity:cfg.storeOpacity});
        	if(null != html && '' != html)
        	{
        		var infoWindow = new BMap.InfoWindow(html,{enableMessage:false});
				pg.addEventListener("click", function(){map.openInfoWindow(infoWindow, pg.getBounds().getCenter());});  
										
        	}
			pg.id = cfg.id;
   		    map.addOverlay(pg);
			return pg;
		}
		
        this.polygon = function(pts, html, cfg)
        {
        	var pg = new BMap.Polygon(pts, {strokeColor:cfg.strokeColor, strokeWeight:cfg.strokeWeight, strokeOpacity:cfg.storeOpacity});
        	if(null != html && '' != html)
        	{
        		var infoWindow = new BMap.InfoWindow(html,{enableMessage:false});
				pg.addEventListener("click", function(){map.openInfoWindow(infoWindow, pg.getBounds().getCenter());});  
        	}
   		    
   		    pg.id = cfg.id;
   		    map.addOverlay(pg);
			//点击进行编辑
			pg.addEventListener("click", function(){
				pg.enableEditing();
				
				var mk = new BMap.Marker(pts[0]);
				var oIcon = iconMap[cfg.areaIcon];
				var mkIcon = new BMap.Icon(oIcon.url, new BMap.Size(oIcon.sizeW,oIcon.sizeH));
				mkIcon.setImageOffset(new BMap.Size(oIcon.positionX, oIcon.positionY));
				mk.setIcon(mkIcon);
				mk.id=cfg.markerId;
				map.addOverlay(mk);
				
				var label = new BMap.Label("<a id ='hrefUserTrack' href='#' title='删除' onclick='removePolygon1(\"" + cfg.id + "\",\"" + cfg.markerId +"\");'><img id='closeBtn' src='../application/images/icon/tbl_del.gif' style='border:0px solid red'/></a>");
				label.setOffset(new BMap.Size(-10,-15));
				mk.setLabel(label);
				var label = new BMap.Label("<a id ='hrefUserTrack1' href='#' title='保存' onclick='savePolygon1(\"" + cfg.id + "\",\"" + cfg.markerId +"\");'><img id='closeBtn' src='../application/images/icon/yes.png' style='border:0px solid red'/></a>");
				label.setOffset(new BMap.Size(7,-15));
				mk.setLabel(label);
				 				
			});
			pg.addEventListener("mouseout", function(){
				pg.disableEditing();
				   		    	
			}); 
   		    return pg;
        }
        
  		/* 获取经纬度坐标点 */
        this.getLatlng = function(latlng){
        	return latlng.eventY+","+latlng.eventX ;
        };
        
        
				this.moveMark   = function(obj, flatlng){

				};
				
				this.removeMark = function(obj)
				{
					var temp = this.getOverlayById(obj);
					if(temp){
						map.removeOverlay(temp);
					}else{
						map.removeOverlay(obj);
					}
				};
				
				this.getBounds = function(){
					var bounds = map.getBounds(); 
					var sw = bounds.getSouthWest();
					var ne = bounds.getNorthEast();
					var wn = new BMap.Point(sw.lng,ne.lat);
					var es = new BMap.Point(ne.lng,sw.lat);
					return [
					    FLatLng.fromMPoint(wn),
					    FLatLng.fromMPoint(ne),
					    FLatLng.fromMPoint(es),
					    FLatLng.fromMPoint(sw)
					];
				};
				
				this.ellipse = function(lonlat,width,height, cfg){
					var r = width;
					var cp = new BMap.Point(lonlat.lng(),lonlat.lat());
					var color = 'blue';
					var bgcolor = 'white';
					if(cfg)
					{
							color = nvl(cfg.color,color);
							bgcolor = nvl(cfg.bgcolor,bgcolor);
					}
					var circle = new BMap.Circle(cp,r);
					circle.setStrokeColor(color);
					circle.setFillColor(bgcolor);
					circle.setStrokeWeight(2);
	        map.addOverlay(circle);
	        return circle;
        }
        
        // 清空地图上的叠加层，包括了添加的所有的标注，绘制的线等。(注意：enableMassClear：true)
				this.clearOverlays = function()
				{
					map.clearOverlays();
				}
				
				var lpad = function(str)
				{
				    if(str == null)
				    {
				        return "00";
				    }
				    if(str.length < 2)
				    {
				        return "0" + str;
				    }
				    
				    return str;
				}
				
        var decodeRGBStr = function(str)
        {
            str += "";
            
            if(str == null)
            {
                return "#FF0000";
            }
            
            else if(str.toLowerCase().indexOf("rgb") >= 0)
            {
                str =  str.toLowerCase();
                var s = str.replace("rgb(", "").replace(")", "");
                s = s.split(",");
								var cstr = ["#", lpad(Number(s[0]).toString(16)), 
				                 lpad(Number(s[1]).toString(16)), 
				                 lpad(Number(s[2]).toString(16)) 
				            ].join("");
                return cstr.toUpperCase();
            }
            return str;
        }
        
		// 根据传入的坐标点，绘制一条折线，指定颜色的字符串格式是 #FFFFF 这种。
		this.addLine = function(flatlngs, rgbstr, opacity, weight, tok,title,content, cfg)
		{
			if(cfg){
        	title = nvl(title,cfg.title);
        	rgbstr = nvl(decodeRGBStr( rgbstr ),cfg.rgbstr);
        	opacity = nvl(title,cfg.opacity);
        	weight = nvl(title,cfg.weight);
        	tok = nvl(title,cfg.tok);
        	content = nvl(title,cfg.html);
			}
	      //线条颜色
	      var color =  decodeRGBStr( rgbstr );
	      var pts = [];
	      for(var i=0;i<flatlngs.length;i++)
	      {
	      	var temp = flatlngs[i];
	      	pts.push(flatlngs[i].toBMapPoint());
	      }
	      var polyline = new BMap.Polyline(pts);
	      polyline.setStrokeColor(color);
	      polyline.setStrokeOpacity(opacity);
	      polyline.setStrokeWeight(weight);
	      	//polyline.setTitle(title);
	      	//var infoWindow = new BMap.InfoWindow(content);
			if(content == null || content == '')
			{
			}else{
				//polyline.addEventListener("mouseover", function(){this.openInfoWindow(infoWindow);});   
			}
			map.addOverlay(polyline);
			return polyline;
		}
		window.wayArray = new Array();
		this.addArrow = function(polyline,length,angleValue,cfg)
		{
			var rgbstr="#EE2C2C";
			var opacity=1;
			var weight=3;
			if(cfg){
	        	rgbstr = nvl(cfg.rgbstr,rgbstr);
				}
		      //线条颜色
		    var color =  decodeRGBStr( rgbstr );
			var linePoint=polyline.getPath();//线的坐标串  
			var arrowCount=linePoint.length;  
			for(var i =1;i<arrowCount;i++){ //在拐点处绘制箭头  
				var pixelStart=map.pointToPixel(linePoint[i-1]);  
				var pixelEnd=map.pointToPixel(linePoint[i]);  
				var angle=angleValue;//箭头和主线的夹角  
				var r=length; // r/Math.sin(angle)代表箭头长度  
				var delta=0; //主线斜率，垂直时无斜率  
				var param=0; //代码简洁考虑  
				var pixelTemX,pixelTemY;//临时点坐标  
				var pixelX,pixelY,pixelX1,pixelY1;//箭头两个点  
				if(pixelEnd.x-pixelStart.x==0){ //斜率不存在是时  
				    pixelTemX=pixelEnd.x;  
				    if(pixelEnd.y>pixelStart.y)  
				    {  
				    pixelTemY=pixelEnd.y-r;  
				    }  
				    else  
				    {  
				    pixelTemY=pixelEnd.y+r;  
				    }     
				    //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
				    pixelX=pixelTemX-r*Math.tan(angle);   
				    pixelX1=pixelTemX+r*Math.tan(angle);  
				    pixelY=pixelY1=pixelTemY;  
				}  
				else  //斜率存在时  
				{  
				    delta=(pixelEnd.y-pixelStart.y)/(pixelEnd.x-pixelStart.x);  
				    param=Math.sqrt(delta*delta+1);  
				  
				    if((pixelEnd.x-pixelStart.x)<0) //第二、三象限  
				    {  
				    pixelTemX=pixelEnd.x+ r/param;  
				    pixelTemY=pixelEnd.y+delta*r/param;  
				    }  
				    else//第一、四象限  
				    {  
				    pixelTemX=pixelEnd.x- r/param;  
				    pixelTemY=pixelEnd.y-delta*r/param;  
				    }  
				    //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
				    pixelX=pixelTemX+ Math.tan(angle)*r*delta/param;  
				    pixelY=pixelTemY-Math.tan(angle)*r/param;  
				  
				    pixelX1=pixelTemX- Math.tan(angle)*r*delta/param;  
				    pixelY1=pixelTemY+Math.tan(angle)*r/param;  
				}  
			  
				var pointArrow=map.pixelToPoint(new BMap.Pixel(pixelX,pixelY));  
				var pointArrow1=map.pixelToPoint(new BMap.Pixel(pixelX1,pixelY1));  
				var Arrow = new BMap.Polyline([pointArrow,linePoint[i],pointArrow1], {strokeColor:color, strokeWeight:weight, strokeOpacity:opacity});  
				map.addOverlay(Arrow);  
				wayArray.push(Arrow);
			}  
		};
		 /* 清除绘制的箭头，以便重新绘制 */
        this.clearArrow = function()
        {
        	for(var i=0;i<wayArray.length;i++)
        	{
        		map.removeOverlay(wayArray[i]);
        	}
        };
        
		this.addClickListener = function(cb)
		{
				return map.addEventListener("click",function(e){
					var latlng = {};
					latlng.eventX = e.point.lng;
					latlng.eventY = e.point.lat;
					cb(latlng);
				});
		};
		
				// evn：mouseout，mouseover，click等
		this.addObjListener = function(obj,evn, callback,id)
		{
			  obj.addEventListener(evn,function(e)
			  {
				  callback(e,id);
			  });
		};
		
		this.addListener = function(evn,cb){
			map.addEventListener(evn,cb);
		}
		
		this.addEventListener = function(evn,cb){
			map.addEventListener(evn,cb);
		}
		this.addMarkMouseoverListener = function(obj, cb)
		{
			var mk = this.getOverlayById(obj);
			this.addObjListener(mk,"mouseover",cb,obj);
		};
		
		this.addMarkMouseoutListener = function(obj, cb)
		{
			var mk = this.getOverlayById(obj);
			this.addObjListener(mk,"mouseout",cb,obj);
		};
		
		this.getAllOverlays = function(){
			
			return map.getOverlays();
			

		};
		
		this.getOverlayById = function(id){
			
			var overlays = map.getOverlays();
			for(var i=0;i<overlays.length;i++){
				var temp = overlays[i];
				if(temp.id == id){
					return temp;
				}
			}
			return null;
			
		};
		
		
		this.removeObjListener = function(obj,lsnr,callback)
        {
            obj.removeEventListener(lsnr,callback);
        }
        
        this.removeListener = function(event,callback)
        {
            this.removeObjListener(map,event,callback);
        };
        
        this.removeLine = function(obj)
        {
        	map.removeOverlay(obj);
        };
        
        this.addOverlay = function(obj){
        	map.addOverlay(obj);
        }
        
        this.removeOverlay = function(obj){
        	map.removeOverlay(obj);
        };
        
        this.openInfoWindow = function(InfoWindow, Point)
		{
			map.openInfoWindow(InfoWindow, Point);
		}
		
		this.closeInfoWindow = function()
		{
		   map.closeInfoWindow();
		}
        
        /* 设置属性 */
        //  移动地图到指定的中点
		this.setClickToCenter = function(flag)
		{
			
		};
		
		this.resize = function(width,height)
		{
			//map.resize(width, height);
		};
		
		// 移除面
		this.removeOverlayMark = function(ellipse)
		{
			map.removeOverlay(ellipse);
		};
		
		this.setLabelVisiable = function(obj, isVisiable)
		{
			var mk = this.getOverlayById(obj);
			if(mk)
			{
				var test = mk.getLabel();
				if(isVisiable){
					if(test)
					{
						
					}else{
						var tempLabel = new BMap.Label(mk.text);
						tempLabel.setOffset(new BMap.Size(16,20));
						mk.setLabel(tempLabel);
						map.addOverlay(tempLabel);
					}
				}else{
					if(test){
						mk.setLabel("");
						map.removeOverlay(test);				
					}
				}
			}
		};
		
		this.getPath = function(obj)
		{
			var mk = this.getOverlayById(obj);
		    if(mk)
			{
		    	var url = mk.getIcon().imageUrl;
				return url;
			}
			return null;
		};
		
		
		this.updateImage = function(obj,imgpath,width,height,anchorX,anchorY){
			 
			 var width = width ;
			 var height = height;
			 var offset = new BMap.Size(width,height);
			 var myIcon = new BMap.Icon(imgpath,offset);
			 var anchorX = anchorX;
			 var anchorY = anchorY;
			 var auchor = new BMap.Size(anchorX,anchorY);
			 myIcon.setAnchor(auchor);
		 	 var mk = this.getOverlayById(obj);
		     if(mk  && imgpath)
			 {
				 mk.setIcon(myIcon);
			 }
		};
		
		window.maplet.toScreenCoordinate = function(latlon)
		{
			var tem = latlon.split(",");
			var point = new BMap.Point(tem[1],tem[0]);
			var pix = map.pointToOverlayPixel(point);
			var arr = {};
			arr[0]=pix.x;
			arr[1]=pix.y;
			return arr;
		}
        
	};
})();

