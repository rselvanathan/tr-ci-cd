$(function () {
	fetch("/api/time")
	.then(r => r.text())
	.then((text) => {
		$('.time__header').text(text);
	});
});
