const $div = $("<div>新增的文本内容</div>");

$div.appendTo(document.body);

$div.css({ color: "red" });

$div.addClass("blue").print();

$div.on("click", () => console.log("点击事件触发"));
