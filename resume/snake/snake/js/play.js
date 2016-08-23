$(function(){
	var wrap = $('#snakewrap');
	var ct = $('#content');
	var snakeArr = [];
	var direction = 't';
	var cols = parseInt(629/21);
	var rows = parseInt(419/21);
	var timer = null;
	var foodArr = new Array();
	var die = false;
	var score = 0;
	for(var i=0;i<4;i++){
		var snake = $('<div style="background:url(images/snake'+i+'.png) no-repeat"></div>');
		wrap.append(snake);
		snakeArr[i] = {row : 10+i, col : 10, div : snake, rotate : 't'};
		setPosition(snakeArr[i]);
	}
	
	$('#play').click(function(){
		clearInterval(timer);
		if(die == true){
			alert('click reply!');
			return false;
		}
		move();
	});
	
	function setPosition(obj){
		obj.div.css({top:obj.row*21,left:obj.col*21});
		obj.div.removeClass().addClass(obj.rotate);
	}
	
	function move(){
		timer = setInterval(function(){
			die = false;
			for(var i=snakeArr.length-1;i>0;i--){
				snakeArr[i].row = snakeArr[i-1].row;
				snakeArr[i].col = snakeArr[i-1].col;
				snakeArr[i].rotate = snakeArr[i-1].rotate;
			}
			switch(direction){
				case 'l' :
					snakeArr[0].col--;
					snakeArr[0].rotate = 'l';
					break;
				case 't' :
					snakeArr[0].row--;
					snakeArr[0].rotate = 't';
					break;
				case 'r' :
					snakeArr[0].col++;
					snakeArr[0].rotate = 'r';
					break;
				case 'b' :
					snakeArr[0].row++;
					snakeArr[0].rotate = 'b';
					break;
			}
			$(window).keydown(function(event){
				switch(event.keyCode){
					case 37 :
						direction = 'l';
						break;
					case 38 :
						direction = 't';
						break;
					case 39 :
						direction = 'r';
						break;
					case 40 :
						direction = 'b';
						break;
				}
			});
			
			if(snakeArr[0].col < 0 || snakeArr[0].row < 0 || snakeArr[0].col > cols || snakeArr[0].row > rows){
				die = true;
				clearInterval(timer);
				alert('Game Over');
				return false;
			}
			
			for(var i=1; i<snakeArr.length; i++){
				if(snakeArr[0].row == snakeArr[i].row && snakeArr[0].col == snakeArr[i].col){
					die = true;
					clearInterval(timer);
					alert('Game Over');
					return false;
				}
			}
			
			if(snakeArr[0].row == foodArr[0].row && snakeArr[0].col == foodArr[0].col){
				foodArr[0].div.css({'width':'21px','height':'21px','background':'url(images/snake1.png) no-repeat'});
				snakeArr.splice(snakeArr.length-1,0,foodArr[0]);
				foodArr.shift();
				score += 10;
				$('.score span:last()').html(score);
			}
			if(foodArr.length == 0){
				createfood();
			}
			
			for(var i=0;i<snakeArr.length;i++){
				setPosition(snakeArr[i]);
			}
		},300);
	}
	
	function createfood(){
		var r = parseInt(Math.random() * rows);
		var c = parseInt(Math.random() * cols);
		var crash = false;
		while(foodArr.length == 0){
			for(var i=0;i<snakeArr.length;i++){
				if(r == snakeArr[i].row && c == snakeArr[i].col){
					crash = true;
				}
			}
			if(!crash){
				var n = parseInt(Math.random() * 3);
				var food = $('<div style="width:20px;height:20px;position:absolute;z-index:9;background:url(images/fruit'+ n +'.jpg) no-repeat;"></div>');
				ct.append(food);
				foodArr.push({row : r , col : c , div : food});
				setPosition(foodArr[0]);
			}
		}
	}
	createfood();
	
	$('#replay').click(function(){
		location.reload();
	});
	
});

