;(function($) {
	// 开始日期
	var STARTDATE = "startTime";
	// 结束日期
	var ENDDATE = "endTime";
	// 区域组件
	var CALENDAR = "calendar";
  	$.fn.daterange = function(options){
  		// 目录对象
  		var target = this;
  		// 向前
		var isPrev = getTargetId() =='prev';
		// 向后
		var isNext = getTargetId() =='next';
		// 当前对象是否是向前向后
		var isRoll= isPrev || isNext; 
		// 属性继承
  		options = $.extend({
  			// 是否加数据  
			isLoadData:true,
			// 日期类型
			dateType:{
				'today':0,
				'yesterday':-1,
				'week':-6,
				'month':-29
			},
			// 当前日期
			currentDate:new Date()
		}, options || {});
		
		// 设置当前日期类型
		setDateType();
		// 设置当前选中样式
		setCurrentClass();
		// 设置区间日期
		setRangeDate(options.currentDate,getOffset());
		if(options.isLoadData){
			// 执行数据刷新回调
			options.reloadDataHandle($.getRange());
		}
		
		/**
		 * 设置日期类型
		 */
		function setDateType(){
			if(isPrev){
				// 向前日期类型
				options.dateType = {
					'today':-1,
					'yesterday':-1,
					'week':-6,
					'month':-29
				}
				options.currentDate = parse(getStartDate());
			}
			// 向后日期类型
			else if(isNext){
				options.dateType = {
					'today':1,
					'yesterday':1,
					'week':6,
					'month':29
				}
				options.currentDate = parse(getEndDate());
			}else{
				// 默认类型
				options.dateType = {
					'today':0,
					'yesterday':-1,
					'week':-6,
					'month':-29
				}
				options.currentDate = new Date();
			}
		}
		
		// 获得日期偏移量
		function getOffset(){
			var offset = options.dateType[getSelectedId()];
			// 如果没有选中日期维度，则是按向前,向后设置默认的偏移量
			if(!offset && offset != 0){
				return isPrev ? -1 : 1;
			}else{
				return offset;
			}
		}
		
		/**
		 * 获得目标标识
		 */
		function getTargetId(){
			return $(target).attr('id');
		}
		
		/**
		 * 设置日期范围
		 */
		function setRangeDate(date,offset){
			var startDate = "";
			var endDate="";
			if(offset < -1){
				if(isRoll){
					endDate = date.add(-1).format();
				}else{
					endDate = date.format();
				}
				startDate = date.add(offset).format();
			}else if(offset > 1){
				if(isRoll){
					startDate = date.add(1).format();
				}else{
					startDate = date.format();
				}
				endDate = date.add(offset).format();
			}else if(offset == -1){
				startDate = date.add(offset).format();
				endDate = startDate;
			}
			else if(offset == 1){
				endDate = date.add(offset).format();
				startDate = endDate;
			}
			else{
				startDate = date.add(offset).format();
				endDate = startDate;
			}
			setRangeDateValue(startDate,endDate);
		}
		
		/**
		 * 设置当前选中样式
		 */
		function setCurrentClass(){
			if(!isRoll){
				target.parent().find('.selected').removeClass('selected');
				target.addClass('selected');
			}
		}
		
	}
	
	$.getRange = function(){
		return {startDate:getStartDate(),endDate:getEndDate()};
	}
	
	/**
	 * 设置给定的日期区间值
	 */
	function setRangeDateValue(startDate,endDate){
		$('#'+CALENDAR).val(startDate+' ~ '+endDate);
	    $("#"+STARTDATE).val(startDate);
		$("#"+ENDDATE).val(endDate);
	}
	
	/**
	 * 关闭日期选择控件
	 */
	function closeDp(){
		$('.datepicker').hide();
	}
	
	/**
	 * 获取当前选中ＩＤ
	 */
	function getSelectedId(){
		return getSelected().attr('id');
	}
	
	/**
	 * 获取当前选中控件
	 */
	function getSelected(){
		return $('.selected');
	}
	
	/**
	 * 获取开始日期
	 */
	function getStartDate(){
		return $("#"+STARTDATE).val();
	}
	
	/**
	 * 获取结束日期
	 */
	function getEndDate(){
		return $("#"+ENDDATE).val();
	}
	
	String.prototype.replacePlaceholder = function(replaceTexts){
		var reg = /{\d+}/;
		var thiz = this;
		if(reg.test(this)){
			for(var i=0,size=replaceTexts.length;i<size;i++){
				var re = new RegExp("{["+i+"]}", "g");
				thiz = thiz.replace(re,replaceTexts[i]);
			}
		}
		return thiz;
	}
	
	/**
	 * 初始化
	 */
	$(function(){
		var range = $("#calendar").attr('range');
		if(range){
			var json = eval('('+range+')');
			setRangeDateValue(json.startDate,json.endDate);
		}else{
			getSelected().daterange({isLoadData:false});
		}
		$("#calendar").DatePicker({
		    calendars: 2,
		    mode: 'range',
		    current: (new Date()).format('yyyy/MM/dd'),
		    onChange: function(dates,el) {
		    	setRangeDateValue(dates[0].format(),dates[1].format());
		    }
		});
	       
		$('#dp-search').click(function(){
			closeDp();
			eval($('#'+CALENDAR).attr('handler')+"({startDate:'{0}',endDate:'{1}'})".replacePlaceholder([getStartDate(),getEndDate()]));
			getSelected().attr("class","")
		});
	});
	
	
  	
})(jQuery);
