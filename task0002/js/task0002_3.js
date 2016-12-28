


///  小练习3 轮播图 ///
//任务描述
//在和上一任务同一目录下面创建一个task0002_3.html文件，在js目录中创建task0002_3.js，并在其中编码，实现一个轮播图的功能。

//图片数量及URL均在HTML中写好
//可以配置轮播的顺序（正序、逆序）、是否循环、间隔时长
//图片切换的动画要流畅
//在轮播图下方自动生成对应图片的小点，点击小点，轮播图自动动画切换到对应的图片
//效果示例：http://echarts.baidu.com/ 上面的轮播图（不需要做左右两个箭头）



////设置参数////
	var timeSet = 3000,            //设置间隔毫秒数；
		directionSet = true,       //true为顺序轮播； 
		loopSet = true;            //true为循环轮播；
	var imgObjArr = document.querySelectorAll(".img");
	var imgWidth = parseInt(getStyle(imgObjArr[0],"width"));   //获取轮播图的宽度；
	var maxIndex = imgObjArr.length - 1 ;    //获取轮播图数量索引值的最大值；
	
	var currentPoint = 0;        //用于记忆点击时当前播放的图片index值(位置)

////开始加载////
	window.onload = function() {
		//starBanner_1();

		if (directionSet == false) {      //此处用于设置逆向播放时，重最后一张图开始播。
			currentPoint = maxIndex;
			imgObjArr[maxIndex].style.left = 0+"px";
			imgObjArr[0].style.left = imgWidth+"px";
		}
		starBanner_3(timeSet,directionSet,loopSet,imgWidth,maxIndex);
		$.click("#button",clickHandler);
	}


/////////用于获取元素的样式，慕课上的封装的例子/////////////////////////
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
///////////////透明度变化///////////////////////
	function starBanner_1() {
		var obj_ul = document.querySelectorAll(".img");
		//console.log(obj_ul.length);
		var count = 0;
		//console.log(obj_ul[0]);
		setInterval(function(){
			var objImgUp = obj_ul[count];
			//console.log(objImgUp);
			objImgUp.style.zIndex = 2;
			
			count += 1;
			if (count == 6){
				count = 0;
			}
			
			var objImgDown = obj_ul[count];
			objImgDown.style.zIndex = 1; 

			starchange(objImgUp,0);

		},5000)
	}

///////////定时轮播////////////////////////// 
	
	var myTime;
	function starBanner_3 (timeInterval,direction,loop) {
		var obj_ul = document.querySelectorAll(".img");
		var obj_btn = document.getElementById("button").querySelectorAll("li");
		
		var count = currentPoint;
		obj_btn[count].style.backgroundColor = "white";

		//以下是开始为图片间隔轮播的计时回调函数
		myTime = setInterval (function() {       
			
			var objImgFront = obj_ul[count];
			var objBtnFront = obj_btn[count];
		//如果正向播放
			if (direction){           
				count += 1;
				if (count == maxIndex+1){     //如果循环true且一圈已满，则循环下一圈；
					if (loop) {
						count = 0;
					}
					else {
						clearInterval(myTime);
						return null;
					}
				}

				var objImgBehind = obj_ul[count];
				var objBtnBehind = obj_btn[count];

				moveBoth(objImgFront,-imgWidth,objBtnFront,objImgBehind,objBtnBehind,count);

			}
		//如果逆向播放
			else {                
				count -= 1;
				if (count == -1){      //如果循环true且一圈已满，则循环下一圈；
					if (loop) {
						count = maxIndex;
					}
					else {
						clearInterval(myTime);
						return null;
					}
				}

				var objImgBehind = obj_ul[count];
				var objBtnBehind = obj_btn[count];
				objImgBehind.style.left = -imgWidth + "px";
				
				moveBoth(objImgFront,imgWidth,objBtnFront,objImgBehind,objBtnBehind,count);	
			}
			
			
		},timeInterval);

	}


	function moveBoth(objA,targetA,objBtnA,objB,objBtnB,countB) {		
		clearInterval(objA.timer);
		objA.timer = setInterval(function(){
			
			var speed = (targetA - objA.offsetLeft)/10;
			speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
			if (objA.offsetLeft == targetA) {             //一张图片过完了
				objA.style.left = imgWidth+"px";
				objBtnA.style.backgroundColor = "";
				objBtnB.style.backgroundColor = "white";
				currentPoint = countB;       //用于记忆点击时当前播放的图片index值(位置)			
				clearInterval(objA.timer);
			}
			else{
					objA.style.left = objA.offsetLeft+speed+"px";
					objB.style.left = objB.offsetLeft+speed+"px";
			}
		},20);
	}


