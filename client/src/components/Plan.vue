<template>
	<div class="plan-card" @click="handleClicked">
		<h1 class="plan-title">{{plan.name}}</h1>
		<p class="description">{{plan.description}}</p>
		<h4 class="price">Price: ${{plan.price}}</h4>
		<h4 class="package-type">Type: {{plan.type}}</h4>
		<h4 class="section">Section: {{plan.section}}</h4>
		<h4 v-if="plan.bestSellers" class="best-sellers">**Best Seller**</h4>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				title: ""
			};
		},
		props: {
			plan: {
				type: Object,
				required: true
			}
		},
		methods: {
			handleClicked: function() {
				this.$emit("planID", { planID: this.plan.id });
			}
		}
	};
</script>

<style lang="scss" scoped>
	* {
		font-family: "Trebuchet MS", Helvetica, sans-serif;
	}

	.plan-card {
		border: 1px solid rgba(165, 165, 165, 0.575);
		width: 45%;
		margin: 10px auto;
		cursor: pointer;
	}

	.plan-title {
		margin-top: 0;
		padding: 10px;
		width: 100%;
		background-color: rgb(36, 152, 123);
		color: #fff;
		box-sizing: border-box;
	}

	.description,
	.price,
	.package-type,
	.section,
	.best-sellers {
		padding: 0 10px;
	}
</style>
