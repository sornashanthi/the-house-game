var utility={picker:{init:function(){$("#grid_data").find("input").focus(function(){$(this).val("")});utility.picker.grab_data();$("#close").live("click",function(){$("body").find("#results").fadeOut("fast")})},grab_data:function(){$("#submit").click(function(){var a=parseInt($("#x").val()),b=parseInt($("#y").val());utility.picker.build_grid(a,b);utility.picker.pick($(".tile"));utility.picker.generate();return!1})},build_grid:function(a,b){$("#the_game").append('<div id="floor" />');$("<div />",{id:"generate"}).appendTo("#the_game").text("Generate!");$("#grid_data").remove();room.generate({grid_width:a,grid_height:b,drag_room:!0})},pick:function(a){$(a).live("click",function(){$(this).hasClass("selected")?$(this).removeClass("selected"):$(this).addClass("selected")})},generate:function(){$("#generate").click(function(){$("body").find("#results").remove();var a=$("#floor").find(".selected"),b=$(a).length;$("<div />",{id:"results"}).appendTo("#the_game").append("<h1>Array:</h1>").append('<pre id="array" />').append("<h1>Selectors:</h1>").append('<pre id="selectors" />').append('<div id="close"><div></div><div></div></div>');var c=$("body").find("#array"),d=$("body").find("#selectors");for(i=0,j=b;i<j;i++){var e=$(a).get(i),f=$(e).attr("id");if(i+1===j){$(c).append("'"+f+"'");$(d).append("#"+f)}else{$(c).append("'"+f+"', ");$(d).append("#"+f+", ")}}})}}};$(document).ready(function(){utility.picker.init()});