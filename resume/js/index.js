$(function(){
		var $win = $(window)
		
		$(".decoration").css("width", 0)
		
		setTimeout(function(){
			var $homebackground_id = $($("#navCurr").children().attr("href"))
			$homebackground_id.find(".subt").removeClass("subt").addClass("swing")
			$homebackground_id.find(".contenttitle").removeClass("contenttitle").addClass("cover-heading")
			$homebackground_id.find(".decoration").css("width", $homebackground_id.find(".decoration").prev(".cover-heading").width())
			
			$homebackground_id.find(".li_icon").css("visibility", "visible").addClass("fadeInDown")
			setTimeout(function(){
				$homebackground_id.find(".li_icon").removeClass("fadeInDown")
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
								d4 = $("#demo4").offset().top;
						a.stopImmediatePropagation()
						
						if(y >= h / 2){
								hBtn.fadeIn(1).removeClass(upOM).addClass(upM);
						} else if(y < h / 3){
								hBtn.fadeOut(1000).removeClass(upM).addClass(upOM);
						} else{
								hBtn.fadeOut(1000).removeClass(upM).addClass(upOM);
						}
						
						var $bnt, $demo
						if(y <= d2){	//res <= 1
								$bnt = $("#demo1Btn"); $demo = $("#demo1")
						} else if(y > d2 && y <= d3){	//(1) < res && res <= (2)
								$bnt = $("#demo2Btn"); $demo = $("#demo2")
						} else if(y > d3 && y <= d4){	//(2) <res
								$bnt = $("#demo3Btn"); $demo = $("#demo3")
						} else if(y > d4){
								$bnt = $("#demo4Btn"); $demo = $("#demo4")
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
								$demo.find(".li_icon").css("visibility", "visible").addClass("fadeInDown")
							}
							setTimeout(function(){
								$demo.find(".li_icon").removeClass("fadeInDown")
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
				}, 200);
		})
		
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
		
		var s = $(".ski_icon").find(".li_icon:nth-child(2)")
		s.css("left", "calc(50% - "+s.width()/2+"px)")	
		$("#navSelected").width($(".custom_active").width())
		$(".homebackground").css("height", $(window).height())
		$(window).resize(function() {
			$(".homebackground").css("height", $(window).height())
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
			$("#triangle_up").css("left", "10px")
			
			$("#detail_css").fadeOut("fast", function(){
				$("#detail_js").fadeOut("fast", function(){
					$("#detail_html").fadeIn("fast")
				})
			})
		})
		
		$("#icon_css").off("click").on("click", function(){
			$("#triangle_up").css("left", "calc(50% - 10px)")
			
			$("#detail_html").fadeOut("fast", function(){
				$("#detail_js").fadeOut("fast", function(){
					$("#detail_css").fadeIn("fast")
				})
			})
		})
		
		$("#icon_js").off("click").on("click", function(){
			$("#triangle_up").css("left", "calc(100% - 30px)")
			
			$("#detail_html").fadeOut("fast", function(){
				$("#detail_css").fadeOut("fast", function(){
					$("#detail_js").fadeIn("fast")
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

var php_console = function(){
	$.when(defer("php/sys_console.php")).done(function(data){
			//var json_result = eval('(' + data + ')');
			//var win = window.open("http://localhost:8080/Rlibrary/welcome.jsp");
			console.log("over")
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