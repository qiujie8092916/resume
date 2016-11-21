$(function(){
		var $win = $(window)
		
		$('.site-wrapper-inner').fullpage({		
			sectionsColor: ['#f05c4d', '#686FB3', '#549fea', '#ffd863'],
			anchors: ['demo1', 'demo2', 'demo3', 'demo4'],
			menu: '#menu',
			resize: false,
			scrollOverflow: true,
			afterLoad: function(anchorLink, index){
				$("#navSelected").stop(true).animate({left:$(".active")[0].offsetLeft}, 300, "easeOutBack");
				$("#navSelected").width($(".active").width());
				
				scroll_animate(anchorLink)
			}
		});
		
		fill_data()	//fill pages with 'data.json'
		homepage_animate()	//#demo1's animation
		//scroll_animate($win)	//bind animation when scrolling
		bindTabActive()	//connect navigation with pages
		resize()
		$(window).resize(function(){resize()});
		setTimeout(function(){
			if($("footer")[0].offsetTop + 75 + 45 < $(window).height()){
				$("footer").css("position", "absolute")
				$("footer").css("bottom", 45)
			} else{
				$("footer").css("position", "initial")
				$("footer").css("margin-top", 20)
			}
		}, 100)
		
		$("#navSelected").width($(".active").width())
		$(".homebackground").css("height", $win.height())
		$win.resize(function() {
			$(".homebackground").css("height", $win.height())
		})
		
		$(".logo img").hover(function(){
					$("#persion2").animate({opacity: "1"}, 600)
			}, function(){
					$("#persion2").animate({opacity: "0"}, 600)
			}
		)
		
		$("#github").hover(function(){
			$(this).find("img").attr("src", "imgs/github_2.png")
		}, function(){
			$(this).find("img").attr("src", "imgs/github_1.png")
		})

		$(".ski_icon").find("img.icon").each(function(i, e){
			var id = $(this).attr("id")
			var id_flag = id.substring(id.indexOf("_")+1)
			var index = i
			$(this).off("click").on("click", function(){
				var calc = ""
				switch(index){
					case 0:
						calc = "calc(30px - 20px)";
						break;
					case 1:
						calc = "calc((100% - 240px) / 3 + 75px)";
						break;
					case 2:
						calc = "calc(2 * (100% - 240px) / 3 + 140px)";
						break;
					case 3:
						calc = "calc(100% - 30px)";
						break;
				}
				
				$("#triangle_up").css("left", calc)
				$(".icon_detail").children(".detailImg").each(function(){
					$(this).addClass("hidden")
				})
				$("#detail_"+id_flag).removeClass("hidden").fadeIn("fast")
			})
		})

		$(".ski_icon .li_icon .icon").each(function(){
			$(this).on("click", function(){
				if($(this).parents(".li_icon").css("transform") == "matrix(1, 0, 0, 1, 0, 0)" || $(this).parents(".li_icon").css("transform") == "none"){
					$(this).parents(".li_icon").css("-webkit-transform", "rotateY(360deg)")
					$(this).parents(".li_icon").css("-moz-transform", "rotateY(360deg)")
					$(this).parents(".li_icon").css("-ms-transform", "rotateY(360deg)")
					$(this).parents(".li_icon").css("-o-transform", "rotateY(360deg)")
					$(this).parents(".li_icon").css("transform", "rotateY(360deg)")
				} else{
					$(this).parents(".li_icon").css("-webkit-transform", "rotateY(0deg)")
					$(this).parents(".li_icon").css("-moz-transform", "rotateY(0deg)")
					$(this).parents(".li_icon").css("-ms-transform", "rotateY(0deg)")
					$(this).parents(".li_icon").css("-o-transform", "rotateY(0deg)")
					$(this).parents(".li_icon").css("transform", "rotateY(0deg)")
				}
			})
		})
		
		$(".cd-timeline-img").off("click").on("click", function(){
			$(this).parents(".cd-timeline-block").find("ul").slideToggle(400)
		})
		
})


var changeActive = function(e){
		e.parent().attr("id", "navCurr")
		e.parent().addClass("active")
}

var removeActive = function(e){
		e.parent().siblings().each(function(){
				$(this).removeClass("active")
				$(this).removeAttr("id")
		})
}

var php_console = function(){/*
	$.when(defer("php/sys_console.php")).done(function(data){
			//var json_result = eval('(' + data + ')');
			//var win = window.open("http://localhost:8080/Rlibrary/welcome.jsp");
			console.log("over")
	})*/
	var win = window.open("http://localhost:8080/Rlibrary/welcome.jsp");
}

