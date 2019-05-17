<template>
	<div class="insubuy-form-container">
		<div class="form-heading">
			<img class="header-image" src="../assets/insubuyImg.png">
			<h3 class="header-title">{{formTitle}}</h3>
		</div>
		<form @submit.prevent="handleSubmit" class="quote-form">
			<policy-picker
				@getPolicy="handlePolicy"
				:showPolicyError="showPolicyError"
				:styles="{label: 'policy-label', sectionHeading: 'label-heading'}"
				:reset="resetPolicyVal"
			/>
			<age-picker @getAge="handleAge" :showAgeError="showAgeError" :reset="resetAge"/>
			<date-picker @getDate="handleDate" :showDateError="showDateError" :reset="resetDates"/>
			<text-only-input
				txtInputLabel="Citizenship"
				errorMessage="Please enter a valid country."
				placeholder="country"
				@getTxtInput="handleCitizenship"
				:showTxtInputError="showCitizenshipError"
				:styles="{
                              label: 'citizenship-label',
                              labelHeading: 'label-heading',
                              inputStyle: 'citizenship-input'
                        }"
				:reset="resetCitizenship"
			/>

			<text-only-input
				txtInputLabel="Mailing State"
				errorMessage="Please enter a valid state."
				placeholder="mailing state"
				@getTxtInput="handleMailingState"
				:showTxtInputError="showMailingStateError"
				:styles="{
                              label: 'mailing-state-label',
                              labelHeading: 'label-heading',
                              inputStyle: 'mailing-state-input'
                        }"
				:reset="resetMailingState"
			/>
			<div class="submit-container">
				<button type="sbumit" class="submit-button">GET QUOTES</button>
			</div>
			<p v-if="submissionError" class="error-message">There were one or more invalid fields above.</p>
		</form>
		<div class="reset-button-container">
			<button @click="handleFormReset" class="reset-button" type="button">Reset Form</button>
		</div>
	</div>
</template>

<script>
	import DatePicker from "./Date";
	import PolicyPicker from "./Policy";
	import AgePicker from "./Age";
	import TextOnlyInput from "./TextOnlyInput.vue";

	export default {
		data: function() {
			return {
				startDate: "",
				endDate: "",
				isDateRangeValid: false,
				showDateError: false,
				resetDates: false,
				policyVal: "",
				isPolicyValid: false,
				showPolicyError: false,
				resetPolicyVal: false,
				citizenship: "",
				isCitizenshipValid: false,
				showCitizenshipError: false,
				resetCitizenship: false,
				age: "",
				isAgeValid: false,
				showAgeError: false,
				resetAge: false,
				mailingState: "",
				isMailingStateValid: false,
				showMailingStateError: false,
				resetMailingState: false,
				submissionError: false
			};
		},
		props: {
			formTitle: {
				type: String,
				default: "Form"
			}
		},
		methods: {
			checkAllFieldsValidation: function() {
				return (
					this.isDateRangeValid &&
					this.isPolicyValid &&
					this.isCitizenshipValid &&
					this.isAgeValid &&
					this.isMailingStateValid
				);
			},
			handleDate: function(val) {
				this.startDate = val.startDate;
				this.endDate = val.endDate;
				this.isDateRangeValid = val.isDateRangeValid;
				this.resetDates = false;
				this.showDateError = false;
				this.submissionError = false;
				// console.log("handling Date / startDate: ", this.startDate);
				// console.log("handling Date / endDate: ", this.endDate);
				// console.log(
				// 	"handling Date: isDateRangeValid ? ",
				// 	this.isDateRangeValid
				// );
			},
			handlePolicy: function(val) {
				this.policyVal = val.policyVal;
				this.isPolicyValid = val.isPolicyValid;
				this.resetPolicyVal = false;
				this.showPolicyError = false;
				this.submissionError = false;
				// console.log("handle Policy: ", val.policyVal);
				// console.log(
				// 	"handle Policy - isPolicyValid ? ",
				// 	val.isPolicyValid
				// );
			},
			handleCitizenship: function(val) {
				this.citizenship = val.txtInput;
				this.isCitizenshipValid = val.isTxtInputValid;
				this.resetCitizenship = false;
				this.showCitizenshipError = false;
				this.submissionError = false;
				// console.log("handle Citizenship: ", this.citizenship);
				// console.log(
				// 	"handle Citizenship - isCitizenshipValid ? ",
				// 	this.isCitizenshipValid
				// );
			},
			handleAge: function(val) {
				this.age = val.age;
				this.isAgeValid = val.isAgeValid;
				this.showAgeError = false;
				this.resetAge = false;
				this.submissionError = false;
				// console.log("handle Age: ", val.age);
				// console.log("handle Age - isAgeValid ? ", val.isAgeValid);
			},
			handleMailingState: function(val) {
				this.mailingState = val.txtInput;
				this.isMailingStateValid = val.isTxtInputValid;
				this.resetMailingState = false;
				this.showMailingStateError = false;
				this.submissionError = false;
				// console.log("handle Mailing State: ", val.txtInput);
				// console.log(
				// 	"handle Mailing State - isMailingStateValid ? ",
				// 	val.isTxtInputValid
				// );
			},
			handleSubmit: function() {
				this.showDateError = !this.isDateRangeValid;
				this.showPolicyError = !this.isPolicyValid;
				this.showCitizenshipError = !this.isCitizenshipValid;
				this.showAgeError = !this.isAgeValid;
				this.showMailingStateError = !this.isMailingStateValid;
				if (this.checkAllFieldsValidation()) {
					this.submissionError = false;
					this.$router.push("/quotes-page");
				} else {
					this.submissionError = true;
				}
			},
			handleFormReset: function() {
				this.resetAge = true;
				this.resetDates = true;
				this.resetPolicyVal = true;
				this.resetCitizenship = true;
				this.resetMailingState = true;
			}
		},
		components: {
			"date-picker": DatePicker,
			"policy-picker": PolicyPicker,
			"age-picker": AgePicker,
			"text-only-input": TextOnlyInput
		}
	};
