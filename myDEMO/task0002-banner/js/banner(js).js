///  轮播图 ///
//描述
//图片数量及URL均在HTML中写好
//可以配置轮播的顺序（正序、逆序）、是否循环、间隔时长
//图片切换的动画要流畅
//在轮播图下方自动生成对应图片的小点，点击小点，轮播图自动动画切换到对应的图片

//可以通过设置轮播模块的HTML标签中的
//data-settime="3000" 
//data-direction="right"/"left" 
//data-loop="yes"/"no"
//三个参数值来切换效果。



(function (win) {
	
////设置参数,从HTML元素标签的自定义属性获取初始化参数///////////////////////////////////////////////
	var banner = document.getElementById("banner");
	if (banner.dataset.settime!="" && banner.dataset.direction!="" && banner.dataset.loop!="") {
		var timeSet = banner.dataset.settime,              //设置间隔毫秒数；
			directionSet = banner.dataset.direction,       //true为顺序轮播； 
			loopSet = banner.dataset.loop;                 //true为循环轮播；
	}
	else {
		console.log("请为轮播组件标签输入初始化参数！")
		return null;
	}

	var btn = document.getElementById("button");  //用于绑定点击事件处理函数，事件代理者。
	var imgObjArr = document.querySelectorAll(".img");
	if (imgObjArr.length>10 || imgObjArr.length<2) {
		console.log("请插入2到10张图片！勿超出范围！");
		return null;
	}
	for (var i = 0; i < imgObjArr.length; i++) {
		var addBtn = document.createElement("li");
		btn.appendChild(addBtn);
	}

	imgObjArr[0].style.left = "0px";                           //设置第一张图片为加载即显示。
	var imgWidth = parseInt(getStyle(imgObjArr[0],"width"));   //获取轮播图的宽度；
	var maxIndex = imgObjArr.length - 1 ;    //获取轮播图数量索引值的最大值；
	var currentPoint = 0;        //用于记忆点击时当前播放的图片index值(位置)
	var timer, timer_0, timer_1;
	


	starBanner(timeSet,directionSet,loopSet);

//////////////////////////////////////////////////////////////////////////
	function starBanner(timeInterval,direction,loop) {
		// console.log(timeInterval);
		// console.log(direction);
		// console.log(loop);
		// console.log("currIndex:"+currentPoint);

		var arrImg = document.querySelectorAll(".img");
		var arrBtn = document.getElementById("button").querySelectorAll("li");

		//此处作用是使计时器在页面切换到其他页时不继续计时触发。
		//避免回到页面时累积的函数瞬间爆发，大肆渲染，导致轮播混乱。
		window.onblur = function() {
			clearTimeout(timer);
			console.log("setTimeout cleaned!");
		};
		window.onfocus = function() {
			clearTimeout(timer);       //没有这句的话在FireFox中点击图片时会出现多个计时器同时作用的现象。
			timer = setTimeout (nextMove,timeSet);
			console.log("setTimeout!");
		};
		
		var currImgIndex = currentPoint;
		arrBtn[currImgIndex].style.backgroundColor = "white";

		//以下是开始为图片间隔轮播的计时回调函数
		timer = setTimeout (nextMove,timeInterval);

		function nextMove() {
			console.log("function action.");
			var frontImg = arrImg[currImgIndex];
			var frontBtn = arrBtn[currImgIndex];
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

				var behindImg = arrImg[currImgIndex];
				var behindBtn = arrBtn[currImgIndex];

				moveBoth(frontImg,frontBtn,behindImg,behindBtn,currImgIndex);

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

				var behindImg = arrImg[currImgIndex];
				var behindBtn = arrBtn[currImgIndex];
				behindImg.style.left = -imgWidth + "px";
				
				moveBoth(frontImg,frontBtn,behindImg,behindBtn,currImgIndex);	
			}

			timer = setTimeout (nextMove,timeInterval);
		}

		function moveBoth(imgA,btnA,imgB,btnB,countB) {		
			//clearInterval(imgA.timer);
			var targetA;
			if (direction == "right") {
				targetA = -imgWidth;
			}
			else {
				targetA = imgWidth;
			}

			timer_0 = setTimeout(oneStep,20);

			function oneStep() {
				
				var speed = (targetA - imgA.offsetLeft)/10;
				speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
				if (imgA.offsetLeft == targetA) {             //一张图片过完了
					imgA.style.left = imgWidth+"px";
					btnA.style.backgroundColor = "";
					btnB.style.backgroundColor = "white";
					currentPoint = countB;       //用于记忆点击时当前播放的图片index值(位置)
				}
				else{
						imgA.style.left = imgA.offsetLeft+speed+"px";
						imgB.style.left = imgB.offsetLeft+speed+"px";
						timer_0 = setTimeout(oneStep,20);
				}
			}
		}

	}

///////////////////////////////////////////////////////////
	btn.onclick = function (event) {
		event = event ? event:window.event;

		clearTimeout(timer_0);
		clearTimeout(timer);
		clearTimeout(timer_1);

		//获取点击的目标对象
		if (event.target) {
			var targetObj = event.target;
		}
		else {
			var targetObj = event.srcElement;
		}

		banQuick(targetObj);
	}

	function banQuick(tarObj) {
		if (tarObj.nodeName == "UL") {
			return null;
		}

		var btnUl = document.getElementById("button");
		var arrBtn = btnUl.querySelectorAll("li");
		var clickIndex = index(tarObj,btnUl);

		//通过currImg的offsetLeft来判断当前出现在显示框中的是哪两张图，
		//再对其进行复位。
		var currImg = imgObjArr[currentPoint];
		if (currImg.offsetLeft > 0) {
			currImg.style.left = "0px";
			if (currentPoint-1 == -1) {
				imgObjArr[maxIndex].style.left = imgWidth +"px";
			}
			else{
				imgObjArr[currentPoint-1].style.left = imgWidth+"px";
			}
		}
		else if (currImg.offsetLeft < 0) {
			currImg.style.left = "0px";
			if (currentPoint+1 == maxIndex+1) {
				imgObjArr[0].style.left = imgWidth+"px";
			}
			else{
				imgObjArr[currentPoint+1].style.left = imgWidth+"px";
			}
		}
		else {
			//currImg.offsetLeft == 0
			//nothing has to do.
		}

		//图片复位完以后，根据点击点clickIndex与当前点currentPoint的相对位置，进行多张图片的连续匀速切换。
		var i = currentPoint;
		if (clickIndex > currentPoint) {
			clearInterval(timer_1);
			timer_1 = setInterval(function() {
				
				var img_a = imgObjArr[i];
				var img_b = imgObjArr[i+1];
				var btn_a = arrBtn[i];
				var btn_b = arrBtn[i+1];
				var speed = -imgWidth/10;
				if (img_a.offsetLeft == -imgWidth) {             //一张图片过完了

					img_a.style.left = imgWidth+"px";
					btn_a.style.backgroundColor = "";
					btn_b.style.backgroundColor = "white";
					currentPoint += 1;       //用于记忆点击时当前播放的图片index值(位置)
					//console.log(currentPoint);

					if (i == clickIndex-1) {           //到这里表示多张图片已经全部过完，可切换回正常播放模式starBanner
						clearInterval(timer_1);
						starBanner(timeSet,directionSet,loopSet);
					}
					else {
						i++;                //进入下一张图片的运动。
					}
				}
				else{
						img_a.style.left = img_a.offsetLeft+speed+"px";
						img_b.style.left = img_b.offsetLeft+speed+"px";
				}
			},10);
		}
		else if (clickIndex < currentPoint) {
			clearInterval(timer_1);
			imgObjArr[i-1].style.left = -imgWidth+"px";
			timer_1 = setInterval(function() {
				var img_a = imgObjArr[i];
				var img_b = imgObjArr[i-1];
				var btn_a = arrBtn[i];
				var btn_b = arrBtn[i-1];
				var speed = imgWidth/10;
				if (img_a.offsetLeft == imgWidth) {             //表示一张图片过完了
					
					btn_a.style.backgroundColor = "";
					btn_b.style.backgroundColor = "white";
					currentPoint -= 1;       //用于记忆点击时当前播放的图片index值(位置)
					//console.log(currentPoint);

					if (i == clickIndex+1) {          //到这里表示多张图片已经全部过完，可切换回正常播放模式starBanner
						clearInterval(timer_1);
						starBanner(timeSet,directionSet,loopSet);
					}
					else {                //进入下一张图片的运动。
						i--;
						imgObjArr[i-1].style.left = -imgWidth+"px";
					}
				}
				else{
						img_a.style.left = img_a.offsetLeft+speed+"px";
						img_b.style.left = img_b.offsetLeft+speed+"px";
				}
			},10);
		}
		else{
			starBanner(timeSet,directionSet,loopSet);
		}
		
	}
	
////////////////////////////////////////////////

////////用于获取元素的样式/////////////////////////
	function getStyle(obj,attr){
		if (obj.currentStyle) {                     //currentStyle针对IE浏览器
			//console.log("IE:"+obj.currentStyle[attr]);
			return obj.currentStyle[attr];
		}
		else {
			//console.log("firefox:"+getComputedStyle(obj,false)[attr]);
			return getComputedStyle(obj,false)[attr];      //getComputedStyle针对firefox浏览器
		}
	}
///////////////////////////////////////////////////
	// function addEvent(element, event, listener) {
	//     // your implement
	//     if (element.addEventListener) {
	//     	element.addEventListener(event,listener,false);   //支持DOM2级的浏览器。
	//     }
	//     else if (element.attachEvent) {
	//     	element.attachEvent("on"+event,listener);      // IE浏览器。
	//     }
	//     else {
	//     	element["on"+event] = listener;     // 支持DOM0级的浏览器。
	//     }
	// }

///////////////此处需要用到一个可以获取元素索引值的函数，在原生JS中只能自己定义一个来使用。
	function index (children,parent) {
		var childList = parent.childNodes;
		var elementChildList = [];
		for (var i = 0; i < childList.length; i++) {
			if (childList[i].nodeType == 1) {
				elementChildList.push(childList[i]);
			}
		}
		for (var j = 0; j < elementChildList.length; j++) {
			if (elementChildList[j] == children) {
				return j;
			}
		}
	}



})(window);