var bindTabActive = function(){
	//擦除效果
	jQuery.extend(jQuery.easing, {
			easeOutBack: function (x, t, b, c, d, s){
					s = s || 1.3;
					return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			}
	});

//nav初始化选中
	var navCurr = $("#navCurr")
	$("#navSelected").css("left", navCurr[0].offsetLeft)
	
	$("#navbar ul li").off("click").on("click", function(){
			$(this).siblings("li").each(function(){
					$(this).removeAttr("id")
			})
			$(this).attr("id", "navCurr")
	})
	
	//nav里的链接hover效果
	$("#navbar ul li").hover(function(){
			if(!!$("#navSelected").stop(true).animate({left:$(this)[0].offsetLeft}, 400, "easeOutBack")){
					$(this).siblings().removeClass("active").end().addClass("active")
					$("#navSelected").width($(".active").width())
			}
	}, function(){
			$(this).removeClass("active")
			$("#navCurr").addClass("active")
			navCurr = $("#navCurr")
			$("#navSelected").stop(true).animate({left:navCurr[0].offsetLeft}, 300, "easeOutBack");
			$("#navSelected").width($(".active").width())
	})
}

var fill_data = function(){
	$.ajax({   
		type:"GET",
		url:"data.json",
		async: false,
		dataType: "json",
		success: function(data){
			$.each(data, function(i, item){
				var appends = ""
				
				if(i == "demo1"){
				//--------------------------------------------------------append demo1
					var fsize = ""
					$.each(item.fsize, function(ii, iitem){
						fsize += '<p class="fsize contenttitle">' + iitem + '</p>'
					})
					appends += '<div class="inner cover">\
												<h4 class="contenttitle"><strong>' + item.contenttitle + '</strong></h4>\
												<p class="decoration"></p>\
												<article style="margin-top: 20px">'+ fsize + '</article>\
											</div>'
					$('[data-anchor="'+i+'"] .fp-tableCell').append(appends)
					
				} else if(i == "demo2"){
				//--------------------------------------------------------append demo2
					var subtitle = '  <h3 class="animated subtitle cover"><strong>' + item.subtitle + '</strong></h3>\
														<div class="decoration"></div>\
													</div>\
													<div><h5 class="animated subt">' + item.subt + '</h5></div>'
					var article = '<div class="center-block article">\
														<div class="icon_div" style="height:100px;">\
															<ul class="list-unstyled list-inline ski_icon">\
																<li class="li_icon animated">\
																	<img src="imgs/html.png" class="icon animated" id="icon_html">\
																</li>\
																<li class="li_icon animated">\
																	<img src="imgs/css.png" class="icon animated" id="icon_css">\
																</li>\
																<li class="li_icon animated">\
																	<img src="imgs/js.png" class="icon animated" id="icon_js">\
																</li>\
																<li class="li_icon animated">\
																	<img src="imgs/more.png" class="icon animated" id="icon_more">\
																</li>\
															</ul>\
														</div>\
													</div>'
					var detail_out = '<div class="icon_detail text-center animated"><div id="triangle_up"></div>'
					var descripWords = '<div class="intro center-block hidden">'
					$.each(item, function(ii, iitem){
						if(ii.indexOf("detail") > -1){
							var detail_in = '<ul id="' + ii + '" class="list-unstyled detailImg">'
							if(ii !== "detail_html"){
								detail_in = '<ul id="' + ii + '" class="list-unstyled hidden detailImg">'
							}
							$.each(iitem, function(iii, iiitem){
								detail_in += '<li>' + iiitem + '</li>'
							})
							detail_in += "</ul>"
							detail_out += detail_in
						} else if(ii === "fsize_"){
							$.each(iitem, function(iii, iiitem){
								descripWords += '<p class="fsize_">' + iiitem + '</p>'
							})
						}
					})
					detail_out += '</div>'
					descripWords += '</div>'
					
					$('[data-anchor="'+i+'"] .fp-tableCell').append(subtitle + article)
					$('[data-anchor="'+i+'"] .fp-tableCell .article').append(descripWords)
					$('[data-anchor="'+i+'"] .fp-tableCell .article .icon_div').append(detail_out)
					
				} else if(i == "demo3"){
				//--------------------------------------------------------append demo3
					var subtitle = '<div class="inner cover" style="margin-top:1%;">\
														<h3 class="animated subtitle"><strong>' + item.subtitle + '</strong></h3>\
														<div class="decoration"></div>\
													</div>\
													<div><h5 class="animated subt">' + item.subt + '</h5></div>'
													
					var subbody = '<div class="major">'
					$.each(item.project, function(ii, iitem){
						for(var key in iitem){
							if(item.project[ii][key][0] === undefined){item.project[ii][key][0] = ''}
							if(item.project[ii][key][1] === undefined){item.project[ii][key][1] = ''}
							var base_sentense = '<div class="pro-module animated" data-index="'+ii+'">\
																		<img src="imgs/' + key + '.png" height="190" width="340" />\
																		<div class="background-shadow">\
																			<a href="/' + (key === "ci" ? key+'/vip.html' : key) + '" target="_blanck" class="btn btn_custom btn-default center-block">Check It</a>\
																		</div>\
																	</div>'
							if(ii >= 0 && ii < 3){
								base_sentense = base_sentense.replace('animated"', 'animated slideD"')
								if(ii === 0){base_sentense = base_sentense.replace('href="/' + key + '"', 'href="http://localhost:8080/Rlibrary/welcome.jsp"')}
							} else if(ii >= 3){
								base_sentense = base_sentense.replace('animated"', 'animated slideU"')
							}
							
							subbody += base_sentense
						}
					})
					subbody += '</div>'
					$('[data-anchor="'+i+'"] .fp-tableCell').append(subtitle + subbody)
					
					$(".background-shadow").each(function(){
						$(this).width($(this).siblings("img").width())
					})
				} else if(i == "demo4"){
				//--------------------------------------------------------append demo4
					var subtitle = '<div class="inner cover" style="/visibility:hidden;">\
														<h3 class="animated subtitle"><strong>' + item.subtitle + '</strong></h3>\
														<div class="decoration"></div>\
													</div>\
													<div><h5 class="animated subt">' + item.subt + '</h5></div>'
													
					var subbody =  '<div class="container-timeline" style="margin-top: 25px">\
														<section id="cd-timeline" class="cd-container">'
					$.each(item.experience, function(i, e){
						subbody += '<div class="cd-timeline-block">'
						$.each(e, function(ii, ee){
							if(ii === "picture"){
								subbody += '<div class="cd-timeline-img ' + ee + '-backgroundColor is-hidden">\
															<img src="imgs/' + ee + '.svg" alt="Picture">\
														</div>'
							} else{
								subbody += '<div class="cd-timeline-content is-hidden">\
													<div class="text-left"><h5><strong>' + ee[0] + '</strong></h5></div><hr>'
								subbody	+= '<ul style="display: none;">'
								$.each(ee[1], function(iii, eee){
									subbody	+= '<li class="text-left">' + eee + '</li>'
								})
								subbody	+= '</ul>'
								subbody += '<span class="cd-date">' + ii + '</span></div>'
							}
						})
						subbody += '</div>'
					})
					subbody += '</section></div>'
					$('#demo5').before(subtitle + subbody)
				}
			})
		},
		error: function(e,i){
			console.log(e.responseText)
			alert(i)
		}
	})  
}

