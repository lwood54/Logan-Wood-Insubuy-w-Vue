<template>
	<div>
		<h1>{{pageTitle}}</h1>
		<div v-for="quote in quotes" :key="quote.id">
			<h1>{{quote.title}}</h1>
			<p>{{quote.body}}</p>
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
			let url = "https://jsonplaceholder.typicode.com/posts";
			fetch(url)
				.then(function(res) {
					return res.json();
				})
				.then(function(data) {
					vm.quotes = data;
					console.log("data: ", data);
				});
		}
	};
</script>

<style>
</style>

