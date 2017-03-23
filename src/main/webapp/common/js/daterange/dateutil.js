/**
 * 将日期字符串转换成日期对象
 */
function parse(strDate){
	try{
		if(strDate){
			return new Date(strDate.replace(/-/ig,'/')); 
		}
	}catch(e){
		console.log(strDate+'不能转换成Date对象！');
	}
}

/**
 * 日期增减
 */
Date.prototype.add=function(amount,field){
	if(amount){
		switch (field)
		{
			case "y":
				this.setFullYear(this.getFullYear() + amount);
				break;
			case "q":
				this.setMonth(this.getMonth() + amount * 3);
				break;
			case "m":
				this.setMonth(this.getMonth() + amount);
				break;
			case "w":
				this.setDate(this.getDate() + amount * 7);
				break;
			default:
				this.setDate(this.getDate() + (amount));
				break;
		}
	}
	return this;
}

/**
 * 日期格式化
 */
Date.prototype.format = function(pattern)
{
	if(!pattern){
		pattern = "yyyy-MM-dd";
	}
	var o =
	{
		"M+" : this.getMonth() + 1, // 
		"d+" : this.getDate(), // 
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 
		"H+" : this.getHours(), // 
		"m+" : this.getMinutes(), // 
		"s+" : this.getSeconds(), //
		"q+" : Math.floor((this.getMonth() + 3) / 3), //
		"S" : this.getMilliseconds()
	};
	var week =
	{
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
	};
	if (/(y+)/.test(pattern))
	{
		pattern = pattern.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(pattern))
	{
		pattern = pattern
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
								: "\u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o)
	{
		if (new RegExp("(" + k + ")").test(pattern))
		{
			pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return pattern;
};