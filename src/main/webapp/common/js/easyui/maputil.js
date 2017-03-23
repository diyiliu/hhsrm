/**
* 地图工具
*/
var mu = {
    isNull:function(obj)
    {
        if(obj == null || typeof(obj) == 'undefined' || obj == '')
        {
            return true;
        }
        return false;
    },
    check:function(latlon)
    {
        if(latlon == null || latlon.indexOf(',') < 0)
        {
            return false;
        }
        var lls = latlon.split(',');
        var lat = lls[0];
        var lon = lls[1];
        try
        {
            if(this.isNull(lon) || this.isNull(lat))
            {
                return false;
            }
            else
            {
                var latX = parseFloat(lat);
                var lonY = parseFloat(lon);
                if(isNaN(latX) || isNaN(lonY) || latX == 0 || latX > 180 || lonY == 0 || lonY > 180)
                {
                    return false;
                }
            }
            return true;
        }
        catch(e)
        {
            return false;
        }
    },
    /**
     * @param  latlon 经纬度
     * @param  opts {time:定位时间, user:定位用户, content:内容, flag:标志, top:置顶, title:标题}
     * */
    view:function(latlon, opts)
    {
        if (!this.check(latlon))
        {
            fh.alert("查询的经纬度位置不存在！");
        }
        var url = 'common/js/easyui/gis.jsp?flatlng=' + latlon;
        var title = '查看位置';
        if(opts)
        {
            if(opts.time)
            {
                url += '&time='+opts.time ;
            }
            if(!this.isNull(opts.user))
            {
                url += '&user='+opts.user;
            }
            if(!this.isNull(opts.desc))
            {
                url += '&content=' + opts.desc;
            }
            if(!this.isNull(opts.flag))
            {
                url += '&flag=' + opts.flag;
            }
            title = opts.title || '查看位置';
            
            var isTop = opts.top || false;
            if (isTop)
            {
            		commonOpenDialog("GISDLG",title,550,380, url,null,null,null,isTop);
                    return;
            }
        }
        try{
        	//fh.dialog({id:"GISCOMPARE", title:title, width:450, height:280, url:url});
        	//fh.lookup("GISCOMPARE", "", 280, 450, "", 0, "地图定位", url, {type:'gismodel'});
        	commonOpenDialog("GISDLG",title,550,380, url);
        }catch(e){
        	e.message;
        }
    },
    /**
     * @param  latlon 经纬度
     * @param  opts {time:定位时间, user:定位用户, content:内容, flag:标志, top:置顶, title:标题}
     * */
    compare:function(base, refer, opts){
        if (!this.check(base) && !this.check(refer))
        {
            fh.alert("查询的经纬度位置不存在！");
        }
        var url = 'common/js/easyui/compare.jsp?_id=D00092130001546';
        
        if(!this.isNull(base))
        {
        	url += '&base='+base;
        }
        if(!this.isNull(refer))
        {
        	url += '&refer='+refer;
        }
        var title = '位置比对';
        if(opts)
        {
        	if(!this.isNull(opts.title))
        	{
        		title = opts.title;
        	}
        	if(!this.isNull(opts.time))
        	{
        		url += '&time='+opts.time ;
        	}
        	if(!this.isNull(opts.user))
        	{
        		url += '&user='+opts.user;
        	}
        	if(!this.isNull(opts.desc0))
        	{
        		url += '&desc0=' + opts.desc0;
        	}
        	if(!this.isNull(opts.desc))
        	{
        		url += '&desc=' + opts.desc;
        	}
        	if(!this.isNull(opts.flag))
        	{
        		url += '&flag=' + opts.flag;
        	}
        	
            var isTop = opts.top || false;
            if (isTop)
            {
            		commonOpenDialog("GISCOMPARE",title,550,380, url,null,null,null,isTop);
                    return;
            }
        }
        try{
        	//fh.dialog({id:"GISCOMPARE", title:title, width:450, height:280, url:url});
        	//fh.lookup("GISCOMPARE", "", 280, 450, "", 0, "地图定位", url, {type:'gismodel'});
        	commonOpenDialog("GISCOMPARE",title,550,380, url);
        }catch(e){
        	e.message;
        }
    }
};