var homepage_animate = function(){
	$(".decoration").css("width", 0)
	var $homebackground_id = $('[data-anchor="'+$("#navCurr").children().attr("href").substring(1)+'"]')

	$homebackground_id.find(".subt").removeClass("subt").addClass("swing")
	$homebackground_id.find(".contenttitle").removeClass("contenttitle").addClass("cover-heading")
	$homebackground_id.find(".decoration").css("width", $homebackground_id.find(".decoration").prev(".cover-heading").width())
	
	$homebackground_id.find(".li_icon").css("visibility", "visible").addClass("fadeInUp")
	setTimeout(function(){
		$homebackground_id.find(".li_icon").removeClass("fadeInUp")
		$homebackground_id.find(".icon_detail").css("visibility", "visible").addClass("fadeIn")
	}, 300)
	var $intro_p = $homebackground_id.find(".intro .fsize_")
	$homebackground_id.find(".intro").removeClass("hidden").animate({width:"100%"}, 500, function(){
		$intro_p.eq(0).animate({bottom:"0"}, 500, "linear", function(){
			$intro_p.eq(1).animate({bottom:"0"}, 500, "linear", function(){
				$intro_p.eq(2).animate({bottom:"0"}, 500, "linear", function(){
					$intro_p.eq(3).animate({bottom:"0"}, 500, "linear")
				})
			})
		})
	})

	$homebackground_id.find("#cd-timeline").addClass("before")
	$homebackground_id.find('.cd-timeline-block').each(function(){
		$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
	})
}