//////////点击事件//////////////////////////////////////

	//$.click("#button",clickHandler);

	function clickHandler (event) {
		event = event ? event:window.event;
		clearInterval(myTime);                   
		clearTimeout(timeOut);
		clearInterval(bQ2_timer);
		var obj_ul = document.querySelectorAll(".img");
		clearInterval(obj_ul[currentPoint].timer);           //清除moveBoth的计时器；
		//获取点击的目标对象
		if (event.target) {
			var targetObj = event.target;
		}
		else {
			var targetObj = event.srcElement;
		}
		bannerQuick_2(targetObj);
	}


	var timeOut, bQ2_timer;
	function bannerQuick_2 (obj) {

		//clearInterval(obj.timer);
		
		var obj_ul = document.querySelectorAll(".img");
		var obj_btn = document.getElementById("button").querySelectorAll("li");
		
		//判断点击点相对于当前点的位置
		var objIndex = index(obj,obj_btn);     //点击点的索引；
			console.log(objIndex);
		var count = currentPoint;              //当前点的索引；
		obj_btn[count].style.backgroundColor = "";
		obj_btn[objIndex].style.backgroundColor = "white";

		

		var objImgFront = obj_ul[count];
		objImgFront.style.left = 0+"px";              //点击发生后，复位当前count对应的图片（objImgFont）
		if (directionSet) {                            //点击发生后，判断播放方向来复位(objImgBehind)
			if (count == maxIndex) {
				var ind = 0;
			}
			else {
				var ind = count + 1;
			}
			obj_ul[ind].style.left = imgWidth+"px";
		}
		else {
			if (count ==0) {
				var ind = maxIndex;
			}
			else {
				var ind = count - 1;
			}
			obj_ul[ind].style.left = imgWidth+"px";
		}
		var objBtnFront = obj_btn[count];

		//count = count<=objIndex ? count+1:count-1
		if (count<objIndex) {
			count += 1;
			
			var objImgBehind = obj_ul[count];
			var objBtnBehind = obj_btn[count];
			
			var targetA = -imgWidth;
			objImgBehind.style.left = imgWidth + "px";
		}
		else if (count>objIndex) {
			count -= 1;
			
			var objImgBehind = obj_ul[count];
			var objBtnBehind = obj_btn[count];

			var targetA = imgWidth;
			objImgBehind.style.left = -imgWidth + "px";
		}
		else {
			count = count;

			timeOut = setTimeout(function(){
				starBanner_3 (timeSet,directionSet,loopSet);    ////////1秒后重新开始轮播，但是///////////
			},1000)                                                              /////2秒后调用starBanner_3还要在等timeSet秒才会动起来///
			return null;
		}
		

		bQ2_timer = setInterval(function(){
		
			if (objImgFront.offsetLeft == targetA) {
				
				currentPoint = count;       //记录behindImg变成frontImg的对应的count索引；
				objImgFront.style.left = imgWidth+"px";		
				objBtnFront.style.backgroundColor = "";
				objBtnBehind.style.backgroundColor = "white";

				if (count == objIndex) {        //如果此时已经达到点击点位置的图片，可以退出timer。
					console.log("已经达到点击点位置的图片");

					timeOut = setTimeout(function(){
						starBanner_3 (timeSet,directionSet,loopSet);    ////////1秒后重新开始轮播，但是///////////
					},1000)                                                               /////1秒后调用starBanner_3还要在等timeSet秒才会动起来///
					
					clearInterval(bQ2_timer);
					return null;
				}
				else if (count < objIndex) {

					objImgFront = obj_ul[count];
					objImgFront.style.left = 0+"px";
					objBtnFront = obj_btn[count];

					count += 1;

					objImgBehind = obj_ul[count];
					objBtnBehind = obj_btn[count];					
					objImgBehind.style.left = imgWidth + "px";

				}
				else {

					objImgFront = obj_ul[count];
					objImgFront.style.left = 0+"px";
					objBtnFront = obj_btn[count];

					count -= 1;

					objImgBehind = obj_ul[count];
					objBtnBehind = obj_btn[count];
					objImgBehind.style.left = -imgWidth + "px";
				}

					
			}
			else {

				speed = targetA > objImgFront.offsetLeft ? 20 : -20;
				
				objImgFront.style.left = objImgFront.offsetLeft+speed+"px";
				objImgBehind.style.left = objImgBehind.offsetLeft+speed+"px";
			}
		},3);

	}

	///////////////此处需要用到一个可以获取元素索引值的函数，在原生JS中只能自己定义一个来使用。
	function index (children,parent) {
		for (var i = 0; i < parent.length; i++) {
			if (parent[i] == children) {
				return i;
			}
		}
	}
	///////////////////////////////////////////




