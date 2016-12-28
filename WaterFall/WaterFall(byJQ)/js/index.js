$(window).on ('load',function() {
	waterfall('main','box');

	//模拟一个后端传入的JSON数据；
	var dataInt = {
		"data" : [{"src":"23.jpg"},{"src":"24.jpg"},{"src":"25.jpg"},{"src":"26.jpg"},{"src":"27.jpg"},{"src":"28.jpg"},{"src":"29.jpg"},{"src":"30.jpg"},{"src":"31.jpg"},{"src":"32.jpg"},{"src":"33.jpg"},{"src":"34.jpg"}]
	}
	
	$(window).on('scroll', function() {
		
		//console.log(checkScrollSlide());
		if (checkScrollSlide()) {
			var $oParent = $('#main');
			//将数据块渲染到当前页面的尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var $oBox = $("<div class='box'><div class='pic'><img></div></div>");
				$oParent.append($oBox);
				$('.box:last img').attr('src','img/'+ dataInt.data[i].src);
			}
			waterfall('main','box');
		}

	});
	
});



function waterfall(parent,box) {
	//将main下所有的class为box 的元素取出来
	var $oParent = $("#"+parent);
	var $oBoxs = $oParent.children("."+box);
	//计算整个页面显示的列数（页面宽/box宽）
	var oBoxW = $oBoxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/oBoxW);
	//设置main的宽度
	$oParent.css({'width': oBoxW*cols+'px' ,'margin': '0 auto'});
	//or///$oParent.width(oBoxW*cols).css('margin': '0 auto');

	var hArr = [];  //存放每一列总高度的数组
	$oBoxs.each(function(index,value) {
		var h = $oBoxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index] = h;
		}
		else{
			var minH = Math.min.apply(null,hArr);
			var minHindex = $.inArray(minH,hArr);   //获取数组中最小高度那一列对应的索引；
			$(value).css({
				'position':'absolute',
				'top': minH+'px',
				'left': minHindex*oBoxW+'px'
			});
			hArr[minHindex] += h;
		}
	});



}


//检测是否具备了滚条加载数据块的条件
function checkScrollSlide() {
	var $oBoxLast = $('#main>.box').last();
	var lastBoxH = $oBoxLast.offset().top + Math.floor($oBoxLast.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var height = $(window).height();
	return (lastBoxH<scrollTop+height)? true:false;

}