var scroll_animate = function(anchorLink){
		var $demo = $('[data-anchor="'+anchorLink+'"]')
		
		$(".decoration").css("width", 0)
		$demo.find(".contenttitle").removeClass("contenttitle").addClass("cover-heading")
		$demo.find(".subtitle").removeClass("subtitle").addClass("fadeInUp")
		if($demo.attr("data-anchor") == "demo1"){
			$demo.find(".decoration").css("width", $demo.find(".cover-heading").width())
		} else{
			$demo.find(".decoration").css("width", $demo.find(".fadeInUp").width())
		}

		$demo.find(".subt").removeClass("subt").addClass("swing")
		if($demo.find(".li_icon").css("visibility") != "visible"){
			$demo.find(".li_icon").css("visibility", "visible").addClass("fadeInUp")
		}
		setTimeout(function(){
			$demo.find(".li_icon").removeClass("fadeInUp")
			$demo.find(".icon_detail").css("visibility", "visible").addClass("fadeIn")
		}, 300)

		var $intro_p = $demo.find(".intro p")
		$demo.find(".intro").removeClass("hidden").animate({width:"100%"}, 500, "easeOutElastic", function(){
			$intro_p.eq(0).animate({bottom:"0"}, 500, "linear", function(){
				$intro_p.eq(1).animate({bottom:"0"}, 500, "linear", function(){
					$intro_p.eq(2).animate({bottom:"0"}, 500, "linear", function(){
						$intro_p.eq(3).animate({bottom:"0"}, 500, "linear")
					})
				})
			})
		})
		
		$demo.find("#cd-timeline").addClass("before")
		$demo.find('.cd-timeline-block').each(function(){
			$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		})

		$demo.find(".slideU").removeClass("slideU")
		$demo.find(".slideD").removeClass("slideD")

}

var resize = function(){
	if(document.body.offsetWidth <= 768){
		$(".major").find(".pro-module").each(function(i, e){
			var img_src = $(this).children("img").attr("src")
			if(img_src.indexOf("m_") === -1){
				img_src = img_src.substring(0, img_src.indexOf("/")+1) + "m_" + img_src.substring(img_src.indexOf("/")+1)
				$(this).children("img").attr("src", img_src)
			}
			$(this).removeClass("top").removeClass("bottom").removeClass("left").removeClass("right")
			if(i % 2 == 0){
				$(this).addClass("top").addClass("left").addClass("slideInLeft")
				$(this)
			} else{
				$(this).addClass("top").addClass("slideInRight")
			}
			
			$(this).children(".background-shadow").css("width", $(this).children("img").width())
			$(this).children(".background-shadow").css("height", $(this).children("img").height())
			
			$(this).children(".background-shadow").children("a").css("height", $(this).children("img").height())
			$(this).children(".background-shadow").children("a").css("width", $(this).children("img").width())
			$(this).children(".background-shadow").children("a").text("")
		})
	} else{
		$(".major").find(".pro-module").each(function(i, e){
			var img_src = $(this).children("img").attr("src")
			if(img_src.indexOf("m_") > -1){
				img_src = img_src.substring(0, img_src.indexOf("m_")) + img_src.substring(img_src.indexOf("m_")+2)
				$(this).children("img").attr("src", img_src)
			}
			$(this).removeClass("top").removeClass("bottom").removeClass("left").removeClass("right")
			switch(i){
				case 0:
					$(this).addClass("top").addClass("left");
					$(this).addClass("slideInDown");
					break;
				case 1:
					$(this).addClass("top");
					$(this).addClass("slideInDown");
					break;
				case 2:
					$(this).addClass("top").addClass("right");
					$(this).addClass("slideInDown");
					break;
				case 3:
					$(this).addClass("bottom").addClass("left");
					$(this).addClass("slideInUp");
					break;
				case 4:
					$(this).addClass("bottom");
					$(this).addClass("slideInUp");
					break;
				case 5:
					$(this).addClass("bottom").addClass("right");
					$(this).addClass("slideInUp");
					break;
				
			}
			
			$(this).children(".background-shadow").css("width", 340)
			$(this).children(".background-shadow").css("height", 190)
			
			$(this).children(".background-shadow").children("a").css("height", "initial")
			$(this).children(".background-shadow").children("a").css("width", "initial")
			$(this).children(".background-shadow").children("a").text("Check It")
		})
	}
}

function defer(url, data){
	var df = $.Deferred();
	$.ajax({
		type: "post",
 		url: url,
		data: data,
		async: false,
		success: function(data, textStatus){df.resolve(data);}
	});
	return df.promise();
}

Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}