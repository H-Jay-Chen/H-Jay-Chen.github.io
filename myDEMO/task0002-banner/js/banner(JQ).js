
(function(win) {


////////全局变量//////////////////////////////////////////////////
	var timeSet, directionSet, loopSet;

	var imgWidth = $("#banner .img :first").width();   //获取轮播图的宽度；
	var maxIndex = $("#banner .img").length - 1 ;    //获取轮播图数量索引值的最大值；
	var currentPoint = 0;        //用于记忆点击时当前播放的图片index值(位置)
	var timer, timer_1;
	var $twoImg;          //$frontImg,$frontBtn,$behindImg,$behindBtn,

////////初始化操作//////////////////////////////////////////////////
	if ($("#banner").data("settime")!="" && $("#banner").data("direction")!="" && $("#banner").data("loop")!="") {
		
		timeSet = $("#banner").data("settime");              //设置间隔毫秒数；
		directionSet = $("#banner").data("direction");     //left为顺序轮播； 
		loopSet = $("#banner").data("loop");              //yes为循环轮播；
	} else {
		console.log("请为轮播组件标签输入初始化参数！");
		return null;
	}

	//检测图片数量。
	if ($("#banner .img").length>10 || $("#banner .img").length<2) {
		console.log("请插入2到10张图片！勿超出范围！");
		return null;
	}
	//有几张图就自动添加几个点击点。
	for (var i = 0; i < $("#banner .img").length; i++) {
		$("<li></li>").appendTo($("#button"));
	}
	//设置第一张图片加载时显示出来。
	$("#banner li:first").css('left','0px');
///////////////////////////////////////////////////////////////////////

	starBanner(timeSet,directionSet,loopSet);


//////////////////////////////////////////////////////////
	function starBanner(timeInterval,direction,loop) {

		var $arrImg = $("#banner .img");
		var $arrBtn = $("#button li");
		
		//此处作用是使计时器在页面切换到其他页时不继续计时触发。
		//避免回到页面时累积的函数瞬间爆发，大肆渲染，导致轮播混乱。
		window.onblur = function() {
			clearTimeout(timer);
			//console.log("setTimeout cleaned!");
		};
		window.onfocus = function() {
			clearTimeout(timer);                    //没有这句的话在FireFox中点击图片时会出现多个计时器同时作用的现象。
			timer = setTimeout (nextMove,timeSet);
			//console.log("setTimeout!");
		};

		var currImgIndex = currentPoint;

		$arrBtn.eq(currImgIndex).css("backgroundColor","white");

		//以下是开始为图片间隔轮播的计时回调函数
		timer = setTimeout (nextMove,timeInterval);

		function nextMove() {
			console.log("function action.");
			var $frontImg = $arrImg.eq(currImgIndex);
			var $frontBtn = $arrBtn.eq(currImgIndex);
			
			//如果正向播放
			if (direction == "right"){           
				currImgIndex += 1;
				if (currImgIndex == maxIndex+1){     //如果循环true且一圈已满，则循环下一圈；
					if (loop == "yes") {
						currImgIndex = 0;
					}
					else {
						return null;
					}
				}

				var $behindImg = $arrImg.eq(currImgIndex);
				var $behindBtn = $arrBtn.eq(currImgIndex);

				$twoImg = $frontImg.add($behindImg);
				$twoImg.animate({left: "-="+imgWidth},800,function(){

					if (this == $twoImg[1]) {
						$frontImg.css("left",imgWidth);
						$frontBtn.css("backgroundColor","");
						$behindBtn.css("backgroundColor","white");
						currentPoint = currImgIndex;
						console.log(currentPoint);
					}
				});
					

			}
			//如果逆向播放
			else {                
				currImgIndex -= 1;
				if (currImgIndex == -1){      //如果循环true且一圈已满，则循环下一圈；
					if (loop == "yes") {
						currImgIndex = maxIndex;
					}
					else {
						return null;
					}
				}

				var $behindImg = $arrImg.eq(currImgIndex);
				var $behindBtn = $arrBtn.eq(currImgIndex);
				
				$behindImg.css("left",-imgWidth);
				
				$twoImg = $frontImg.add($behindImg);
				$twoImg.animate({left: "+="+imgWidth},800,function(){

					if (this == $twoImg[1]) {
						$frontBtn.css("backgroundColor","");
						$behindBtn.css("backgroundColor","white");
						currentPoint = currImgIndex;
					}
				});
			}

			timer = setTimeout (nextMove,timeInterval);
		}
	}

/////////点击事件，用setInterval书写的//////////////////////////////////////////////////
	$("#button").click(function (event) {

		clearTimeout(timer);
		if ($("#banner .img").eq(currentPoint).css("left") != "0px") {
			$twoImg.stop();	
		}

		//获取点击的目标对象
		if (event.target) {
			var targetObj = event.target;
		}
		else {
			var targetObj = event.srcElement;
		}

		banQuick(targetObj);
	});

	function banQuick(tarObj) {
		if (tarObj.nodeName == "UL") {
			return null;
		}

		var $btnUl = $("#button");
		var $arrBtn = $("#button li");
		var clickIndex = $("#button li").index(tarObj);
		var $a_Img, $b_Img, $a_Btn, $b_Btn;

		//对当前两张图片进行复位。
		if ($("#banner .img").eq(currentPoint).position().left > 0) {
			$("#banner .img").eq(currentPoint).css("left","0px");
			if (currentPoint-1 == -1) {
				$("#banner .img").eq(maxIndex).css("left",imgWidth);
			}
			else{
				$("#banner .img").eq(currentPoint-1).css("left",imgWidth);
			}
			
		}
		else if ($("#banner .img").eq(currentPoint).position().left < 0) {
			$("#banner .img").eq(currentPoint).css("left","0px");
			if (currentPoint+1 == maxIndex+1) {
				$("#banner .img").eq(0).css("left",imgWidth);
			}
			else{
				$("#banner .img").eq(currentPoint+1).css("left",imgWidth);
			}
		}
		else{

		}
		
		//图片复位完以后，根据点击点clickIndex与当前点currentPoint的相对位置，进行多张图片的连续匀速切换。
		var i = currentPoint;
		if (clickIndex > currentPoint) {
			clearInterval(timer_1);
			timer_1 = setInterval(function() {
				
				$a_Img = $("#banner .img").eq(i);
				$a_Btn = $("#button li").eq(i);
				$b_Img = $("#banner .img").eq(i+1);
				$b_Btn = $("#button li").eq(i+1);

				var speed = -imgWidth/10;
				if ($a_Img.position().left == -imgWidth) {             //一张图片过完了

					$a_Img.css("left",imgWidth);
					$a_Btn.css("backgroundColor","");
					$b_Btn.css("backgroundColor","white");
					currentPoint += 1;       //用于记忆点击时当前播放的图片index值(位置)
					//console.log(currentPoint);

					if (i+1 == clickIndex) {           //到这里表示多张图片已经全部过完，可切换回正常播放模式starBanner
						clearInterval(timer_1);
						starBanner(timeSet,directionSet,loopSet);
					}
					else {
						i++;                //进入下一张图片的运动。
					}
				}
				else{
						$a_Img.css("left",$a_Img.position().left+speed);
						$b_Img.css("left",$b_Img.position().left+speed);
				}
			},10);
		}
		else if (clickIndex < currentPoint) {
			clearInterval(timer_1);
			$("#banner .img").eq(i-1).css("left",-imgWidth);
			timer_1 = setInterval(function() {
				
				$a_Img = $("#banner .img").eq(i);
				$a_Btn = $("#button li").eq(i);
				$b_Img = $("#banner .img").eq(i-1);
				$b_Btn = $("#button li").eq(i-1);

				var speed = imgWidth/10;
				if ($a_Img.position().left == imgWidth) {             //一张图片过完了

					$a_Img.css("left",imgWidth);
					$a_Btn.css("backgroundColor","");
					$b_Btn.css("backgroundColor","white");
					currentPoint -= 1;       //用于记忆点击时当前播放的图片index值(位置)
					//console.log(currentPoint);

					if (i-1 == clickIndex) {           //到这里表示多张图片已经全部过完，可切换回正常播放模式starBanner
						clearInterval(timer_1);
						starBanner(timeSet,directionSet,loopSet);
					}
					else {
						i--;                //进入下一张图片的运动。
						$("#banner .img ").eq(i-1).css("left",-imgWidth);
					}
				}
				else{
						$a_Img.css("left",$a_Img.position().left+speed);
						$b_Img.css("left",$b_Img.position().left+speed);
				}
			},10);
		}
		else{
			starBanner(timeSet,directionSet,loopSet);
		}
		
	}


////////点击事件，用JQ的.animate书写的////////////////////////////////////////////////////
	/*$("#button").click(function (event) {
		clearTimeout(timer);
		if ($("#banner .img").eq(currentPoint).position().left != 0) {
			$twoImg.stop();	
		}

		banQuick(event.target);
	});

	function banQuick (tarObj) {
		if (tarObj.nodeName == "UL") {
			return null;
		}

		var $btnUl = $("#button");
		var $arrBtn = $("#button li");
		var clickIndex = $("#button li").index(tarObj);
		var $a_Img, $b_Img, $a_Btn, $b_Btn,$two_Img;

		//对当前两张图片进行复位。
		if ($("#banner .img").eq(currentPoint).position().left > 0) {
			$("#banner .img").eq(currentPoint).css("left","0px");
			if (currentPoint-1 == -1) {
				$("#banner .img").eq(maxIndex).css("left",imgWidth);
			}
			else{
				$("#banner .img").eq(currentPoint-1).css("left",imgWidth);
			}
			
		}
		else if ($("#banner .img").eq(currentPoint).position().left < 0) {
			$("#banner .img").eq(currentPoint).css("left","0px");
			if (currentPoint+1 == maxIndex+1) {
				$("#banner .img").eq(0).css("left",imgWidth);
			}
			else{
				$("#banner .img").eq(currentPoint+1).css("left",imgWidth);
			}
		}
		else{
			//nothing has to do.
		}
		
		//图片复位完以后，根据点击点clickIndex与当前点currentPoint的相对位置，进行多张图片的连续匀速切换。
		var i = currentPoint;
		if (clickIndex > currentPoint) {
				
			$a_Img = $("#banner .img").eq(i);
			$a_Btn = $("#button li").eq(i);
			$b_Img = $("#banner .img").eq(i+1);
			$b_Btn = $("#button li").eq(i+1);
			$two_Img = $a_Img.add($b_Img);

			$two_Img.animate({left: "-="+imgWidth},80,function () {
				if (this == $two_Img[1]) {
					$a_Img.css("left",imgWidth);
					$a_Btn.css("backgroundColor","");
					$b_Btn.css("backgroundColor","white");
					currentPoint += 1;       //用于记忆点击时当前播放的图片index值(位置)
					//console.log(currentPoint);

					if (i+1 == clickIndex) {           //到这里表示多张图片已经全部过完，可切换回正常播放模式starBanner
						starBanner(timeSet,directionSet,loopSet);
						return null;
					}
					else {
						i++;                //进入下一组图片的运动。
						$a_Img = $("#banner .img").eq(i);
						$a_Btn = $("#button li").eq(i);
						$b_Img = $("#banner .img").eq(i+1);
						$b_Btn = $("#button li").eq(i+1);
						$two_Img = $a_Img.add($b_Img);
					}
					
					return $two_Img.animate({left: "-="+imgWidth},80,arguments.callee);

				}
			});

			
		}
		else if (clickIndex < currentPoint) {
			
			$a_Img = $("#banner .img").eq(i);
			$a_Btn = $("#button li").eq(i);
			$b_Img = $("#banner .img").eq(i-1);
			$b_Btn = $("#button li").eq(i-1);
			$two_Img = $a_Img.add($b_Img);

			$two_Img.animate({left: "+="+imgWidth},80,function () {
				if (this == $two_Img[1]) {
					$a_Btn.css("backgroundColor","");
					$b_Btn.css("backgroundColor","white");
					currentPoint -= 1;       //用于记忆点击时当前播放的图片index值(位置)
					//console.log(currentPoint);

					if (i-1 == clickIndex) {           //到这里表示多张图片已经全部过完，可切换回正常播放模式starBanner
						starBanner(timeSet,directionSet,loopSet);
						return null;
					}
					else {
						i--;                //进入下一组图片的运动。
						$a_Img = $("#banner .img").eq(i);
						$a_Btn = $("#button li").eq(i);
						$b_Img = $("#banner .img").eq(i-1);
						$b_Btn = $("#button li").eq(i-1);
						$b_Img.css("left",-imgWidth);
						$two_Img = $a_Img.add($b_Img);
					}
					
					return $two_Img.animate({left: "+="+imgWidth},80,arguments.callee);

				}
			});
		}
		else{
			starBanner(timeSet,directionSet,loopSet);
		}
	}*/







})(window);