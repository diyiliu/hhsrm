<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ include file="/common/include/includejs.jsp" %>
<%@ page import="com.fiberhome.sss.locating.util.LocationUtil
,com.fiberhome.sss.locating.util.map.PositionInfo
,com.fiberhome.sss.locating.util.Constants;" %>
<%
    String base    = request.getParameter("base");
    String refer   = request.getParameter("refer");
    String desc0   = request.getParameter("desc0");
    String maptime = request.getParameter("time");
    String mapuser = request.getParameter("user");
    String desc    = request.getParameter("desc");
    String flag    = request.getParameter("flag");
    
    StringBuffer bhtml = new StringBuffer();
    bhtml.append("<table class='form-table' border='0' cellspacing='1' cellpadding='0'>");
    StringBuffer html = new StringBuffer();
    html.append("<table class='form-table' border='0' cellspacing='1' cellpadding='0'>");
    
    if(flag == null)
    {
        flag = "true";
    }
    if(mapuser != null)
    {
       html.append("<tr><td width='25%'>员工</td><td width='75%'>" + mapuser + "</td></tr>");
    }
    String mapCenter = "", referCenter = "";
    try
    {
        boolean correct = true;
        if("false".equals(flag))
        {
            correct = false;
        }
        PositionInfo cInfo = null,rInfo = null;
        String baseAddr = "", referAddr = "";
        String temp[] = base.split(",");
        if(LocationUtil.checkLonlat(base))
	    {
            cInfo      = LocationUtil.getMapPoi(temp[1]+","+temp[0], false);
            mapCenter  = LocationUtil.formatPoiGps(cInfo);
            baseAddr   = LocationUtil.formatPoiAddr(cInfo);
	    }
	    else
	    {
            mapCenter = Constants.MAP_INIT_LOCATION_DEF;
            cInfo     = LocationUtil.getMapPoi(mapCenter, false);
            baseAddr  = LocationUtil.formatPoiAddr(cInfo);
	    }

        bhtml.append("<tr><td width='25%'>位置</td><td width='75%'>" + baseAddr + "</td></tr>");
        if(LocationUtil.checkLonlat(refer))
        {
            rInfo        = LocationUtil.getMapPoi(refer, false);
            referCenter  = LocationUtil.formatPoiGps(rInfo);
            referAddr    = LocationUtil.formatPoiAddr(rInfo);
            html.append("<tr><td width='25%'>位置</td><td width='75%'>" + referAddr + "</td></tr>");
        }
        
    } catch(Exception e)
    {
        mapCenter = base;
        e.printStackTrace();
    }
    
    if(maptime != null)
    {
        html.append("<tr><td width='25%'>定位时间</td><td width='75%'>" + maptime + "</td></tr>");
    }
    if(desc != null)
    {
        html.append("<tr><td width='25%'>描述</td><td width='75%'>" + desc + "</td></tr>");
    }
    if(desc0 != null)
    {
        bhtml.append("<tr><td width='25%'>描述</td><td width='75%'>" + desc0 + "</td></tr>");
    }
    bhtml.append("</table>");
    html.append("</table>");
    double l = LocationUtil.distanceByLocation(mapCenter, referCenter);
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
             #popup_titleDiv{width:325px!important;width:356px}
        //-->
        </style>
    </head>
    <body style="margin:0px;padding:0px;overflow:hidden;">
    <div id="map_div" class="view" style="width:100%;height:100%"></div> 
    <script type="text/javascript">
        window.map     = {};
        $(document).ready(function(){
                try {
                    var center = s2pt("<%=mapCenter%>");// 考勤点
                	mapLocation = ""+center.lat+","+center.lon;
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
            		
            		
                    var flatlngs = [];
                    var flatlng = new FLatLng(center.lat,center.lon);
                    flatlngs.push(flatlng);
                    /* 重置点配置信息 */
                    var pointCfg = {};
                    pointCfg.path = "<%=path%>/common/js/gis/cust1.png";
                    pointCfg.width = 26;
                    pointCfg.height = 37;
                    pointCfg.anchorX = 12;
                    pointCfg.anchorY = 35;
                    var vTip = "<%=bhtml%>";
                    var title = "详细";
                    var marks = map.mark(flatlng,vTip,pointCfg,null,title,"");
                    
                    var center2 = s2pt("<%=referCenter%>");//打卡点
                    var flatlng2 = new FLatLng(center2.lat,center2.lon);
                    flatlngs.push(flatlng2);
                    /* 重置点配置信息 */
                    var pointCfg2 = {};
                    pointCfg2.path = "<%=path%>/common/js/gis/man.png";
                    pointCfg2.width = 32;
                    pointCfg2.height = 32;
                    pointCfg2.anchorX = 10;
                    pointCfg2.anchorY = 30;
                    var vTip2 = "<%=html%>";
                    var title2 = "详细";
                    var marks2 = map.mark(flatlng2,vTip2,pointCfg2,null,title2,"距离："+<%=l%>+"米");
                    
                    var line = map.addLine(flatlngs,"#FF0000",0.63,3,"","","");
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
        
    </script>
    </body>
</html>