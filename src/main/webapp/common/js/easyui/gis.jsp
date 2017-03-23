<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ include file="/common/include/includejs.jsp" %>
<%@ page import="com.fiberhome.sss.locating.util.LocationUtil
,com.fiberhome.sss.locating.util.map.PositionInfo
,com.fiberhome.sss.locating.util.Constants;" %>
<%
    String lonlat = request.getParameter("flatlng");
    String lonlat0 = request.getParameter("flatlng0");
    lonlat =(lonlat == null? "31.99527,118.73444" : lonlat);
    
    if(lonlat0 == null) 
    {
        //lonlat0 = ParamManager.getSysParam(Constants.MAP_INIT_LOCATION,null);
        //lonlat0 =(lonlat0 == null? "31.99527,118.73444" : lonlat0);
    }

    String mapLonlat="",mapAddr="";
    try
    {
        PositionInfo info = LocationUtil.getMapPoi(lonlat,false);
        mapLonlat  = LocationUtil.formatPoiGps(info);
        mapAddr    = LocationUtil.formatPoiAddr(info);
    } catch(Exception e)
    {
        mapLonlat = lonlat;
        e.printStackTrace();
    }
    String mapLonlat0="",mapAddr0=""; 
    try
    {
    	if (lonlat0 != null && !lonlat0.equals("")){
	    	String[] lonlats = lonlat0.split("\\|");
	    	int size = lonlats.length;
	    	for (int i = 0; i < size; i ++){
	    		PositionInfo temp = LocationUtil.getMapPoi(lonlats[i],false);
	    		if (i == size-1){
	    			mapLonlat0  += LocationUtil.formatPoiGps(temp);
	    			mapAddr0    += LocationUtil.formatPoiAddr(temp);
	    			break;
	    		}
	       	 	mapLonlat0  += LocationUtil.formatPoiGps(temp)+"#";
	        	mapAddr0    += LocationUtil.formatPoiAddr(temp)+"#";
	    	}
    	}
    } catch(Exception e)
    {
        mapLonlat0 = "";
        e.printStackTrace();
    }
%>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <jsp:include page="/common/js/gis/map_include.jsp"/>
<style type="text/css" rel="stylesheet">
<!--
    .form_tbl{border-bottom: 1px solid #79B4DB;width:100%}
    .form_tbl td{
        font-size:12px;
        height:21px;
        background:#fff;
        border-top:1px solid #D5E0E5;
        border-right:1px solid #CCCCCC;
        padding-left:5px;
        padding-right:5px;
        padding-top:3px;
        padding-bottom:3px;
     }
     #validateMessage, #Attribution{
        display:none;
     }
     #popup_boxcontent {
        overflow:visible;
     }
     #distance_box{
         position: absolute;
         left: 25px;
         top: 23px;
         width:7px;
         height:11px;
         cursor:pointer;
     }
//-->
</style>        
    </head>
	<body style="margin:0px;padding:0px;overflow:hidden;">
	   <div id="map_div" class="view" style="width:100%;height:100%"></div> 
    <script type="text/javascript">   
    window.map     = {};
	    $(document).ready(function(){
				try {
					//转换为坐标点对象
			    	var locPt = s2pt("<%=mapLonlat%>");
	                mapLocation = ""+locPt.lat+","+locPt.lon;
	            		map = new FMap("map_div");
	            		if(window.maplet)
	            		{
	            		  var md = $("#map_div");
	            		  map.resize( md.width(), md.height() );
	            		}
	            		//设置点击地图是不移动到中心点
	            		map.setClickToCenter(false);
	            		//增加双击事件 
	            		map.addListener("dbclick", function(){window.maplet.setMode('pan');});
	                    var flatlng = new FLatLng(locPt.lat,locPt.lon);
	                    /* 重置点配置信息 */
	                    var pointCfg = {};
	                    pointCfg.path = "<%=path%>/common/js/gis/cust1.png";
	                    pointCfg.width = 26;
	                    pointCfg.height = 37;
	                    pointCfg.anchorX = 12;
	                    pointCfg.anchorY = 35;
	                    var vTip = showTipHtml("<%=mapAddr%>");
	                    var title = "定位点";
	                    var marks = map.mark(flatlng,vTip,pointCfg,null,title,"");
			    }catch(e)
			    {   
			        alert("地图加载失败，无法使用此功能，请检查网络设置!");
			    }		    		
	     });
	     
    var dodist = function()
    {
        mm.mouseDistance();
        $('#map_div_Mapabc_ViewPort').css("cursor","pointer");
        
    };
    var donedist = function()
    {
        mm.mouseMove();
        $('#map_div_Mapabc_ViewPort').css("cursor","url('http://api.mapabc.com/ajaxmap/2.1.2/js/img/openhand.cur'), default");
    };
    var showTipHtml = function(mapAddr){
        var obj = {};
        obj.位置=mapAddr;
        var table = "<table class='form_tbl' border='0' cellspacing='1' cellpadding='0'>";
        for(var key in obj){
            table += "<tr><td width='25%'>" + key + "</td>"
                   + "<td width='75%'>" + obj[key] + "</td></tr>";
        }
        table+="</table>";
        return table;
    };
    </script>
    </body>
</html>