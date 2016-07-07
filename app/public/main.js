$(function () {
	var $time_holder = $('.time__header');

	fetch("/api/time")
	.then((r) => {
		if (r.status >= 400) {
			$time_holder.addClass('alert alert-danger');
		} else {
			$time_holder.removeClass('alert alert-danger');
		}
		return r.text();
	})
	.then((text) => {
		$('.time__header').text(text);
	});
});
