
$(function() {
	//使用变量缓存DOM对象
	var $photo = $("#photo");
	var $trash = $("#trash");
	//可以拖动包含图片的表项标记
	$("li", $photo).draggable({
		revert: "invalid", //拖动过程中停止时将返回原位
		helper: "clone", //以复制的方式拖动
		cursor: "move",
		zIndex: "2"
	});
	//将图片列表的图片拖动到回收站
	$trash.droppable({
		accept: "#photo li",
		activeClass: "highlight",
		drop: function(event, ui) {
			deleteImage(ui.draggable);
		}
	});
	//将回收站的图片还原到图片列表
	$photo.droppable({
		accept: "#trash li",
		activeClass: "active",
		drop: function(event,ui) {
			recycleImage(ui.draggable);
		}
	});
	//自定义图片从图片列表中删除拖动到回收站的函数
	var recyclelink = "<a href='#' title='从回收站还原' class='phrefresh'>还原</a>";
	function deleteImage($item) {
		$item.fadeOut(function() {
			var $list = $("<ul class='photo reset' style='float: left;' />").appendTo($trash);
			$item.find("a.phtrash").remove();
			$item.append(recyclelink).appendTo($list).fadeIn(function() {
				$item
					.animate({width: "68px"})
					.find("img")
					.animate({height: "86px",width: "68px"})
					.end()
					.find("h5")
					.css("display","none");
			});
		});
	}
	//自定义图片从回收站还原至图片列表的函数
	var trashlink = "<a href='#' title='放入回收站' class='phtrash'>删除</a>";
	function recycleImage($item) {
		$item.fadeOut(function() {
			$item
					.find("a.phrefresh")
					.remove()
					.end()
					.css("width","85px")
					.append(trashlink)
					.find("img")
					.css({height: "120px",width: "85px"})
					.end()
					.find("h5")
					.css("display","block")
					.end()
					.appendTo($photo)
					.fadeIn();
		});
	}
	//根据图片所在位置绑定删除或还原事件
	$("ul.photo li").click(function(event){
		var $item = $(this),
			$target = $(event.target);
		if ($target.is("a.phtrash")) {
			deleteImage($item);
		}
		else if ($target.is("a.phrefresh")) {
			recycleImage($item);
		}
		return false;
	});
});