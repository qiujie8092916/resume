$(function(){
	//擦除效果
	jQuery.extend(jQuery.easing, {
		easeOutBack: function (x, t, b, c, d, s){
			s = s || 1.3;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}
	});
	
	//nav初始化选中
	var navCurr = $("#navCurr");
	$("#navSelected").css("left", navCurr[0].offsetLeft);

	$("#navbar ul li").off("click").on("click", function(){
		$(this).parent("ul").children("li").each(function(){
			$(this).removeClass("custom_active")
			$(this).removeAttr("id")
		})
		$(this).addClass("custom_active")
		$(this).attr("id", "navCurr")
	})
		
	//nav里的链接hover效果
	$("#navbar ul li").hover(function(){
			if(!!$("#navSelected").stop(true).animate({left:$(this)[0].offsetLeft}, 400, "easeOutBack")){
				$(this).siblings().removeClass("custom_active").end().addClass("custom_active")
				$("#navSelected").width($(".custom_active").width())
			}
		}, function(){
			$(this).removeClass("custom_active");
			$("#navCurr").addClass("custom_active");
			$("#navSelected").stop(true).animate({left:navCurr[0].offsetLeft}, 300, "easeOutBack");
			$("#navSelected").width($(".custom_active").width())
		})
		
})