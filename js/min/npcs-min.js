var npc={fish:{select:function(){var a=$("#fish, #fish_click_area");return a},click_area:function(){$("<div/>",{id:"fish_click_area"}).appendTo("#floor")},swim:function(){if($.inArray("disappear",fish)===-1){$(npc.fish.select()).sprite({fps:8,no_of_frames:5});npc.fish.click_area();npc.fish.move();npc.fish.react();$("#key").hide()}else{$(npc.fish.select()).remove();npc.fish.key()}},move:function(a){var b=$("#fish");a?b.spToggle().fps(8).spState(2):b.spState(2);var a=function(b){b.animate({left:242,top:-236},5e3,"linear",function(){b.spState(3)}).animate({left:-129,top:-84},5e3,"linear",function(){if(!window.test){b.spState(2);a(b)}})};a(b);a($("#fish_click_area"))},move_to_player:function(a,b){b&&a.spToggle();a.stop(!0).animate({left:98,top:-190},200).css("background-position","0 0")},react:function(){$(npc.fish.select()).click(function(){room.the_player.go_to.start({target:"1-3",action:function(){$(room.player_body()).css("background-position","-310px 0px");npc.fish.move_to_player($("#fish"),!0);npc.fish.move_to_player($("#fish_click_area"));room.center(!0,100);dialogue_box.display({character:"Fish",picture:"aquarium_fish_big.png",text:"Hello!",options:["Hi.","I don't have time to talk with you."]});$("#options").on("click","#option_1",function(){dialogue_box.destroy();npc.fish.move(!0);$("#fish").text_cloud("Oh really? I have A LOT.",8e3)});$("#options").on("click","#option_0",function(){dialogue_box.display({character:"Fish",picture:"aquarium_fish_big.png",text:"Tell me... Did you look through the window?",options:["Yes I did.","No."]});$("#options").on("click","#option_1",function(){dialogue_box.destroy();npc.fish.move(!0);$("#fish").text_cloud("So please take a look and tell me what did you see.",1e4);$("#teleport, #exit").show("slow")});$.inArray("window",fish)===-1?$("#options").on("click","#option_0",function(){dialogue_box.display({character:"Fish",picture:"aquarium_fish_big.png",text:"So what did you see then?",options:["..."]});$("#options").on("click","#option_0",function(){dialogue_box.destroy();npc.fish.move(!0);$("#fish").text_cloud("Yeah. C'mon! Check that window.",8e3);$("#teleport, #exit").show("slow")})}):$("#options").on("click","#option_0",function(){dialogue_box.display({character:"Fish",picture:"aquarium_fish_big.png",text:"So what did you see than?",options:["Many flying... Objects?"]});$("#options").on("click","#option_0",function(){dialogue_box.destroy();$("#fish_click_area").remove();$("#fish").text_cloud("Wow. I have to check it out!",3e3);$("#fish").stop(!0,!0).delay(2e3).animate({opacity:0},3e3,function(){$(this).remove()});npc.fish.key();var a=$.jStorage.get("fish");a.push("disappear");$.jStorage.set("fish",a)})})})}})})},key:function(){$("#aquarium").find("#key").click(function(){room.the_player.go_to.start({target:"18-5",action:function(){items.take("#key");$("#teleport, #exit").show("slow")}})});$("#key").fadeIn()}},furnace:{furnace_use:function(){var a=$("#furnace_use");return a},furnace:function(){var a=$("#furnace");return a},body:function(){var a=$("#body");return a},eyes:function(){var a=$("#left_eye, #right_eye");return a},mouth:function(){var a=$("#mouth");return a},fire:function(){var a=$(".fire");return a},burn:function(){function b(){a.animate({opacity:.8},200).animate({opacity:.6},250).animate({opacity:.85},200).animate({opacity:.65},100).animate({opacity:.9},150).animate({opacity:.65},200,function(){b()})}var a=npc.furnace.fire();b()},has_food:function(){if($.inArray("twig",collected)!==-1&&$.inArray("twig",used)===-1){dialogue_box.display({character:!1,picture:!1,text:"The furnace wants to eat a twig",options:["Ok","No!"]},"big");$("#options").on("click","#option_0",function(){setTimeout(function(){items.use("#twig");$("#option_0").click(function(){dialogue_box.destroy();scene.no_click(!0);setTimeout(function(){npc.furnace.furnace().text_cloud("Nom, nom, nom.",750);npc.furnace.is_eating()},500)})},500)})}else if($.inArray("note",collected)!==-1&&$.inArray("note",used)===-1&&$.inArray("scene_keypad",played)===-1){dialogue_box.display({character:!1,picture:!1,text:"The furnace wants to eat your note. You may need it later - maybe you should write it down?",options:["Ok","No!"]},"big");$("#options").on("click","#option_0",function(){setTimeout(function(){items.use("#note");$("#option_0").click(function(){dialogue_box.destroy();scene.no_click(!0);setTimeout(function(){npc.furnace.furnace().text_cloud("Nom, nom, nom.",750);npc.furnace.is_eating()},500)})},500)})}else if($.inArray("note",collected)!==-1&&$.inArray("note",used)===-1){dialogue_box.display({character:!1,picture:!1,text:"The furnace want's to eat your note.",options:["Ok","No!"]},"big");$("#options").on("click","#option_0",function(){setTimeout(function(){items.use("#note");$("#option_0").click(function(){dialogue_box.destroy();scene.no_click(!0);setTimeout(function(){npc.furnace.furnace().text_cloud("Nom, nom, nom.",750);npc.furnace.is_eating()},500)})},500)})}else if($.inArray("coal",collected)!==-1&&$.inArray("coal",used)===-1){dialogue_box.display({character:!1,picture:!1,text:"The furnace want's to eat a coal.",options:["Ok","No!"]},"big");$("#options").on("click","#option_0",function(){setTimeout(function(){items.use("#coal");$("#option_0").click(function(){dialogue_box.destroy();scene.no_click(!0);setTimeout(function(){npc.furnace.furnace().text_cloud("Nom, nom, nom.",750);npc.furnace.is_eating()},500)})},500)})}$("#options").on("click","#option_1",function(){dialogue_box.destroy()})},is_eating:function(){var a=npc.furnace.mouth(),b=npc.furnace.eyes(),c=function(){setTimeout(function(){if($.inArray("coal",used)===-1||$.inArray("twig",used)===-1||$.inArray("note",used)===-1){Modernizr.csstransitions?a.transition({top:"-=80"},250).transition({top:"+=80"},100,function(){sound_clong.play()}):a.animate({top:"-=80"},250).animate({top:"+=80"},100,function(){sound_clong.play()});npc.furnace.furnace().text_cloud("I want more!",1e3);scene.no_click(!1)}else npc.furnace.is_strong()},500)};b.animate({opacity:.5},375).animate({opacity:0},375);Modernizr.csstransitions?a.transition({top:"-=80"},250).transition({top:"+=80"},100,function(){sound_clang.play()}).transition({top:"-=80"},100).transition({top:"+=80"},100,function(){sound_clang.play()}).transition({top:"-=80"},100).transition({top:"+=80"},100,function(){sound_clang.play();c()}):a.animate({top:"-=80"},250).animate({top:"+=80"},100,function(){sound_clang.play()}).animate({top:"-=80"},100).animate({top:"+=80"},100,function(){sound_clang.play()}).animate({top:"-=80"},100).animate({top:"+=80"},100,function(){sound_clang.play();c()})},is_strong:function(){var a=npc.furnace.furnace(),b=npc.furnace.body(),c=npc.furnace.eyes(),d=npc.furnace.mouth(),e=npc.furnace.fire();a.text_cloud("YEAH!",2e3);d.attr("style","");if(!Modernizr.csstransitions){b.css({rotate:"rotate(0deg)"});b.animate({top:15},500,function(){sound_screech.play()}).animate({top:-3},100).delay(300).animate({top:15},100).animate({top:0},500)}else b.transition({top:15,rotate:0},500,function(){sound_screech.play()}).transition({top:-3},100).transition({top:15,delay:300},100).transition({top:0},500);a.delay(600).animate({top:"-=20"},200).animate({top:"+=20"},100,function(){sound_clang.play()});d.animate({top:435},700).animate({top:515},200).animate({top:495},100).animate({top:515},100,function(){scene.no_click(!1);sound_clong.play();soundManager.resume("boiler_room");a.text_cloud("Thank you man!",2e3);setTimeout(function(){a.text_cloud("Check your room! Things have changed!",2e3)},3e3);npc.furnace.burn();npc.furnace.random_moves();var b=$.jStorage.get("played");b.push("scene_furnace");$.jStorage.set("played",b);npc.furnace.furnace_use().remove()})},is_weak:function(){var a=npc.furnace.furnace(),b=npc.furnace.body(),c=npc.furnace.eyes(),d=npc.furnace.mouth(),e=npc.furnace.fire();scene.no_click(!0);$.inArray("twig",used)===-1?a.text_cloud("I'm weak...",2e3):$.inArray("note",used)===-1?a.text_cloud("Help me please...",2e3):$.inArray("coal",used)===-1&&a.text_cloud("Still hungry...",2e3);e.animate({opacity:.5},1700).animate({opacity:0},300,function(){scene.no_click(!1);npc.furnace.has_food()});sound_screech.play();if(!Modernizr.csstransitions){b.animate({top:5,rotate:1},1700).animate({top:10,rotate:-0.5},100).animate({top:7},50).animate({top:10},50).animate({top:8},50).animate({top:10},50);d.animate({top:"-=10"},1700).animate({top:"+=10"},100,function(){sound_clong.play()}).animate({top:"-=7"},50).animate({top:"+=7"},50).animate({top:"-=5"},50).animate({top:"+=5"},50,function(){sound_clang.play()})}else{b.transition({top:5,rotate:1},1700).transition({top:10,rotate:-0.5},100).transition({top:7},50).transition({top:10},50).transition({top:8},50).transition({top:10},50);d.transition({top:"-=10"},1700).transition({top:"+=10"},100,function(){sound_clong.play()}).transition({top:"-=7"},50).transition({top:"+=7"},50).transition({top:"-=5"},50).transition({top:"+=5"},50,function(){sound_clang.play()})}},random_moves:function(){var a=npc.furnace.body();window.timer=setInterval(function(){var b=Math.random()*1;b>.5?a.transition({rotate:.5},500).transition({rotate:1},200).transition({rotate:-0.5},500).transition({rotate:-2},200).transition({rotate:.5},500).transition({rotate:1},200).transition({rotate:-0.5},500).transition({rotate:-2},200).transition({rotate:0},300):a.transition({top:"-=5",rotate:1},500).transition({top:"+=20"},200).transition({top:"-=15",rotate:-2},500).transition({top:"+=5"},500).transition({top:"-=5",rotate:0},500)},(Math.random()*8+6)*1e3)}}};