</script>
      
<style lang="scss">
	$error-font-color: rgb(214, 10, 10);
	$minor-padding: 1px 5px;

	.insubuy-form-container {
		border: 1px solid rgba(165, 165, 165, 0.575);
		border-radius: 2px;
		width: 90%;
		margin: auto;
		margin-top: 20px;

		label {
			margin-top: 10px;
		}

		.form-heading {
			background-color: #f0f3f6;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
		}

		.header-image {
			max-height: 55px;
			max-width: 125px;
		}

		.header-title {
			margin-left: 5px;
			border-left: 1px solid #406a9560;
			padding-left: 5px;
			color: #406a95;
		}

		.quote-form {
			margin: auto;
			display: flex;
			flex-direction: column;
		}

		.error-message {
			color: $error-font-color;
		}
		* {
			font-family: "Trebuchet MS", Helvetica, sans-serif;
		}

		.label-heading {
			margin: 5px;
		}

		.policy-label {
			display: flex;
			flex-direction: column;
			margin: 10px 5px;

			select {
				padding: 8px;
				border-radius: 2px;
				border: 0.5px solid rgba(187, 185, 185, 0.623);
				height: 50px;
				background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
					no-repeat right #fff;
				-webkit-appearance: none;
				background-position-x: 95%;
			}
		}

		.age-container {
			background-color: #f4f4f4;
			border: 1px solid rgba(165, 165, 165, 0.575);
			padding: 5px;
			margin: 0 5px;
		}

		.age-title {
			margin: 0;
			display: flex;
		}

		.hr {
			border-width: 0.5px;
			border: 1px solid rgba(194, 193, 193, 0.466);
		}

		.age-input-container {
			display: flex;
		}

		.age-col1 {
			margin: 0 5px;
			width: 50px;
			text-align: center;
		}

		.age-col2 {
			margin: 0 5px;
			width: 150px;
			text-align: center;
		}

		.age-input {
			height: 35px;
			line-height: 35px;
			text-align: center;
			width: 150px;
		}

		.date-label,
		.citizenship-label,
		.mailing-state-label {
			display: flex;
			flex-direction: column;
			margin: 15px 5px;
		}

		.date {
			color: rgba(146, 146, 151, 0.884);
			width: 50%;
		}
		.date-selector {
			width: 100%;
			box-sizing: border-box;
			height: 48px;
			padding: 5px;
		}

		.date-container {
			display: flex;
			flex-direction: row;
		}

		.date-placeholder {
			margin: 0;
			border: 1px solid rgba(165, 165, 165, 0.575);
			text-align: left;
			line-height: 45px;
			height: 45px;
			padding-left: 10px;
		}

		.formFieldError {
			border: 3px solid rgb(175, 48, 48);
			border-radius: 3px;
		}

		.citizenship-input,
		.mailing-state-input {
			height: 42px;
			line-height: 42px;
			padding-left: 10px;
		}

		.submit-container {
			width: 100%;
			text-align: center;
			height: 40px;
			margin-top: 30px;
		}

		.submit-button {
			border: none;
			background-color: #ed8029;
			height: 40px;
			width: 150px;
			color: #fff;
			font-size: 1.2em;
			cursor: pointer;
			border-radius: 2px;
		}

		.reset-button-container {
			width: 100%;
			text-align: center;
			margin: 25px auto;
		}

		.reset-button {
			text-align: center;
			border: none;
			font-style: italic;
			text-decoration: underline;
			font-size: 1.1em;
			cursor: pointer;
			color: #551a8b;
			font-weight: lighter;
		}

		.age-input-fullscreen {
			display: none;
		}

		@media (min-width: 900px) {
			.quote-form {
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-evenly;
			}

			.age-input-fullscreen {
				display: inline-block;
				width: 100%;
				/* margin: 0 5px; */
				height: 50px;
				box-sizing: border-box;
				padding-left: 10px;
			}

			.age-label {
				margin: 10px;
			}

			.age-container {
				display: none;
			}

			.policy-label,
			.age-label,
			.date-label,
			.citizenship-label,
			.mailing-state-label {
				width: 48%;
			}

			.mailing-state-label {
				padding-right: 50%;
			}

			.submit-button {
				width: 92%;
			}
		}
	}
</style>
