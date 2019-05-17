<template>
	<div class="plan-card" @click="handleClicked" :class="{'selected': clicked}">
		<h1
			class="plan-title"
			:class="{
                        'travel-medical': plan.section === 'Travel Medical',
                        'student-medical': plan.section === 'Student Medical',
                        'j1-medical': plan.section === 'J1 Medical'
                  }"
		>{{plan.name}}</h1>
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
				title: "",
				clicked: false
			};
		},
		props: {
			plan: {
				type: Object,
				required: true
			},
			compareGroupFull: {
				type: Boolean,
				required: true
			}
		},
		methods: {
			handleClicked: function() {
				if (!this.compareGroupFull && !this.clicked) {
					this.clicked = true;
					this.$emit("planID", {
						planID: this.plan.id,
						selected: this.clicked
					});
				} else if (!this.compareGroupFull && this.clicked) {
					this.clicked = false;
					this.$emit("planID", {
						planID: this.plan.id,
						selected: this.clicked
					});
				} else if (this.compareGroupFull && this.clicked) {
					this.clicked = false;
					this.$emit("planID", {
						planID: this.plan.id,
						selected: this.clicked
					});
				}
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
		width: 400px;
		height: 300px;
		margin: 10px auto;
		cursor: pointer;
		border-radius: 4px;
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

	.travel-medical {
		background-color: rgb(52, 44, 109);
	}
	.student-medical {
		background-color: rgb(0, 161, 221);
	}
	.j1-medical {
		background-color: rgb(145, 139, 134);
	}

	.selected {
		border: 2px solid green;
		background-color: rgba(109, 180, 119, 0.349);
	}
</style>
