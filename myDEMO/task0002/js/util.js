
//第2. JavaScript数据类型及语言基础
		
	// 判断arr是否为一个数组，返回一个bool值
		function isArra(arr){
			return arr instanceof Array;
		}
		function isArray(arr){
			return Array.isArray(arr);
		}


	// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
	// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
		function cloneObject(src) {
		    // your implement
		}


	// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
		function uniqArray_1(arr){
			for (var i =0, len =arr.length; i < len; i++) {
				if (typeof arr[i] != "string" && typeof arr[i] != "number") {
					console.log("arr["+i+"]"+" is "+typeof arr[i]);
					
				}
			}

			for (var i = 0; i < arr.length; i++) {
				JumpPoint:
				for (var j = i+1; j < arr.length; j++){
					if (arr[i]==arr[j]){
						arr.splice(j,1);
						continue JumpPoint;
					}
				}
			}

			return arr;
		}
		//实例实验
		//var obj={
		//	a:1,
		//	b:2
		//};
		//var a=[1,3,5,"abc",7,5,obj,4,"abc",3,2,1];
		//var b=uniqArray_2(a);
		//console.log(b);
		//console.log(a);
	
		function uniqArray_2(arr){
			for (var i =0, len =arr.length; i < len; i++) {
				if (typeof arr[i] != "string" && typeof arr[i] != "number") {
					console.log("arr["+i+"]"+" is "+typeof arr[i]);
					
				}
			}

			var arrBack = new Array(); 
			arrBack[0] = arr[0];
			for (var i = 1; i < arr.length; i++) {
				for (var j = 0; j < arrBack.length; j++) {
					if(arr[i] === arrBack[j]){
						break;
					}
					else if(j === arrBack.length-1){
						arrBack.push(arr[i]);
						break;
					}
					else{
						continue;
					}
				}
			}
			return arrBack;
		}


	//实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
	// 假定空白字符只有半角空格、Tab
	// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
		function simpleTrim(str) {
			var funStr = str, num = 0;
			for (var i = 0; i < funStr.length; i++) {
				if (funStr.charAt(i)===" " || funStr.charAt(i)==="	") {
					num++;
				}
				else{
					console.log("前有空格与Tab键共：" + num + "个。");
					funStr = funStr.slice(num);
					break;
				}
			}
			num = funStr.length;
			for (var j = funStr.length-1; j > 0; j--) {
				if (funStr.charAt(j)===" " || funStr.charAt(j)==="	") {
					num--;
				}
				else {
					console.log("后有空格与Tab键共：" + (funStr.length-num) + "个。");
					funStr = funStr.slice(0,num);
					break;
				}
			}
			return funStr;
		}
		// 使用示例
		//var STR = "   	this is a string!  		 ";
		//var backSTR = simpleTrim(STR);
		//console.log("返回字符串：" +backSTR);
		//console.log("首字符为：" +backSTR.charAt(0));
		//console.log("末字符为：" +backSTR.charAt(backSTR.length-1));


	// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
	// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
	// 尝试使用一行简洁的正则表达式完成该题目
		function trim(str) {
		    var pattern = /^\s+|\s+$/g ;
		    if (pattern.test(str)) {
		    	return str.replace(pattern,"");
		    }
		    else {
		    	return str;
		    }
		}
		// 使用示例
		//var str = '   		ninini';
		//str = trim(str);
		//console.log(str); // 'hi!'
	

	// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
		function each(arr, fn) {
		    // your implement
		    for (var i = 0; i < arr.length; i++) {
		    	//fn(arr[i]);
		    	fn(arr[i],i);     // 其中fn函数可以接受两个参数：item和index
		    }
		}
		
		// 使用示例 1
		//var arr = ['java', 'c', 'php', 'html'];
		//function output_1(item) {
		//    console.log(item);
		//}
		//each(arr, output_1);  // 输出：java, c, php, html

		// 使用示例 2
		//var arr = ['java', 'c', 'php', 'html'];
		//function output_2(item, index) {
		//    console.log(index + ': ' + item)
		//}
		//each(arr, output_2);  // 输出：0:java, 1:c, 2:php, 3:html



	// 判断是否为邮箱地址
		function isEmail(emailStr) {
		    // your implement
		    var pattern_E = /(\w+)@(\w+\.com)/ig;
		    return pattern_E.test(emailStr);
		}

	// 判断是否为手机号
		function isMobilePhone(phone) {
		    // your implement
		    var pattern_P = /(^\d{4}-\d{11}$)|(^\d{11}$)/g;
		    return pattern_P.test(phone);
		}

		// 使用示例
		//var email = "1361147@qq.com";
		//var Phone = "0369-13611431919";
		//console.log(isEmail(email));
		//console.log(isMobilePhone(Phone));


	// 获取一个对象里面第一层元素的数量，返回一个整数
		function getObjectLength_my(obj) {
			var i = 0;
			for (var arr in obj){
				i++;
			}
			return i;
		}

		// 使用示例
		//var obj = {
		//    a: 1,
		//   b: 2,
		//    c: {
		//        c1: 3,
		//        c2: 4
		//    }
		//};
		//console.log(getObjectLength(obj)); // 3

			//网上找的
			//第一种：
			function getObjectLength(obj){
			    var length=0;
			    for(var propName in obj){
			        if(obj.hasOwnProperty(propName)){
			            length++;
			        }
			    }
			    return length;
			}
			//第二种:
			function getObjectLength_2(obj){
			    var length=0;
			    return Object.keys(obj).length;//键值
			}
			//思路：
			//for in语句会枚举出对象的所有属性，我们这里不需要全部属性，只需要对象的实例属性，所以还要用hasOwnProperty属性过滤一遍. 
			//第二种：直接用Object.keys(obj)方法,返回的也是实例属性.但是貌似是es5里面的. 
			//另外提一下，Object.getOwnPropertyNames(obj),可以返回obj的所有属性，但是好像也是es5的.



