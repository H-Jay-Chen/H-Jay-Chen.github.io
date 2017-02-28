///  小练习1  ///

//第一阶段
//在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用半角逗号来作为不同爱好的分隔。
//当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔符分开后保存到一个数组，过滤掉空的、重复的爱好，在按钮下方创建一个段落显示处理后的爱好。
	function finishHandler() {
		var pattern = /\s*[\,\，]{1}\s*/;
			//console.log(escape($("#myInput").value));
		var str = $("#myInput").value.trim();
		var strArr = str.split(pattern);
			//console.log(strArr.length);
			//for (var i = 0; i < strArr.length; i++) {
			//	console.log(strArr[i]);
			//}
		var uniStrArr = uniqArray_2(strArr);
		var showStr = "";
		for (var i = 0; i < uniStrArr.length; i++) {
			showStr += (" "+uniStrArr[i]);
		}
		if ($("#firstSpan")){
			$("#firstSpan").innerHTML = showStr;
		}
		else {
			var show = document.createElement("span");
			show.id = "firstSpan";
			$("#firstStep").appendChild(show);
			show.innerHTML = showStr;
		}
	}
	
	$.click("#myBtn",finishHandler);


//第二阶段
//单行变成多行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔。
//当点击按钮时的行为同上
	function secondHandler() {
		var pattern = /[\n\s\,\，\、\;\；]+/;
			//console.log(escape($("#myInput").value));
		var str = $("#secondInput").value.trim();
		var strArr = str.split(pattern);
			//console.log(strArr.length);
			//for (var i = 0; i < strArr.length; i++) {
			//	console.log(strArr[i]);
			//}
		var uniStrArr = uniqArray_2(strArr);
		var showStr = "";
		for (var i = 0; i < uniStrArr.length; i++) {
			showStr += (" "+uniStrArr[i]);
		}
		if ($("#secondSpan")){
			$("#secondSpan").innerHTML = showStr;
		}
		else {
			var show = document.createElement("span");
			show.id = "secondSpan";
			$("#secondStep").appendChild(show);
			show.innerHTML = showStr;
		}
	}

	$.click("#secondBtn",secondHandler);



//第三阶段
//用户输入的爱好数量不能超过10个，也不能什么都不输入。当发生异常时，在按钮上方显示一段红色的错误提示文字，并且不继续执行后面的行为；当输入正确时，提示文字消失。
//同时，当点击按钮时，不再是输出到一个段落，而是每一个爱好输出成为一个checkbox，爱好内容作为checkbox的label。
	function thirdHandler() {
		var pattern = /[\n\s\,\，\、\;\；]+/;
			//console.log(escape($("#myInput").value));
		var str = $("#thirdInput").value.trim();
		var strArr = str.split(pattern);
			console.log(strArr.length);
			for (var i = 0; i < strArr.length; i++) {
				console.log(strArr[i]);
			}
		if (strArr.length===1&&strArr[0]===""){
			var error = document.createElement("p");
			$("#thirdStep").insertBefore(error,$("#thirdBtn"));
			error.innerHTML = "Please enter you funs!";
			error.id = "showError";
		}
		else if(strArr.length>10){
			if($("#showError")){
				$("#showError").innerHTML = "You couldn't enter more than 10 funs!";
			}
			else{
				var error = document.createElement("p");
				$("#thirdStep").insertBefore(error,$("#thirdBtn"));
				error.innerHTML = "You couldn't enter more than 10 funs!";
				error.id = "showError";
			}
		}
		else {
			if($("#showError")){
				$("#thirdStep").removeChild($("#showError"));
			}
			var uniStrArr = uniqArray_2(strArr);
		/*	var showStr = "";
			for (var i = 0; i < uniStrArr.length; i++) {
				showStr += (" "+uniStrArr[i]);
			}
			if ($("#thirdSpan")){
				$("#thirdSpan").innerHTML = showStr;
			}
			else {
				var show = document.createElement("span");
				show.id = "thirdSpan";
				$("#thirdStep").appendChild(show);
				show.innerHTML = showStr;
			}
		*/	
			for (var i = 0; i < uniStrArr.length; i++) {
				var input = document.createElement("input");
				input.type = "checkbox";
				input.name = uniStrArr[i];
				input.value = uniStrArr[i];
				var label = document.createElement("label");
				label.innerHTML = uniStrArr[i];
				$("#thirdStep").appendChild(document.createElement("br"));
				$("#thirdStep").appendChild(input);
				$("#thirdStep").appendChild(label);
			}
		}
	}

	$.click("#thirdBtn",thirdHandler);



