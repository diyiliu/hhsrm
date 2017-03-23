/**
 * Color Picker for jQuery
 *
 * author: feiyu
 * e-mail: feiyu@asgard.cn
 * website: http://feiyu.asgard.cn
 *
 * Version: 1.0.1
 */
(function($) {
	$.fn.colorPicker=function(i1,i2,i3,i4) {

		var in1,in2,in3;
		if(i1!=false) {
			in1=GetObj(this,i1);
		}
		if(i2!=false) {
			if(i2) in2=$(i2);
			else in2=this;
		}

		if(i3) {
			in3=GetObj(this,i3);
		}
		if(in1==in3&&!i1) in1=false;


		var _p = jQuery('#fy_ColorPicker');
		if (_p.length==0) {
			$('body').append('<div id="fy_ColorPicker"></div>');
			_p=$('#fy_ColorPicker');
			_p.css({"position":"absolute","z-index":"100","background-color":"#FFFFFF","border":"1px solid #CCCCCC","padding":"1px","cursor":"pointer"});
		}
		else _p.toggle();

		var _l=GetLoc(this[0]);
		_p.css({"left":_l.Left+(i4?_l.Width:0)+"px","top":(_l.Top+_l.Height)+"px"});


		if ($('table',_p).length==0) {
			var hc = ["FF","CC","99","66","33","00"];
			var i=0,j=0;
			var r,g,b,c;
			var s = new Array();
			s[0] = '<table cellspacing="1" cellpadding="0"><tr>';
			for(r=0;r<6;r++) {
				for(g=0;g<6;g++) {
					for(b=0;b<6;b++) {
						c = hc[r] + hc[g] + hc[b];
						if (i%18==0 && i>0) {
							s[j+1] = "</tr><tr>";
							j++;
						}
						s[j+1] = '<td class="color" bgcolor="#'+c+'" height="10" width="10"></td>';
						i++;
						j++;
					}
				}
			}
			s[j+1] = '</tr><tr><td height="10" colspan="16" id="fy_ColorPicker_Select" style="font-family:Tamoha;font-size:10px;text-align:center;cursor:default;"></td><td class="color" bgcolor="" height="10" colspan="1" title="Empty" align="center" style="font-family:Tamoha;font-size:10px">E</td><td class="color" bgcolor="transparent" height="10" colspan="1" title="Transparent" align="center" style="font-family:Tamoha;font-size:10px">T</td></tr></table>';
			_p.html(s.join(''));
		}


		$('.color',_p).unbind("mouseover").unbind("click").mouseover(function() {
			setSelect(this.bgColor.toUpperCase());
		}).click(function() {
			setColorValue(this.bgColor.toUpperCase(),in1,in2,in3);
		});
	}

	function GetLoc(element) {
		if ( arguments.length != 1 || element == null ) { 
			return null;
		} 
		var offsetTop = element.offsetTop; 
		var offsetLeft = element.offsetLeft; 
		var offsetWidth = element.offsetWidth; 
		var offsetHeight = element.offsetHeight; 
		while( element = element.offsetParent ) { 
			offsetTop += element.offsetTop;
			offsetLeft += element.offsetLeft;
		}
		return { Top: offsetTop, Left: offsetLeft, Width: offsetWidth, Height: offsetHeight };
	}

	function setColorValue(v,in1,in2,in3) {
		var v=v=='TRANSPARENT'?'transparent':v;
		$('#fy_ColorPicker').hide();
		if(in2) in2.val(v);
	}

	function setSelect(v) {
		var v=v=='TRANSPARENT'?'transparent':v;
		$("#fy_ColorPicker_Select").css('background-color',v).text(v);
	}

	function GetObj(a,v) {
		var r;
		if(v) r=$(v);
		else {
			var n=a[0].attr("tagName");
			var t=a.attr('type');
			if(t) t=t.toUpperCase();
			if(n=='INPUT'&&(t=='TEXT'||t=='HIDDEN'||t=='BUTTON')||n=='BUTTON'||n=='SPAN'||n=='DIV') r=a;
			else {
				var o=a.prev("input[@type=hidden],input[@type=text],input[@type=button],button");
				if(o.length>0) r=$(o[0]);
				else {
					var o=a.next("input[@type=hidden],input[@type=text],input[@type=button],button");
					if(o.length>0) r=$(o[0]);
				}
			}
		}
		return r;
	}
})(jQuery);