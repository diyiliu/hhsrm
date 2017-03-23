/*!
 * 提示框控件 本提示框控件基于lghdialog，需要先引用lhgdialog.min.js
 * Date: 2013-03-12 15:52:11 
 * Author: gaojianjian
 */
var fh = {
	/**
	 * 弹出框通用调用函数
	 * @param	{json}	传递参数
	 */
	dialog:function(opts){
		var op = $.extend({id: 'fhdialog',
    		title: '友情提示：',
		    width: 'auto',
		    height: 'auto',
		    fixed: !1,
		    drag: !0,
    		resize: !1,
    		lock: !0,
    		icon: !1,
    		esc: !0,
    		time: !1,
    		padding: '10px',
		    content: 'url:' + encodeURI(opts.url),
		    parent: null, 
            init: null,
            close: null,
		    ok: null,
			cancel: null}, opts);
		$.dialog(op);
	},
	/**
	 * 警惕提示框
	 * @param	{String}	消息内容
	 * @param	{Function}	确定按钮回调函数
	 */
	alert:function(info,handler){
		$.dialog.alert(info,function(){
		    if (handler) {
				handler.call(this);
			}
		});
	},
	/**
	 * 确认提示框
	 * @param	{String}	消息内容
	 * @param	{Function}	确定按钮回调函数
	 * @param	{Function}	取消按钮回调函数
	 */
	confirm:function(info,yes,no){
		$.dialog.confirm(info, function(){
		    if (yes) {
				yes.call(this);
			}
		}, function(){
		    if (no) {
				no.call(this);
			}
		});
	},
	/**
	 * 提问框
	 * @param	{String}	提问内容
	 * @param	{String}	默认值
	 * @param	{Function}	回调函数. 接收参数：输入值
	 */
	prompt:function(info,value,handler){
		$.dialog.prompt(info,
		    function(val){
		        if (handler) {
					handler.call(this,val);
				}
		    },
		    value
		);
	},
	/**
	 * 成功提示框
	 * @param	{String}	消息内容
	 * @param	{Function}	确定按钮回调函数
	 */
	success:function(info,handler){
		this.dialog({
			id: 'fh-success',
			title: '提示',
			icon: 'success.png',
			html: info,
			ok: true,
			close: handler
		});
	},
	/**
	 * 警告提示框
	 * @param	{String}	消息内容
	 * @param	{Function}	确定按钮回调函数
	 */
	warning:function(info,handler){
		this.dialog({
			id: 'fh-warning',
			title: '提示',
			icon: 'warning.png',
			html: info,
			ok: true,
			close: handler
		});
	},
	/**
	 * 错误提示框
	 * @param	{String}	消息内容
	 * @param	{Function}	确定按钮回调函数
	 */
	error:function(info,handler){
		this.dialog({
			id: 'fh-error',
			title: '提示',
			icon: 'error.png',
			html: info,
			ok: true,
			close: handler
		});
	}
};

