﻿$(function(){
		//擦除效果
		jQuery.extend(jQuery.easing, {
				easeOutBack: function (x, t, b, c, d, s){
						s = s || 1.3;
						return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
				}
		});
	
	//nav初始化选中
		var $win = $(window)
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
						var hBtn = $('.demo1Btn')
						var upM = 'upMotion'
						var upOM = 'upOutMotion'
						a.stopImmediatePropagation()
						var res = y / h
						
						if(y >= h / 2){
								hBtn.fadeIn(1).removeClass(upOM).addClass(upM);
						} else if(y < h / 3){
								hBtn.fadeOut(1000).removeClass(upM).addClass(upOM);
						} else{
								hBtn.fadeOut(1000).removeClass(upM).addClass(upOM);
						}
						
						if(res < 2/3){
								changeActive($("#demo1Btn"))
								removeActive($("#demo1Btn"))
						} else if((2/3) <= res && res < (1+2/3)){
								changeActive($("#demo2Btn"))
								removeActive($("#demo2Btn"))
						} else if((1+2/3) <= res){
								changeActive($("#demo3Btn"))
								removeActive($("#demo3Btn"))
						}
						navCurr = $("#navCurr")
						$("#navSelected").stop(true).animate({left:navCurr[0].offsetLeft}, 300, "easeOutBack");
						$("#navSelected").width($(".custom_active").width())
						
						$(".decoration").css("width", "100px")
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
		/*
		$(".oneng").hover(function(){
				$(this).text("Resume")
		}, function(){
				$(this).text("个人简历")
		})*/
})