<template>
	<div class="age-label">
		<h4 class="label-heading">Age</h4>
		<input
			v-model="age"
			placeholder="Enter your age"
			@focus="handleClear"
			class="age-input-fullscreen"
		>

		<div class="age-container">
			<div class="age-title">
				<h4 class="age-col1">#</h4>
				<h4 class="age-col2">Age</h4>
			</div>
			<hr class="hr">
			<div class="age-input-container">
				<h3 class="age-col1">1</h3>
				<input v-model="age" placeholder="age" @focus="handleClear" class="age-col2 age-input">
			</div>
		</div>
		<p v-if="showAgeError" class="error-message">Please enter your age or year of birth.</p>
	</div>
</template>

<script>
	// accessed current date to get year
	const today = new Date();
	const currentYear = today.getFullYear();
	export default {
		data: function() {
			return {
				age: "",
				isAgeValid: false
			};
		},
		props: {
			showAgeError: {
				type: Boolean,
				default: false
			},
			reset: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			age: function() {
				// confirms age is a number and is not an empty field
				if (!isNaN(this.age) && this.age !== "") {
					// if age falls between 0 and 100, then valid
					if (this.age <= 100 && this.age >= 0) {
						this.isAgeValid = true;
					} else if (this.age > 1890 && this.age <= currentYear) {
						// tests if the input was equivalent to a year
						// calculates age based on current year
						this.isAgeValid = true;
					} else {
						// user had an error and is prompted to correct
						this.isAgeValid = false;
					}
				} else {
					this.isAgeValid = false;
				}
				this.$emit("getAge", {
					age:
						this.age > 1890 && this.age < currentYear
							? currentYear - parseInt(this.age)
							: parseInt(this.age),
					isAgeValid: this.isAgeValid
				});
			},
			reset: function() {
				if (this.reset) {
					this.age = "";
				}
			}
		},
		methods: {
			handleClear: function() {
				if (!this.isAgeValid) {
					this.age = "";
				}
			}
		}
	};
</script>

<style>
</style>
