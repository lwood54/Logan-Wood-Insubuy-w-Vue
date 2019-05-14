<template>
	<div :class="styles.label">
		<h4 :class="styles.labelHeading">{{txtInputLabel}}</h4>
		<input
			v-model="txtInput"
			:placeholder="placeholder"
			@focus="handleClear"
			:class="styles.inputStyle"
		>
		<p v-if="showTxtInputError" class="error-message">{{errorMessage}}</p>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				txtInput: "",
				isTxtInputValid: false
			};
		},
		props: {
			txtInputLabel: {
				type: String,
				required: true
			},
			showTxtInputError: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: "Enter information"
			},
			errorMessage: {
				type: String,
				required: true
			},
			styles: {
				type: Object
			},
			reset: {
				type: Boolean
			}
		},
		watch: {
			txtInput: function() {
				this.validateTxtInput(this.txtInput);
				this.$emit("getTxtInput", {
					txtInput: this.txtInput,
					isTxtInputValid: this.isTxtInputValid
				});
			},
			reset: function() {
				if (this.reset) {
					this.txtInput = "";
				}
			}
		},
		methods: {
			handleClear: function() {
				if (!this.isTxtInputValid) {
					this.txtInput = "";
				}
			},
			validateTxtInput: function() {
				const characterValidation = str => {
					let strArr = str.split(" ");
					let notValidCount = 0;
					strArr.forEach(str => {
						if (!/^[a-zA-Z]*$/.test(str)) {
							notValidCount++;
						}
					});
					// if count is 0, then only letters were used
					return notValidCount === 0;
				};
				if (
					this.txtInput !== "" &&
					characterValidation(this.txtInput)
				) {
					this.isTxtInputValid = true;
				} else {
					this.isTxtInputValid = false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
