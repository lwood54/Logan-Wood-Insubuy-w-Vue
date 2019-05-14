<template>
	<div>
		<h1>{{pageTitle}}</h1>
		<button @click="sort('price')">Sort by Price</button>
		<button @click="sort('name')">Sort by Name</button>
		<div v-for="quote in modQuotes" :key="quote.id">
			<plan :plan="quote" @planID="handleClicked"/>
		</div>
	</div>
</template>

<script>
	import Plan from "../components/Plan.vue";

	export default {
		data: function() {
			return {
				pageTitle: "Quotes",
				quotes: [],
				modQuotes: [],
				showOriginalQuotes: true
			};
		},
		computed: {
			priceSorted: function() {
				let newQuotes = [...this.quotes];
				return newQuotes.sort((a, b) => {
					// sort by price value
					if (a.price > b.price) {
						return 1;
					}
					if (a.price < b.price) {
						return -1;
					}
					return 0;
				});
			},
			nameSorted: function() {
				let newQuotes = [...this.quotes];
				return newQuotes.sort((a, b) => {
					// if unicode value of a.name > b.name then return positive for sorting
					if (a.name > b.name) {
						return 1;
					}
					// unicode value comparison for sorting
					if (a.name < b.name) {
						return -1;
					}
					// plans have same value so no change
					return 0;
				});
			}
		},
		methods: {
			handleClicked: function(val) {
				console.log("from quotes-page: ", val.planID);
			},
			sort: function(type) {
				if (type === "price") {
					this.modQuotes = this.priceSorted;
				} else if (type === "name") {
					this.modQuotes = this.nameSorted;
				}
			}
		},
		created: function() {
			let vm = this;
			let url = "http://localhost:8080/quotes";
			fetch(url)
				.then(function(res) {
					return res.json();
				})
				.then(function(jsonData) {
					vm.quotes = jsonData.quotes;
					vm.modQuotes = [...vm.quotes];
				});
		},
		components: {
			plan: Plan
		}
	};
</script>

<style>
</style>

