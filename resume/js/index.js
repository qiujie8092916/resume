$(function(){
		new WOW().init()
		$("[id*='Btn']").stop(true).on('click', function (e){
			e.preventDefault()
			$(this).scrolld({
				callback: function(){
					$(this).parent("li").parent("ul").children("li").each(function(){
						if($(this).hasClass("custom_active")){
							$(this).removeClass("custom_active")
						}
					})
					$(this).parent("li").addClass("custom_active")
				}
			})
		})
		/*
		$("[id*='Btn']").on('click', function (e){$(this).scrolld({
			callback: function(){
				$(this).parent("li").parent("ul").children("li").each(function(){
					if($(this).hasClass("custom_active")){
						$(this).removeClass("custom_active")
					}
				})
				$(this).parent("li").addClass("custom_active")
			}}
		)})*/
		
		
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
		
		$(".oneng").hover(function(){
				$(this).text("Resume")
		}, function(){
				$(this).text("个人简历")
		})
})