///  小练习2  ///

//任务描述
//在和上一任务同一目录下面创建一个task0002_2.html文件，在js目录中创建task0002_2.js，并在其中编码，实现一个倒计时功能。

//界面首先有一个文本输入框，允许按照特定的格式YYYY-MM-DD输入年月日；
//输入框旁有一个按钮，点击按钮后，计算当前距离输入的日期的00:00:00有多少时间差
//在页面中显示，距离YYYY年MM月DD日还有XX天XX小时XX分XX秒
//每一秒钟更新倒计时上显示的数
//如果时差为0，则倒计时停止

	//单击按钮触发事件
	function submitHandler() {
		var pattern = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
		if(!pattern.test($("#timeStop").value)) {
			alert("日期格式错误，请重新输入！");
		}
		setTimeout(caculateTime,1000);
	}

	//定时触发事件
	function caculateTime() {
		var dateArr = $("#timeStop").value.split("-");
			//console.log(dateArr.length "个；"+ dateArr[0] "年"+ dateArr[1] "月"+ dateArr[2]"日");
		var stop = new Date(dateArr[0], dateArr[1]-1, dateArr[2], 0);
			//console.log(stop);
		$("#stopTime").innerHTML = "距离"+dateArr[0]+"年"+ dateArr[1] +"月"+ dateArr[2]+"日"+"还有";

		var now = new Date();
		if (stop < now) {
			alert("请填写大于当前日期的值");
			return null;
		}
		var lastTime = stop - now;
			//console.log(lastTime);
		if (lastTime===0) {
			return null;
		}
		var showTimeArr = new Array();
		showTimeArr[0] = Math.floor(lastTime/(1*24*60*60*1000));
		showTimeArr[1] = Math.floor((lastTime%(1*24*60*60*1000))/(1*60*60*1000));
		showTimeArr[2] = Math.floor(((lastTime%(1*24*60*60*1000))%(1*60*60*1000))/(1*60*1000));
		showTimeArr[3] = Math.floor((((lastTime%(1*24*60*60*1000))%(1*60*60*1000))%(1*60*1000))/(1*1000));

		$("#lastTime").innerHTML = showTimeArr[0]+"天"+showTimeArr[1]+"小时"+showTimeArr[2]+"分"+showTimeArr[3]+"秒！"
		setTimeout(caculateTime,1000);

	}

	$.click("#submitBtn",submitHandler);





///  小练习4：输入提示框  ///
//在和上一任务同一目录下面创建一个task0002_4.html文件，在js目录中创建task0002_4.js，并在其中编码，实现一个类似百度搜索框的输入提示的功能。

//要求如下：
//允许使用鼠标点击选中提示栏中的某个选项
//允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
//选中后，提示内容变更到输入框中

//初级班：
//不要求和后端交互，可以自己伪造一份提示数据例如：
//var suggestData = ['Simon', 'Erik', 'Kener'];

//中级班：
//自己搭建一个后端Server，使用Ajax来获取提示数据











///  小练习5：界面拖拽交互  ///

//实现一个可拖拽交互的界面
//如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
//被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
//注意拖拽释放后，要添加到准确的位置
//拖拽到什么位置认为是可以添加到新容器的规则自己定
//注意交互中良好的用户体验和使用引导



//////////跨浏览器的事件处理程序与事件对象////////////////////////////////////////
var EventUtil = {
		addHandler : function(element,type,handler){
			if (element.addEventListener) {
				element.addEventListener(type,handler,false);            //DOM2级事件处理程序
			}
			else if (element.attachEvent) {
				element.attachEvent("on"+type,handler);                 //IE中的事件处理程序
			}
			else {
				element["on"+type] = handler;                            //DOM 0级事件处理程序
			}
		},

		removeHandler : function(element,type,handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type,handler,false);
			}
			else if (element.detachEvent) {
				element.detachEvent("on"+type,handler);
			}
			else {
				element["on"+type] = null;
			}
		},

		getEvent : function(event) {
			return event ? event : window.event;      //DOM中的事件对象，与IE中的事件对象
		},

		getTarget : function(event) {
			return event.target || event.srcElement;
		},

		preventDefault : function(event) {
			if (event.preventDefault) {
				event.preventDefault();
			}
			else {
				event.returnValue = false;
			}
		},

		stopPropagation: function(event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			}
			else {
				event.cancelBubble = ture;
			}
		}
	};