/*
//////////暂时不用/////////////////////////////////////////////////////////////////
	function moveFast(objA,targetA,objBtnA,objB,objBtnB,countB) {		
		clearInterval(objA.timer);
		objA.timer = setInterval(function(){
			
			speed = targetA > objA.offsetLeft ? 20 : -20;
			//var speed = (targetA - objA.offsetLeft)/3;
			//speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
			if (objA.offsetLeft == targetA) {
				objA.style.left = 600+"px";
				objBtnA.style.backgroundColor = "";
				objBtnB.style.backgroundColor = "white";
				currentPoint = countB;       //用于记忆点击时当前播放的图片index值(位置)
				clearInterval(objA.timer);
			}
			else{
					objA.style.left = objA.offsetLeft+speed+"px";
					objB.style.left = objB.offsetLeft+speed+"px";
			}
		},5);
	}

	var banTime;
	function bannerQuick (obj) {
		var obj_ul = document.querySelectorAll(".img");
		var obj_btn = document.getElementById("button").querySelectorAll("li");
		
		//判断点击点相对于当前点的位置
		var objIndex = index(obj,obj_btn);
			console.log(objIndex);
		obj_btn[objIndex].style.backgroundColor = "white";
		var count = currentPoint;
		obj_btn[count].style.backgroundColor = "";

		banTime = setInterval(function(){
			var objImgFront = obj_ul[count];
			objImgFront.style.left = 0+"px";
			var objBtnFront = obj_btn[count];
			
			if (objIndex>currentPoint) {      //如果点击点在当前点的右边，就往右move；
				count += 1;
				var target = -600;
			}
			else if (objIndex<currentPoint) {     //如果点击点在当前点的左边，就往左move；
				count -= 1;
				var direct = true;        //*1：用于在该函数内部判断轮播方向
				var target = 600;
			}
			else {
				clearInterval(banTime);
				setTimeout(function(){
					starBanner_3 (timeSet,directionSet,loopSet);    ////////五秒后重新开始自动循环播放///////////
				},5000)
				return null;
			}

			var objImgBehind = obj_ul[count];
			var objBtnBehind = obj_btn[count];
			if (direct) {                       //*1：在该函数内部判断轮播方向，逆向需要对objImgBehind处理.
				objImgBehind.style.left = -600 + "px";
			}
			else {
				objImgBehind.style.left = 600 + "px";
			}

			moveFast(objImgFront,target,objBtnFront,objImgBehind,objBtnBehind,count);
		},300);

	}

//////////////////////////////////////////////////////////////////////////
	function starBanner_2 (timeInterval,direction,loop) {
		var obj_ul = document.querySelectorAll(".img");
		var obj_btn = document.getElementById("button").querySelectorAll("li");
		
		//以下是判断正逆向并设置相应的初始状态
		if (direction) {           
			var count = 0;
			obj_btn[0].style.backgroundColor = "white";
		}
		else {
			var count = 5;
			obj_ul[5].style.left = 0+"px";  //逆向的话需要改变一下图片初始位置
			obj_ul[0].style.left = 600+"px";  //
			obj_btn[5].style.backgroundColor = "white";
			obj_btn[0].style.backgroundColor = "";
		}

		//以下是开始为图片间隔轮播的计时回调函数
		myTime = setInterval (function() {       
			
			var objImgFront = obj_ul[count];
			var objBtnFront = obj_btn[count];
		//如果正向播放
			if (direction){           
				count += 1;
				if (count == 6){     //如果循环true且一圈已满，则循环下一圈；
					if (loop) {
						count = 0;
					}
					else {
						clearInterval(myTime);
						return null;
					}
				}

				var objImgBehind = obj_ul[count];
				var objBtnBehind = obj_btn[count];

				moveBoth(objImgFront,-600,objBtnFront,objImgBehind,objBtnBehind,count);

			}
		//如果逆向播放
			else {                   
				count -= 1;
				if (count == -1){      //如果循环true且一圈已满，则循环下一圈；
					if (loop) {
						count = 5;
					}
					else {
						clearInterval(myTime);
						return null;
					}
				}

				var objImgBehind = obj_ul[count];
				var objBtnBehind = obj_btn[count];
				objImgBehind.style.left = -600 + "px";
				
				moveBoth(objImgFront,600,objBtnFront,objImgBehind,objBtnBehind,count);	
			}
			
			
		},timeInterval);

	}    //暂时不用。
*/	




