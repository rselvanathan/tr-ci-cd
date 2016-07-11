var $time_holder = $('.time__header');
var $cities_holder = $('.cities');

var vm = new Vue({
	el: '#app',
	data: {
		currentDate: "",
		currentTime: "",
		offset: 0,
		message: false,
		error: false,
		newCity: {},
		cities: []
	},
	methods: {
		add: function () {
			console.log("Add!");
			fetch("/api/addCity",
				{
					method: "POST",
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(this.newCity)
				}
			).then(() => {this.updateCities();});
			
		},
		updateCities: function () {
			fetch("/api/cities")
				.then((r) => {
					if (r.status >= 400) {
						$cities_holder.addClass('alert alert-danger');
					} else {
						$cities_holder.removeClass('alert alert-danger');
					}
					return r.json();
				})
				.then((data) => {
					this.cities = data._embedded.cities.sort();
				});
		}
	},
	created: function () {
		setInterval(() => {
			var localTime = new Date();
			var mom = moment(localTime.getTime() + this.offset);
			this.currentDate = mom.format("dddd, MMMM Do YYYY");
			this.currentTime = mom.format("H:mm:ss");
		}, 100);

		fetch("/api/time")
			.then((r) => {
				this.message = false;
				if (r.status >= 400) {
					this.message = {
						type: 'danger',
						text: r.text()
					};
				}
				return r.json();
			})
			.then((time) => {
				var remote = new Date(time.timestamp);
				var local = new Date();
				this.offset = remote.getTime() - local.getTime();
				console.log("offset is", this.offset);
			})
			.catch((error) => {
				this.message = {
					type: 'danger',
					text: error.message
				};
			});

		this.updateCities();
	}
});
