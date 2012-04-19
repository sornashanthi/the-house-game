//global settings for jquery 
jQuery.fx.interval=10;if(typeof (window["collected"]&&window["used"])=="undefined")var collected=!1,used=!1;var room={settings:{inject:!1,grid_width:null,grid_height:null,tile_width:69.282,tile_height:40,drag_room:!1,room_glow:!1,player:!1,player_speed:null,player_position_x:null,player_position_y:null,collision_nodes:[],collected_items:collected,used_items:used,transparency_power:".7",volume:50,preload:[],zdetection:function(){return!1},execute:function(){}},generate:function(a){$("<div/>",{id:"black"}).appendTo("body").css({opacity:0}).animate({opacity:1},1e3,function(){$("body").css("background","#000");room.settings.inject&&$("#the_game").empty();setTimeout(function(){$.extend(room.settings,a);$("#black").remove();room.inject()},500)})},inject:function(){if(room.settings.inject)$("#the_game").load(room.settings.inject+".html?"+(new Date).getTime(),function(){soundManager.stopAll();var a=window.room.settings.inject,b=function(){sound[a].play({volume:room.settings.volume,onfinish:function(){b(a)}})};b(a);$("body").css("background","#000");$("<div/>",{id:"black"}).appendTo("body").css({opacity:1}).animate({opacity:0},1e3,function(){$("body").find("#black").remove()});$.jStorage.set("is_in",room.settings.inject);room.draw_grid();room.place_player();room.set_collisions();room.set_collected_items();room.set_used_items();room.draggable();room.stroke();room.settings.execute();room.the_player.start();room.center();$(room.player_body()).sprite({no_of_frames:8}).spStop(!0)});else{room.draw_grid();room.draggable()}},player:function(){var a=$("#"+room.settings.player);return a},player_body:function(){var a=$("#sprite");return a},center:function(a,b){var c=$("#the_game").children("div").first(),d=$(window).width(),e=$(window).height(),f=$(room.player()).width(),g=$(room.player()).height(),h=$(room.player_body()).height(),i=$(room.player()).position(),j=$("body").find("#floor"),k=$(j).width(),l=$(j).height(),m=$(j).position();if(!a)$(c).css({left:d/2-f/2-i.left-m.left,top:e/2-g/2-i.top-m.top+h/3});else{if(!b)return!1;$("#tooltip").remove();$(c).stop(!0,!1).animate({left:d/2-f/2-i.left-m.left,top:e/2-g/2-i.top-m.top+h/3},b)}},draggable:function(){if(room.settings.drag_room)$("#the_game").children("div:first-child").draggable({start:function(){$("#the_game").children("div").stop()}});else return!1},stroke:function(){if(room.settings.room_glow)$("div.tile, div.active").hover(function(){$("#stroke").css({opacity:1})},function(){$("#stroke").css({opacity:.5})});else return!1},draw_grid:function(){var a=0,b=0;for(a=0;a<room.settings.grid_width;a++)for(b=0;b<room.settings.grid_height;b++)var c=$("<div/>",{id:a+"-"+b,css:{width:room.settings.tile_width,height:room.settings.tile_height,position:"absolute",left:a*room.settings.tile_width/2+(room.settings.grid_height*room.settings.tile_width/2-room.settings.tile_width/2)-room.settings.tile_width/2*b,top:b*room.settings.tile_height/2+a*room.settings.tile_height/2}}).appendTo("#floor").attr("class","tile").attr("data-x",a).attr("data-y",b).attr("data-z",b+(b+room.settings.grid_height*a))},grid:function(){grid=function(){grid=new Array(room.settings.grid_height);for(var a,b=0;b<room.settings.grid_height;b++){grid[b]=new Array(room.settings.grid_width);for(a=0;a<room.settings.grid_width;a++)grid[b][a]=0}return grid};add_collisions=function(a,b){for(i=0;i<a.length;i++){var c=$("#"+a[i]).attr("data-x"),d=$("#"+a[i]).attr("data-y");b[d][c]=1}return b};grid=add_collisions(room.settings.collision_nodes,grid());return grid},place_player:function(){var a=$("#"+room.settings.player_position_x+"-"+room.settings.player_position_y),b=a.position();$(room.player()).css({top:b.top,left:b.left,"z-index":a.attr("data-z")}).attr("data-x",room.settings.player_position_x).attr("data-y",room.settings.player_position_y)},set_collisions:function(){room.loop_and_add_class(room.settings.collision_nodes,"collision")},set_collected_items:function(){room.loop_and_remove(room.settings.collected_items)},set_used_items:function(){room.loop_and_remove(room.settings.used_items,!0)},loop_and_remove:function(a,b){var c=a.length;if(b){if(!(c>0))return!1;for(i=0;i<c;i++)$("#"+a[i]).remove()}else{if(!(c>0))return!1;for(i=0;i<c;i++)$("#the_game").find("#"+a[i]).remove()}},loop_and_add_class:function(a,b){var c=a.length;if(!(c>0))return!1;for(i=0;i<c;i++)$("#"+a[i]).addClass(b)},transparency:function(a,b){$(b).addClass("transparency");$(b).hover(function(){$(a).stop().css({opacity:room.settings.transparency_power})},function(){$(a).stop().css({opacity:1})})},pulse:function(a,b){function c(){setTimeout(function(){$(a).css({opacity:0});setTimeout(function(){$(a).css({opacity:1});c()},b*2)},b)}$(a).css({"-moz-transition":"opacity "+b/1e3+"s linear","-webkit-transition":"opacity "+b/1e3+"s linear","-o-transition":"opacity "+b/1e3+"s linear","-moz-transition":"opacity "+b/1e3+"s linear",transition:"opacity "+b/1e3+"s linear"});c()},the_player:{start:function(){$("#floor").find("div.tile").on("click",function(){if(!$(this).hasClass("collision")){var a=$.jStorage.get("temp_path");a=[];$.jStorage.set("this_path",path);$(room.player_body()).spStart();$(room.player()).stop();room.the_player.go_to.start({target:!1,action:function(){!1}});room.the_player.footsteps();room.the_player.footsteps(12,4,!0);room.the_player.clear_path();room.the_player.find_path(this,!1,!1,room.grid())}})},go_to:{settings:{target:!1,action:function(){return!1}},start:function(a){$.extend(room.the_player.go_to.settings,a);if(room.the_player.go_to.settings.target){$(room.player_body()).spStart();$(room.player()).stop();room.the_player.footsteps();room.the_player.footsteps(12,4,!0);room.the_player.clear_path();room.the_player.find_path($("#"+room.the_player.go_to.settings.target),!1,!1,room.grid())}}},footsteps:function(a,b,c){if(a&&b&&c)stop_steps=setInterval(function(){sound_footstep.play()},1e3/a*b);else{typeof window["stop_steps"]!="undefined"&&clearInterval(stop_steps);sound_footstep.play()}},clear_path:function(){$("div.tile").removeClass("marked")},AStar:function(){function a(a,b,c,d,e,f,g,h,i,j,k,l,m){if(a){c&&!i[e][g]&&(l[m++]={x:g,y:e});d&&!i[e][h]&&(l[m++]={x:h,y:e})}if(b){c&&!i[f][g]&&(l[m++]={x:g,y:f});d&&!i[f][h]&&(l[m++]={x:h,y:f})}return l}function b(a,b,c,d,e,f,g,h,i,j,k,l,m){a=e>-1;b=f<j;c=g<k;d=h>-1;if(c){a&&!i[e][g]&&(l[m++]={x:g,y:e});b&&!i[f][g]&&(l[m++]={x:g,y:f})}if(d){a&&!i[e][h]&&(l[m++]={x:h,y:e});b&&!i[f][h]&&(l[m++]={x:h,y:f})}return l}function c(a,b,c,d,e,f,g,h,i,j,k,l,m){return l}function d(a,b,c,d,e,f){var g=c-1,h=c+1,i=b+1,j=b-1,k=g>-1&&!d[g][b],l=h<e&&!d[h][b],m=i<f&&!d[c][i],n=j>-1&&!d[c][j],o=[],p=0;k&&(o[p++]={x:b,y:g,index:p,direction:"up"});m&&(o[p++]={x:i,y:c,index:p,direction:"right"});l&&(o[p++]={x:b,y:h,index:p,direction:"down"});n&&(o[p++]={x:j,y:c,index:p,direction:"left"});return a(k,l,m,n,g,h,i,j,d,e,f,o,p)}function e(a,b,c,d){return d(c(a.x-b.x),c(a.y-b.y))}function f(a,b,c,d){var e=a.x-b.x,f=a.y-b.y;return d(e*e+f*f)}function g(a,b,c,d){return c(a.x-b.x)+c(a.y-b.y)}function h(h,i,j,k){var l=h[0].length,m=h.length,n=l*m,o=Math.abs,p=Math.max,q={},r=[],s=[{x:i[0],y:i[1],f:0,g:0,v:i[0]+i[1]*l}],t=1,u,v,w,x,y,z,A,B,C;j={x:j[0],y:j[1],v:j[0]+j[1]*l};switch(k){case"Diagonal":w=a;case"DiagonalFree":v=e;break;case"Euclidean":w=a;case"EuclideanFree":p=Math.sqrt;v=f;break;default:v=g;w=c}w||(w=b);do{z=n;A=0;for(x=0;x<t;++x)if((k=s[x].f)<z){z=k;A=x}B=s.splice(A,1)[0];if(B.v!=j.v){--t;C=d(w,B.x,B.y,h,m,l);for(x=0,y=C.length;x<y;++x){(u=C[x]).p=B;u.f=u.g=0;u.v=u.x+u.y*l;if(!(u.v in q)){u.f=(u.g=B.g+v(u,B,o,p))+v(u,j,o,p);s[t++]=u;q[u.v]=1}}}else{x=t=0;do r[x++]=[B.x,B.y,B.index,B.direction];while(B=B.p);r.reverse()}}while(t);return r}return h}(),find_path:function(a,b,c,d){if(!b&&!c)var b=parseInt($(room.player()).attr("data-x")),c=parseInt($(room.player()).attr("data-y"));var e=parseInt($(a).attr("data-x")),f=parseInt($(a).attr("data-y"));go=function(a,b){var b=b?b:1;if(a.length>b){var c=$("#"+a[b][0]+"-"+a[b][1]).position(),d=room.settings.zdetection()?room.settings.zdetection():$("#"+a[b][0]+"-"+a[b][1]).attr("data-z");a[b][3]==="up"?$(room.player_body()).spState(2):a[b][3]==="down"?$(room.player_body()).spState(3):a[b][3]==="right"?$(room.player_body()).spState(4):a[b][3]==="left"&&$(room.player_body()).spState(5);$(room.player()).attr("data-x",a[b][0]).attr("data-y",a[b][1]).css("z-index",d).animate({left:c.left,top:c.top},room.settings.player_speed,"linear",function(){b++;go(a,b)})}else{$(room.player_body()).spStop(!0);get_direction=$(room.player_body()).css("background-position"),direction=get_direction.substr(-6,4);room.center(!0,1e3);direction=="-310"?room.player_body().css("background-position","0 0"):direction=="-620"?room.player_body().css("background-position","-620px 0"):direction=="-930"?room.player_body().css("background-position","-930px 0"):direction=="1240"&&room.player_body().css("background-position","-310px 0");room.the_player.go_to.settings.action()&&room.the_player.go_to.settings.action();room.the_player.go_to.start({target:!1,action:function(){!1}});room.the_player.footsteps()}};go(room.the_player.AStar(d,[b,c],[e,f]))}}};