///////////////////////////////////////////////////////////////////////////////////
//慕课的js动画效果练习
///////////////////////////////////////////////////////////////////////////////////

	//示例程序
	/*	window.onload = function() {
		//方块运动
			var oDiv = document.getElementById("movebox");
			oDiv.onmouseover = function() {
				starMove1(this,0);

			}
			oDiv.onmouseout = function() {
				starMove1(this,-100);
			}

		//浅绿色方块样式变化
			var div = document.getElementById("opacity");
			div.onmouseover = function() {
				//starchange(this,100);
				
				starMove(this,{width:200,height:200,opacity:100});
			}
			div.onmouseout = function() {
				//starchange(this,30);
				
				starMove(this,{width:100,height:100,opacity:30});
			}


		};
	*/	
		
	/////////////////////////////////////////////////////////
		//var timer;                          //此处的timer需要在全局中定义，否则在函数中定义会出奇怪的问题！！！
		function starMove1(obj,target) {		
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				//var oDiv = document.getElementById("movebox");
				var speed = (target - obj.offsetLeft)/30;
				speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
				if (obj.offsetLeft == target) {
					clearInterval(obj.timer);
				}
				else{           //此处不解：为何去掉ELSE就不行，div就不会停下来了呢？
						obj.style.left = obj.offsetLeft+speed+"px";
				}
			},30);
		}

		

	////用于透明度的渐变///////////////////
		//var alpha = 30;
		function starchange(obj,target) {
			clearInterval(obj.timer);
			//console.log("star");
			obj.style.opacity = 1;
			obj.timer = setInterval(function(){
				var speed = (target - obj.style.opacity*100)/10;
				speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
				//console.log(speed+"--"+obj.style.opacity);
				if (speed == 0) {
					obj.style.zIndex = 0;        //banner的
					obj.style.opacity = 1;       //banner的
					//console.log("finish");
					clearInterval(obj.timer);	
				}
				else {
					//obj.alpha += speed;
					//div.style.filter = "alpha(opacity:"+obj.alpha+")";    //IE中的透明度表示方式
					//obj.style.opacity = obj.alpha/100;                  //chrom的透明度表示
					obj.style.opacity = (obj.style.opacity*100 + speed)/100;
				}

			},30)
		}



	//////测试////////////////////////
		//var div = document.getElementById("opacity");
		//console.log(parseInt(div.style.height));   //  (div.style.height)这种形式的height必须写在html元素行内才有效。
		//console.log(parseInt(div.style["height"])); //同上
		//console.log(getComputedStyle(div,false)["width"]);

	////////////////////////////////////////
		
		//慕课上的封装的例子,用于获取某个obj的某个指定的样式attr
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

		//慕课上的封装的例子。可实现某个obj上的多个样式值同时变化的功能
		//function change(obj,{attr1:target1,attr2:target2,...},fn)
		function starMove(obj,json,fn){
			var flag = true; //假设
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				for(var attr in json){
					//取当前值
					var iCur = 0;
					if(attr == "opacity"){
						iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
					}
					else{
						iCur = parseInt(getStyle(obj,attr));

					}

					//计算速度
					var iSpeed = (json[attr]-iCur)/8;
					iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

					//检测停止
					if (iCur != json[attr]) {
						flag = false;
					}

					if (attr == "opacity") {
						obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
						obj.style.opacity = (iCur+iSpeed)/100;
					}
					else {
						obj.style[attr] = iCur + iSpeed + "px";
					}
				}
				if (flag) {
					clearInterval(obj.timer);
					if (fn) {
						fn();
					}
				}
			},30);
		}
