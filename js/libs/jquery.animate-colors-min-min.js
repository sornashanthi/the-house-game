/*
 Color animation jQuery-plugin
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
*/(function(e){function t(){var t=e("script:first"),n=t.css("color"),r=!1;if(/^rgba/.test(n))r=!0;else try{r=n!=t.css("color","rgba(0, 0, 0, 0.5)").css("color");t.css("color",n)}catch(i){}return r}function n(t,n,r){var i="rgb"+(e.support.rgba?"a":"")+"("+parseInt(t[0]+r*(n[0]-t[0]),10)+","+parseInt(t[1]+r*(n[1]-t[1]),10)+","+parseInt(t[2]+r*(n[2]-t[2]),10);e.support.rgba&&(i+=","+(t&&n?parseFloat(t[3]+r*(n[3]-t[3])):1));i+=")";return i}function r(e){var t,n;if(t=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(e))n=[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16),1];else if(t=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(e))n=[parseInt(t[1],16)*17,parseInt(t[2],16)*17,parseInt(t[3],16)*17,1];else if(t=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e))n=[parseInt(t[1]),parseInt(t[2]),parseInt(t[3]),1];else if(t=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(e))n=[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10),parseFloat(t[4])];return n}e.extend(!0,e,{support:{rgba:t()}});var i=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];e.each(i,function(t,i){e.fx.step[i]=function(t){if(!t.init){t.a=r(e(t.elem).css(i));t.end=r(t.end);t.init=!0}t.elem.style[i]=n(t.a,t.end,t.pos)}});e.fx.step.borderColor=function(t){t.init||(t.end=r(t.end));var s=i.slice(2,6);e.each(s,function(i,s){t.init||(t[s]={a:r(e(t.elem).css(s))});t.elem.style[s]=n(t[s].a,t.end,t.pos)});t.init=!0}})(jQuery);