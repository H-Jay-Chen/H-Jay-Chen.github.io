window.onload = function() {
	waterfall('main','box');

	//模拟一个后端传入的JSON数据；
	var dataInt = {
		"data" : [{"src":"23.jpg"},{"src":"24.jpg"},{"src":"25.jpg"},{"src":"26.jpg"},{"src":"27.jpg"},{"src":"28.jpg"},{"src":"29.jpg"},{"src":"30.jpg"},{"src":"31.jpg"},{"src":"32.jpg"},{"src":"33.jpg"},{"src":"34.jpg"}]
	}
	
	window.onscroll = function() {
		
		//console.log(checkScrollSlide());
		if (checkScrollSlide()) {
			var oParent = document.getElementById('main');
			//将数据块渲染到当前页面的尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = 'img/'+ dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}

	}
	
}



function waterfall(parent,box) {
	//将main下所有的class为box 的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽/box宽）
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽度
	oParent.style.cssText = 'width:'+oBoxW*cols+"px;margin: 0 auto;";

	var hArr = [];  //存放每一列总高度的数组
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);  //第一行直接推入每张图片高度
		}
		else {
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);   //获取数组中最小高度那一列对应的索引；
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + "px";
			oBoxs[i].style.left = oBoxW*index+"px";
			//改变数组最小高度的值
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}

}

//根据class获取元素
function getByClass(parent,clsName) {
	var boxArr = new Array(),
		oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if (oElements[i].className == clsName) {
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//获取数组中最小高度那一列对应的索引；
function getMinhIndex (arr,val) {
	for (var i in arr) {
		if(val == arr[i]) {
			return i;
		}
	}
}

//检测是否具备了滚条加载数据块的条件
function checkScrollSlide() {
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)? true:false;

}