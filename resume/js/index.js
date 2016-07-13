$(function(){
		new WOW().init()
		$("[id*='Btn']").stop(true).on('click', function (e){e.preventDefault();$(this).scrolld()})
		
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