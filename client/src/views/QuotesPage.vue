<template>
	<div>
		<h1>{{pageTitle}}</h1>
		<div v-for="quote in quotes" :key="quote.id">
			<h1>{{quote.name}}</h1>
			<p>{{quote.description}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				pageTitle: "Quotes",
				quotes: []
			};
		},
		created: function() {
			let vm = this;
			let url = "http://localhost:8080/quotes";
			fetch(url)
				.then(function(res) {
					return res.json();
				})
				.then(function(jsonData) {
					console.log(jsonData.quotes);
					vm.quotes = jsonData.quotes;
				});
			// .then(function(data) {
			// 	vm.quotes = data;
			// 	console.log("data: ", data.body);
			// });
		}
	};
</script>

<style>
</style>

