//多边形和标注
window.iconIndex = 6;
window.show = true;
function createIcon(positionX, positionY, sizeW, sizeH)
{
	var oIcon = new Object;
	oIcon.url = '../application/images/map/icon.gif';
	oIcon.positionX = positionX;
	oIcon.positionY = positionY;
	oIcon.sizeW = sizeW;
	oIcon.sizeH = sizeH;
	return oIcon;
	
}
window.iconMap = {};
var lineMap = {};
var icon6 = createIcon(0, -21, 19, 25);
var icon7 = createIcon(-23, -21, 19, 25);
var icon8 = createIcon(-46, -21, 19, 25);
var icon9 = createIcon(-69, -21, 19, 25);
var icon10 = createIcon(-92, -21, 19, 25);
var icon11 = createIcon(-115, -21, 19, 25);
var icon12 = createIcon(0, -46, 17, 21);
var icon13 = createIcon(-23, -46, 17, 21);
var icon14 = createIcon(-46, -46, 17, 21);
var icon15 = createIcon(-69, -46, 17, 21);
var icon16 = createIcon(-92, -46, 17, 21);
var icon17 = createIcon(-115, -46, 17, 21);
	           
var line6 = [{strokeColor:"#44A82F", strokeWeight:6, strokeOpacity:0.5}];
var line7 = [{strokeColor:"#3861C0", strokeWeight:6, strokeOpacity:0.5}];
var line8 = [{strokeColor:"#EE2C2C", strokeWeight:6, strokeOpacity:0.5}];
var line9 = [{strokeColor:"#E67F20", strokeWeight:6, strokeOpacity:0.5}];
var line10 = [{strokeColor:"#C872EE", strokeWeight:6, strokeOpacity:0.5}];
var line11 = [{strokeColor:"#FFACBE", strokeWeight:6, strokeOpacity:0.5}];
			   
iconMap[6] = icon6;
iconMap[7] = icon7;
iconMap[8] = icon8;
iconMap[9] = icon9;
iconMap[10] = icon10;
iconMap[11] = icon11;
iconMap[12] = icon12;
iconMap[13] = icon13;
iconMap[14] = icon14;
iconMap[15] = icon15;
iconMap[16] = icon16;
iconMap[17] = icon17;
	           
lineMap[6] = line6;
lineMap[7] = line7;
lineMap[8] = line8;
lineMap[9] = line9;
lineMap[10] = line10;
lineMap[11] = line11;
			   
var Mapper = {
	linePath : [],
	firstMarker: null,	// marker
	line: null,			// polyline
		    		
  	polygon: null,
    		
  	  		
  	clearDrawingState: function()
  	{
  		map.removeOverlay(Mapper.line);
  		//map.removeOverlay(Mapper.firstMarker);
  		Mapper.linePath = [];
  		//Mapper.firstMarker = null;
  	},
		    			
  	drawLine: function()
  	{
  		if(Mapper.line)
  		{
  			map.removeOverlay(Mapper.line);
  		}
		    			
  		if(Mapper.linePath.length > 1)
  		{
  			Mapper.line = new BMap.Polyline(Mapper.linePath, lineMap[iconIndex][0]);
  			map.addOverlay(Mapper.line);
  		}
  	},
		    			
  	createFirstMarker: function(pt)
  	{
  		if(Mapper.firstMarker == null)
  		{
  			var mk = new BMap.Marker(pt);
			var oIcon = iconMap[iconIndex];
			var mkIcon = new BMap.Icon(oIcon.url, new BMap.Size(oIcon.sizeW,oIcon.sizeH));
			mkIcon.setImageOffset(new BMap.Size(oIcon.positionX, oIcon.positionY));
			mk.setIcon(mkIcon);
			
			mk.addEventListener("click", Mapper.tryFinishPolygon);
		    				
			map.addOverlay(mk);
			Mapper.firstMarker = mk;
						
			var label = new BMap.Label("<a id ='hrefUserTrack' href='#' title='删除' onclick='removePolygon();'><img id='closeBtn' src='../application/images/icon/tbl_del.gif' style='border:0px solid red'/></a>");
            	label.setOffset(new BMap.Size(-10,-15));
				Mapper.firstMarker.setLabel(label);
			if(show)
			{
				var label = new BMap.Label("<a id ='hrefUserTrack1' href='#' title='保存' onclick='savePolygon();'><img id='closeBtn' src='../application/images/icon/yes.png' style='border:0px solid red'/></a>");
            	label.setOffset(new BMap.Size(7,-15));
				Mapper.firstMarker.setLabel(label);
			}
		}
  	},
		    		
  	tryFinishPolygon: function(e)
  	{
  		if(Mapper.linePath.length > 2)
  		{
  			var pg = new BMap.Polygon(Mapper.linePath, lineMap[iconIndex][0]);
  			
  			Mapper.clearDrawingState();
  			map.addOverlay(pg);
  			Mapper.polygon = pg;
  		    //点击进行编辑
		    Mapper.polygon.addEventListener("click", function(){
		    	pg.enableEditing();
				
		    });
		    Mapper.polygon.addEventListener("mouseout", function(){
   		    	pg.disableEditing();
				   		    	
   		    }); 		    
  			map.removeListener('click', Mapper.onDrawLineClick);
  		}
  	},
		    	
  	onDrawLineClick: function(e)
  	{
  		if(e.overlay != null)
  		{
  			fhdebug("not on map, ", e);
  			if(e.overlay.toString() == "[object Marker]")
  			{
  				return;
  			}
  		}		
  		var pt = e.point;
  		Mapper.createFirstMarker(pt);
  		Mapper.linePath.push(pt);
  		Mapper.drawLine();
  	},
		  		
}