//第3. DOM

	// 为element增加一个样式名为newClassName的新样式
		// 方案一，兼容绝大部分浏览器。
		function addClass(element, newClassName) {
	    	// your implement
		    var trimClassName = element.className.trim();
		    var classNames = trimClassName.split(/\s+/);
		    console.log(classNames.length);
		    if (!element.className || !trimClassName) {
		    	console.log("className type is :"  + typeof element.className);
		    	element.className = newClassName;
		    }
		    else {
		    	for (var i = 0; i < classNames.length; i++) {
		    		if (classNames[i] === newClassName) {
		    			console.log("This class was existed!");
		    			return;
		    		}
		    	}
		    	var j = classNames.length;
		    	classNames[j] = newClassName;
		    	element.className = classNames.join(" ");
		    }
		}

		// 方案二，仅Firefox 3.6+ 和 chrome 支持classList属性。
		function addClass_2(element, newClassName){
			element.classList.add(newClassName);
		}


	// 移除element中的样式oldClassName
		function removeClass(element, oldClassName) {
		    // your implement
		    var classNames = element.className.split(/\s+/);
		    againFor:
		    for (var i = 0; i < classNames.length; i++) {
		    	if (classNames[i] === oldClassName) {
		    		classNames.splice(i,1);
		    		continue againFor;
		    	}
		    }
		    element.className = classNames.join(" ");
		}

	// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
		function isSiblingNode(element, siblingNode) {
		    // your implement
		    return element.parentNode===siblingNode.parentNode;

		}

	// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
		function getPosition(element) {
		    // your implement
		    var x = 0,
		    	y = 0;

		    for (var currentEle = element; currentEle.offsetParent ; currentEle = currentEle.offsetParent) {
		    	x += currentEle.offsetLeft;
		    	y += currentEle.offsetTop;
		    }
		    return {x,y};
		}


	//实现一个简单的Query
		// 可以通过id获取DOM对象，通过#标示，例如
		//$("#adom"); // 返回id为adom的DOM对象

		// 可以通过tagName获取DOM对象，例如
		//$("a"); // 返回第一个<a>对象

		// 可以通过样式名称获取DOM对象，例如
		//$(".classa"); // 返回第一个样式定义包含classa的对象

		// 可以通过attribute匹配获取DOM对象，例如
		//$("[data-log]"); // 返回第一个包含属性data-log的对象

		//$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

		// 可以通过简单的组合提高查询便利性，例如
		//$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
		function $(selector) {
			selector = selector.trim();
			var pattern_a = /^\#[a-z][\w\_]*$/,
				pattern_b = /^[a-z]+$/,
				pattern_c = /^\.[a-z][\w\_]*$/,
				pattern_d = /^\[[a-z][\w\-]+\]$/,
				pattern_e = /^\[[a-z][\w\-]+\s*\=\s*\d+\]$/,
				pattern_f = /^(\#[a-z][\w\_]*)\s+(\.[a-z][\w\_]*)$/;

			if (pattern_a.test(selector)) {
				//console.log("A匹配ed");
				var idName = selector.slice(1);
				return document.getElementById(idName);
			}
			else if (pattern_b.test(selector)) {
				console.log("B匹配ed");
				return document.getElementsByTagName(selector)[0];
			}
			else if (pattern_c.test(selector)) {
				console.log("C匹配ed");
				var className = selector.slice(1);
				var children = document.getElementsByClassName(className);
				return children[0];
			}
			else if (pattern_d.test(selector)) {
				console.log("D匹配ed");
				var allElement = document.getElementsByTagName("*");
				for (var i = 0; i < allElement.length; i++) {
					var attr = selector.slice(1,selector.length-1);
					//console.log(attr);
					if (allElement[i].hasAttribute(attr)){
						return allElement[i];
					}
				}
			}
			else if (pattern_e.test(selector)) {
				console.log("E匹配ed");
				var selector = selector.slice(1,selector.length-1);
				var attr = selector.split(/\s*\=\s*/);
				var allElement = document.getElementsByTagName("*");
				for (var i = 0; i < allElement.length; i++) {
					if (allElement[i].hasAttribute(attr[0]) && allElement[i].getAttribute(attr[0]) == attr[1] ){
						return allElement[i];
					}
				}
			}
			else if (pattern_f.test(selector)) {
				console.log("F匹配ed");
				var selector = selector.split(/\s+/);
				var parentEle = $(selector[0]);
				//console.log(selector[1]);
				var children = parentEle.getElementsByClassName(selector[1].slice(1));
				return children[0];
			}
			else {
				console.log("格式错误");
			}
		}
	


//第4. 事件

	
		function eventListener(){
			console.log("The eventListener was on.");
		}

	// 给一个element绑定一个针对event事件的响应，响应函数为listener
		function addEvent(element, event, listener) {
		    // your implement
		    if (element.addEventListener) {
		    	element.addEventListener(event,listener,false);   //支持DOM2级的浏览器。
		    }
		    else if (element.attachEvent) {
		    	element.attachEvent("on"+event,listener);      // IE浏览器。
		    }
		    else {
		    	element["on"+event] = listener;     // 支持DOM0级的浏览器。
		    }
		}

	// 移除element对象对于event事件发生时执行listener的响应
		function removeEvent(element, event, listener) {
		    // your implement
		    if (element.removeEventListener) {
		    	element.removeEventListener(event,listener,false);   //支持DOM2级的浏览器。
		    }
		    else if (element.detachEvent) {
		    	element.detachEvent("on"+event,listener);      // IE浏览器。
		    }
		    else {
		    	element["on"+event] = null;     // 支持DOM0级的浏览器。
		    }
		}

	// 实现对click事件的绑定
		function addClickEvent(element, listener) {
		    // your implement
		    if (element.addEventListener) {
		    	element.addEventListener("click",listener,false);
		    }
		    else if (element.attachEvent) {
		    	element.attachEvent("onclick",listener);
		    }
		    else {
		    	element.onclick = listener;
		    }
		}

	// 实现对于按Enter键时的事件绑定
		function addEnterEvent(element, listener) {
		    // your implement
		    addEvent(element,"keydown",function(event){	if (event.keyCode = 13) {	listener.call(element,event);	}   });
		}

	//接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
		//$.on = addEvent;
		//$.un = removeEvent;
		//$.click = addClickEvent;
		//$.enter = addEnterEvent;


	// 事件代理  ，先来简单一些的
		function delegateEvent(element, tag, eventName, listener) {
		    // your implement
		    addEvent(element,eventName, function(event){
		            if (event.target&&event.target.nodeName.toLowerCase()==tag) {
		                listener.call(event.target,event);
		            }
		        });
		}

		//$.delegate = delegateEvent;
		// 使用示例
		// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
		//$.delegate($("#list"), "li", "click", clickListener);

	
	//对前面的事件函数做封装
		$.on = function(selector, event, listener) {
		    // your implement
		    var element = $(selector);
		    addEvent(element,event,listener);
		}

		$.click = function(selector, listener) {
		    // your implement
		    var element = $(selector);
		    addClickEvent(element,listener);
		}

		$.un = function(selector, event, listener) {
		    // your implement
		    var element = $(selector);
		    removeEvent(element,event,listener);
		}

		$.delegate = function(selector, tag, event, listener) {
		    // your implement
		    var element = $(selector);
		    var eventName = event;
		    addEvent(element,eventName, function(event){
		        if (event.target&&event.target.nodeName.toLowerCase()==tag) {
		            listener.call(event.target,event);
		        }
		    });
		}

		// 使用示例：
		//$.on("#classes","click",eventListener);
		//$.un("#classes","click",eventListener);
		//$.click("#classes",eventListener);
		//$.click("#btn",function() {
		//	    			$("#list").innerHTML = "<li>new item</li>";
		//				} 
		//		);
		//$.delegate("#list","li","click",eventListener);



//第5.BOM的基础练习
		
	// 判断是否为IE浏览器，返回-1或者版本号
		function isIE() {
		    // your implement
		    if (myBrowser()==="IE") {
		    	return navigator.appVersion;
		    }
		    else {
		    	return "-1";
		    }
		}
		//网上找的代码,判断浏览器的类型的,(运行效果不理想)
		function myBrowser(){
		    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		    var isOpera = userAgent.indexOf("Opera") > -1;
		    if (isOpera) {
		        return "Opera";
		    } //判断是否Opera浏览器
		    else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		        return "IE";
		    } //判断是否IE浏览器
		    else if (userAgent.indexOf("Firefox") > -1) {
		        return "FF";
		    } //判断是否Firefox浏览器
		    else if (userAgent.indexOf("Chrome") > -1){
		    	return "Chrome";
		    } //判断是否Chrome浏览器
		    else if (userAgent.indexOf("Safari") > -1) {
		        return "Safari";
		    } //判断是否Safari浏览器
		    else {
		    	return "unknow";
		    }
		}

	// 设置cookie(名-值-过期时间/天)
		function setCookie(cookieName, cookieValue, expiredays) {
		    // your implement
		    var exdate = new Date();
		    exdate.setDate(exdate.getDate() + expiredays);
		    document.cookie  = escape(cookieName) + "=" + escape(cookieValue) + ((expiredays==null)?"":"; expires=" + exdate.toGMTString());
		    //console.log(document.cookie);
		}

	// 获取cookie值
		function getCookie(cookieName) {
		    // your implement
		    var arr,
		    	reg = RegExp("(^|)"+escape(cookieName)+"=([^\\;]*)(\\;|$)");
		    arr = document.cookie.match(reg);
		    //console.log(arr);
		    if (arr) {
		    	return unescape(arr[2]);
		    }
		    else {
		    	return null;
		    }
		}

	// 删除cookie值
		function delectCookie(cookieName) {
			var expire = new Date();
			expire.setDate(expire.getDate() -1);  //把过期时间expries设置为过去时可以立即删除cookie
			var cookieValue = getCookie(cookieName);
			if (cookieValue!=null) {
				document.cookie = escape(cookieName) + "=" + escape(cookieValue) + "; expires=" + expire.toGMTString();
			}
		}

	//检测cookie是否已有值
		function checkCookie() {
			username = getCookie('username');
			if (username!=null && username!="") {
		  		alert('Welcome again '+username+'!');
		  	}
			else {
		  		username=prompt('Please enter your name:',"");
		  		if (username!=null && username!=""){
		    		setCookie('username',username,365);
		    		//console.log(getCookie("username"));
		    	}
		  	}
		}

	    //实例运行
		//console.log(isIE());
		//document.body.onload = checkCookie();



