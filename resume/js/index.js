$(function(){
		var $win = $(window)
		
		$(".decoration").css("width", 0)
		setTimeout(function(){
			var $homebackground_id = $($("#navCurr").children().attr("href"))
			$homebackground_id.find(".subt").removeClass("subt").addClass("swing")
			$homebackground_id.find(".contenttitle").removeClass("contenttitle").addClass("cover-heading")
			$homebackground_id.find(".decoration").css("width", $homebackground_id.find(".decoration").prev(".cover-heading").width())
		},300)
		
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
						$demo.find(".decoration").css("width", $demo.find(".fadeInUp").width())
						setTimeout(function(){$demo.find(".subt").removeClass("subt").addClass("swing")}, 800)
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