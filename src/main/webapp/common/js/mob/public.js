/*错误信息晃动提示*/
$.fn.animateOnce=function(anim){
	$(this).addClass(anim+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(this).removeClass(anim+' animated');
	});
}