////////////////////////////////////////////////////////////////////

	var prevX,       //用于存储光标点击时的初始坐标
		prevY;
	var divObj;     //用于存储当前被拖动的方块DIV

	$.on("#leftContainer","mousedown",mouseDownHandler);
	$.on("#rightContainer","mousedown",mouseDownHandler);

	function mouseDownHandler(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		if (target.className == "container") {
			return null;
		}

		var positionX = parseInt(target.offsetLeft),
			positionY = parseInt(target.offsetTop);
			//console.log(positionX+"/"+positionY);

		target.style.opacity = 0.5;
		target.style.zIndex = 2;
		target.style.position = "absolute";
		target.style.left = positionX +"px";
		target.style.top = positionY +"px";
		//console.log(target.style.top);

		prevX = event.clientX;
		prevY = event.clientY;
		//console.log(prevX+"/"+prevY);

		divObj = target;
		$.on("#practic5","mousemove",mouseMoveHandler);
		EventUtil.addHandler(divObj,"mouseup",mouseUpHandler);
	}


	function mouseMoveHandler(event) {
		event = EventUtil.getEvent(event);

		var checkClient = $("#practic5").getBoundingClientRect();
		if (event.clientX< checkClient.left || event.clientX> checkClient.right || event.clientY<checkClient.top || event.clientY> checkClient.bottom) {

			console.log("范围外！");

			$.un("#practic5","mousemove",mouseMoveHandler);
			EventUtil.removeHandler(divObj,"mouseup",mouseUpHandler);

			divObj.style.opacity = 1;
			divObj.style.zIndex = 0;
			divObj.style.position = "static";

			return null;
		}

		var changeX = event.clientX - prevX;     //计算光标每次移动坐标的增量
			changeY = event.clientY - prevY;
			//console.log(changeX);
		prevX = event.clientX;                 //把光标的当前坐标值存入变量，供下一轮函数调用时计算使用
		prevY = event.clientY;
		
		divObj.style.left = parseInt(divObj.style.left) + changeX + "px";  //把此次移动产生的坐标曾量累加到DIV方块的位置坐标上，使div随动。
		divObj.style.top = parseInt(divObj.style.top) + changeY + "px";

	}


	function mouseUpHandler(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		if (target.parentNode.id == "leftContainer") {           //如果是从左边拖出来的方块
			var rightDiv = $("#rightContainer").getBoundingClientRect();
			//console.log(rightDiv);
			//console.log(event.clientX+"/"+rightDiv.left+"/"+(event.clientX> rightDiv.left));
			
			if (event.clientX> rightDiv.left && event.clientX< rightDiv.right && event.clientY>rightDiv.top && event.clientY< rightDiv.bottom) {
				console.log("范围内！");
				$("#leftContainer").removeChild(divObj);
				$("#rightContainer").appendChild(divObj);

			}
		}
		else {                                                    //如果是从右边拖出来的方块
			var leftDiv = $("#leftContainer").getBoundingClientRect();
			//console.log(leftDiv);
			//console.log(event.clientX+"/"+leftDiv.left+"/"+(event.clientX> leftDiv.left));
			
			if (event.clientX> leftDiv.left && event.clientX< leftDiv.right && event.clientY>leftDiv.top && event.clientY< leftDiv.bottom) {
				console.log("范围内！");
				$("#rightContainer").removeChild(divObj);
				$("#leftContainer").appendChild(divObj);

			}
		}

		$.un("#practic5","mousemove",mouseMoveHandler);
		EventUtil.removeHandler(divObj,"mouseup",mouseUpHandler);

		divObj.style.opacity = 1;
		divObj.style.zIndex = 0;
		divObj.style.position = "static";
	}






