$(function(){
		var $win = $(window)
		
		fill_data()	//fill pages with 'data.json'
		homepage_animate()	//#demo1's animation
		scroll_animate($win)	//bind animation when scrolling
		bindTabActive()	//connect navigation with pages
		
		$("#navSelected").width($(".custom_active").width())
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

		$("#icon_html").off("click").on("click", function(){
			$("#triangle_up").css("left", "calc(30px - 20px)")
			
			$("#detail_css").fadeOut("fast", function(){
				$("#detail_js").fadeOut("fast", function(){
					$("#detail_more").fadeOut("fast", function(){
						$("#detail_html").fadeIn("fast")
					})
				})
			})
		})
		
		$("#icon_css").off("click").on("click", function(){
			$("#triangle_up").css("left", "calc((100% - 240px) / 3 + 75px)")
			
			$("#detail_html").fadeOut("fast", function(){
				$("#detail_js").fadeOut("fast", function(){
					$("#detail_more").fadeOut("fast", function(){
						$("#detail_css").fadeIn("fast")
					})
				})
			})
		})
		
		$("#icon_js").off("click").on("click", function(){
			$("#triangle_up").css("left", "calc(2 * (100% - 240px) / 3 + 140px)")
			
			$("#detail_html").fadeOut("fast", function(){
				$("#detail_css").fadeOut("fast", function(){
					$("#detail_more").fadeOut("fast", function(){
						$("#detail_js").fadeIn("fast")
					})
				})
			})
		})
		
		$("#icon_more").off("click").on("click", function(){
			$("#triangle_up").css("left", "calc(100% - 30px)")
			
			$("#detail_html").fadeOut("fast", function(){
				$("#detail_css").fadeOut("fast", function(){
					$("#detail_js").fadeOut("fast", function(){
						$("#detail_more").fadeIn("fast")
					})
				})
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
		
})


var changeActive = function(e){
		e.parent().attr("id", "navCurr")
		e.parent().addClass("custom_active")
}

var removeActive = function(e){
		e.parent().siblings().each(function(){
				$(this).removeClass("custom_active")
				$(this).removeAttr("id")
		})
}

var php_console = function(){
	$.when(defer("php/sys_console.php")).done(function(data){
			//var json_result = eval('(' + data + ')');
			//var win = window.open("http://localhost:8080/Rlibrary/welcome.jsp");
			console.log("over")
	})
}

var bindTabActive = function(){
	if($(document).width() <= 768){
		$("ul.nav.navbar-nav.navbar-right li a").on("click", function(){
			//$("ul.nav.navbar-nav.navbar-right").toggle()
			$("#navbar").removeClass("in")
			$("button.navbar-toggle").css("background", "transparent")
		})
		
		$("button.navbar-toggle.collapsed").click(function(){
				if(!$("#navbar").hasClass("in")){
						$(this).css("background", "#ddd")
				} else{
						$(this).css("background", "transparent")
				}
		})
	}

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
					$(this).siblings().removeClass("custom_active").end().addClass("custom_active")
					$("#navSelected").width($(".custom_active").width())
			}
	}, function(){
			$(this).removeClass("custom_active")
			$("#navCurr").addClass("custom_active")
			navCurr = $("#navCurr")
			$("#navSelected").stop(true).animate({left:navCurr[0].offsetLeft}, 300, "easeOutBack");
			$("#navSelected").width($(".custom_active").width())
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
					appends += '<div class="inner cover" style="/visibility:hidden; margin-top:210px;">\
												<h4 class="contenttitle"><strong>' + item.contenttitle + '</strong></h4>\
												<p class="decoration"></p>\
												<article style="margin-top: 20px">'+ fsize + '</article>\
											</div>'
					$("#"+i).append(appends)
					
				} else if(i == "demo2"){
				//--------------------------------------------------------append demo2
					var subtitle = '<div class="inner cover" style="/visibility:hidden; margin-top:3%;">\
														<h3 class="animated subtitle"><strong>' + item.subtitle + '</strong></h3>\
														<div class="decoration"></div>\
													</div>\
													<h5 class="animated subt">' + item.subt + '</h5>'
					var article = '<div class="center-block article" style="width:35%;">\
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
					
					$("#" + i).append(subtitle + article)
					$("#" + i + " .article").append(descripWords)
					$("#" + i + " .article .icon_div").append(detail_out)
					
				} else if(i == "demo3"){
				//--------------------------------------------------------append demo3
					var subtitle = '<div class="inner cover" style="margin-top:1%;">\
														<h3 class="animated subtitle"><strong>' + item.subtitle + '</strong></h3>\
														<div class="decoration"></div>\
													</div>\
													<h5 class="animated subt">' + item.subt + '</h5>'
													
					var subbody = '<div class="major col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1" style="position:absolute; top: 27%;">'
					$.each(item.project, function(ii, iitem){
						for(var key in item.project[ii]){
							var base_sentense = '<div class="col-lg-6 col-md-6 animated">\
																		<div class="col-lg-6 col-md-6">\
																			<div style="background-color:#fff"><img src="imgs/' + key + '.png" height="190px" width="100%"></div>\
																		</div>\
																		<p class="col-lg-6 col-md-6">\
																			'+ item.project[ii][key][0] + '<span class="divider"></span>' + item.project[ii][key][1] + '</span>\
																			<a href="/' + key + '" target="_blanck" class="btn btn_custom btn-default center-block">Check It</a>\
																		</p>\
																	</div>'
							if(ii === 0){
								base_sentense = base_sentense.replace('animated"', 'animated slideL" style="margin-bottom: 50px;"')	//href="javascript:php_console()"
								base_sentense = base_sentense.replace('href="/' + key + '"', 'href="http://localhost:8080/Rlibrary/welcome.jsp"')
							} else if(ii === 1){
								base_sentense = base_sentense.replace('animated"', 'animated slideR" style="margin-bottom: 50px;"')
							} else if(ii === 2){
								base_sentense = base_sentense.replace('animated"', 'animated slideL"')
							} else if(ii === 3){
								base_sentense = base_sentense.replace('animated"', 'animated slideR"')
							}
							
							subbody += base_sentense
						}
					})
					subbody += '</div>'
					$("#" + i).append(subtitle + subbody)
				
				} else if(i == "demo4"){
				//--------------------------------------------------------append demo4
					var subtitle = '<div class="inner cover" style="/visibility:hidden; margin-top: 2%">\
														<h3 class="animated subtitle"><strong>' + item.subtitle + '</strong></h3>\
														<div class="decoration"></div>\
													</div>\
													<h5 class="animated subt">' + item.subt + '</h5>'
													
					var subbody =  '<div class="timeline col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3" style="position:relative;">'
					$.each(item.experience, function(i, e){
						subbody += '<div class="timeline_item">\
													<div class="timeline_timebucket"><p>' + e[0] + '</p></div>\
													<div class="timeline_icon"></div>\
													<div class="timeline_content"><p>' + e[1] + '</p></div>\
												</div>'
					})
					subbody += '</div>'
					
					$("#" + i).append(subtitle + subbody)
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
	setTimeout(function(){
		var $homebackground_id = $($("#navCurr").children().attr("href"))
		$homebackground_id.find(".subt").removeClass("subt").addClass("swing")
		$homebackground_id.find(".contenttitle").removeClass("contenttitle").addClass("cover-heading")
		$homebackground_id.find(".decoration").css("width", $homebackground_id.find(".decoration").prev(".cover-heading").width())
		
		$homebackground_id.find(".li_icon").css("visibility", "visible").addClass("fadeInUp")
		setTimeout(function(){
			$homebackground_id.find(".li_icon").removeClass("fadeInUp")
			$homebackground_id.find(".icon_detail").css("visibility", "visible").addClass("fadeIn")
		}, 1000)
		var $intro_p = $homebackground_id.find(".intro .fsize_")
		$homebackground_id.find(".intro").removeClass("hidden").animate({width:"100%"}, 700, function(){
			$intro_p.eq(0).animate({bottom:"0"}, 600, "linear", function(){
				$intro_p.eq(1).animate({bottom:"0"}, 600, "linear", function(){
					$intro_p.eq(2).animate({bottom:"0"}, 600, "linear", function(){
						$intro_p.eq(3).animate({bottom:"0"}, 600, "linear")
					})
				})
			})
		})
	},300)
}

var scroll_animate = function($win){
	$win.scroll(function(a){
		setTimeout(function(){
			var y = $win.scrollTop()
			var h = $win.height()
			//var res = y / h
			var hBtn = $('.demo1Btn')
			var upM = 'upMotion'
			var upOM = 'upOutMotion'
			var d1 = $("#demo1").offset().top,
					d2 = $("#demo2").offset().top,
					d3 = $("#demo3").offset().top,
					d4 = $("#demo4").offset().top,
					d5 = $("#demo5").offset().top;
			a.stopImmediatePropagation()
			
			if(y >= h / 2){
					hBtn.fadeIn(1).removeClass(upOM).addClass(upM);
			} else if(y < h / 3){
					hBtn.fadeOut(1000).removeClass(upM).addClass(upOM);
			} else{
					hBtn.fadeOut(1000).removeClass(upM).addClass(upOM);
			}
			
			var $bnt, $demo
			if(y < d2){	//res <= 1
					$bnt = $("#demo1Btn"); $demo = $("#demo1")
			} else if(y >= d2 && y < d3){	//(1) < res && res <= (2)
					$bnt = $("#demo2Btn"); $demo = $("#demo2")
			} else if(y >= d3 && y < d4){	//(2) <res
					$bnt = $("#demo3Btn"); $demo = $("#demo3")
			} else if(y >= d4 && y <= d4 + 2){
					$bnt = $("#demo4Btn"); $demo = $("#demo4")
			} else if(y > d4 + 2){
					$bnt = $("#demo5Btn"); $demo = $("#demo5")
			}
			
			changeActive($bnt)
			removeActive($bnt)
			
			$(".decoration").css("width", 0)

			$demo.find(".contenttitle").removeClass("contenttitle").addClass("cover-heading")
			$demo.find(".subtitle").removeClass("subtitle").addClass("fadeInUp")
			if($demo.attr("id") == "demo1"){
				$demo.find(".decoration").css("width", $demo.find(".cover-heading").width())
			} else{
				$demo.find(".decoration").css("width", $demo.find(".fadeInUp").width())
			}
			setTimeout(function(){
				$demo.find(".subt").removeClass("subt").addClass("swing")
				if($demo.find(".li_icon").css("visibility") != "visible"){
					$demo.find(".li_icon").css("visibility", "visible").addClass("fadeInUp")
				}
				setTimeout(function(){
					$demo.find(".li_icon").removeClass("fadeInUp")
					$demo.find(".icon_detail").css("visibility", "visible").addClass("fadeIn")
				}, 1000)

				var $intro_p = $demo.find(".intro p")
				$demo.find(".intro").removeClass("hidden").animate({width:"100%"}, 700, "easeOutElastic", function(){
					$intro_p.eq(0).animate({bottom:"0"}, 600, "linear", function(){
						$intro_p.eq(1).animate({bottom:"0"}, 600, "linear", function(){
							$intro_p.eq(2).animate({bottom:"0"}, 600, "linear", function(){
								$intro_p.eq(3).animate({bottom:"0"}, 600, "linear")
							})
						})
					})
				})
			}, 800)
			
			setTimeout(function(){
				$demo.find(".slideL").removeClass("slideL").addClass("slideInLeft")
				$demo.find(".slideR").removeClass("slideR").addClass("slideInRight")
			},300)
			
			navCurr = $("#navCurr")
			$("#navSelected").stop(true).animate({left:navCurr[0].offsetLeft}, 300, "easeOutBack");
			$("#navSelected").width($(".custom_active").width())
			
			return false;
		}, 150);
	})
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