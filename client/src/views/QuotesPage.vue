<template>
	<div>
		<h1>{{pageTitle}}</h1>
		<select v-model="filter">
			<option disabled value>Select a Filter</option>
			<option>Reset</option>
			<option>Best Seller</option>
			<option>Fixed</option>
			<option>Comprehensive</option>
			<option disabled value>---- Section ----</option>
			<option>Travel Medical</option>
			<option>International Travel Medical</option>
			<option>Student Medical</option>
			<option>J1 Medical</option>
		</select>
		<button @click="sort('price')">Sort by Price</button>
		<button @click="sort('name')">Sort by Name</button>
		<button @click="toggleView">List / Grid</button>
		<button @click="comparePlans">Compare Selected Plans</button>
		<compare-modal :activateModal="activateModal">
			<div v-for="quote in compareQuotes" :key="quote.id">
				<plan :plan="quote" @planID="handleClicked" :compareGroupFull="compareGroupFull"/>
			</div>
		</compare-modal>
		<div :class="{grid: gridView}">
			<div v-for="quote in modQuotes" :key="quote.id">
				<plan :plan="quote" @planID="handleClicked" :compareGroupFull="compareGroupFull"/>
			</div>
		</div>
	</div>
</template>

<script>
	import Plan from "../components/Plan.vue";
	import CompareModal from "../components/CompareModal.vue";

	export default {
		data: function() {
			return {
				pageTitle: "Quotes",
				quotes: [],
				modQuotes: [],
				showOriginalQuotes: true,
				filter: "",
				gridView: false,
				compareGroup: [],
				compareQuotes: [],
				activateModal: false
			};
		},
		computed: {
			priceSorted: function() {
				// let newQuotes = [...this.quotes]; // will remove any filter, then will sort
				let newQuotes = [...this.modQuotes]; // allows for sorting after filter
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
				// let newQuotes = [...this.quotes]; // will remove any filter, then will sort
				let newQuotes = [...this.modQuotes]; // allows for sorting after filter
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
			},
			compareGroupFull: function() {
				return this.compareGroup.length === 4;
			}
		},
		watch: {
			filter: function(val) {
				switch (val) {
					case "Best Seller":
						this.modQuotes = this.quotes.filter(
							quote => quote.bestSellers
						);
						break;
					case "Fixed":
						this.modQuotes = this.quotes.filter(
							quote => quote.type === "Fixed"
						);
						break;
					case "Comprehensive":
						this.modQuotes = this.quotes.filter(
							quote => quote.type === "Comprehensive"
						);
						break;
					case "Travel Medical":
						this.modQuotes = this.quotes.filter(
							quote => quote.section === "Travel Medical"
						);
						break;
					case "International Travel Medical":
						this.modQuotes = this.quotes.filter(
							quote =>
								quote.section ===
								"International Travel Medical"
						);
						break;
					case "Student Medical":
						this.modQuotes = this.quotes.filter(
							quote => quote.section === "Student Medical"
						);
						break;
					case "J1 Medical":
						this.modQuotes = this.quotes.filter(
							quote => quote.section === "J1 Medical"
						);
						break;
					case "Reset":
						this.modQuotes = [...this.quotes];
						break;
					default:
						return this.modQuotes;
				}
			}
		},
		methods: {
			handleClicked: function(val) {
				if (this.compareGroup.length < 4 && val.selected) {
					// if group is not full and plan was selected, then add it to group
					this.compareGroup.push(val.planID);
				} else {
					// if plan was selected, then we can unselect it by filtering out
					// only those plans that don't have matching id
					this.compareGroup = this.compareGroup.filter(
						id => id !== val.planID
					);
				}
			},
			comparePlans: function() {
				if (
					this.compareGroup.length > 1 &&
					this.compareGroup.length <= 4
				) {
					this.quotes.forEach(quote => {
						this.compareGroup.forEach(id => {
							if (id === quote.id) {
								this.compareQuotes.push(quote);
							}
						});
					});
					this.activateModal = true;
				}
			},
			sort: function(type) {
				if (type === "price") {
					this.modQuotes = this.priceSorted;
				} else if (type === "name") {
					this.modQuotes = this.nameSorted;
				}
			},
			toggleView: function() {
				this.gridView = !this.gridView;
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
			plan: Plan,
			"compare-modal": CompareModal
		}
	};
</script>

<style lang="scss" scoped>
	.grid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
</style>

