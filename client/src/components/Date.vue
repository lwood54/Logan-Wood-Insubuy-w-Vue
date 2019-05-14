<template>
	<div class="date-label">
		<h4 class="label-heading">Travel Dates (mm/dd/yyyy)</h4>
		<div class="date-container">
			<div class="date">
				<input
					v-model="startDate"
					type="date"
					id="start"
					name="start-date"
					value="startDate"
					min="startDate"
					class="date-selector"
				>
			</div>
			<div class="date">
				<input
					v-model="endDate"
					type="date"
					id="end"
					name="end-date"
					value="endDate"
					min="endDate"
					class="date-selector"
				>
			</div>
		</div>
		<p v-if="showDateError" class="error-message">The end date must occur after the start date.</p>
	</div>
</template>

<script>
	// get current date to set default start date in date picker
	const currentDate = new Date();
	// get day (if it is 1 - 9, then add a 0)
	const dd =
		currentDate.getDate() > 9
			? currentDate.getDate()
			: "0" + currentDate.getDate();
	// get day to be plus 1 as default end date start time
	const ddPlus1 =
		currentDate.getDate() + 1 > 9
			? currentDate.getDate() + 1
			: "0" + currentDate.getDate();
	// get current month, add 0 if below 10, add 1 to value
	// because January starts at 0
	const mm =
		currentDate.getMonth() + 1 > 9
			? currentDate.getMonth() + 1
			: "0" + (currentDate.getMonth() + 1);
	// get year
	const yyyy = currentDate.getFullYear();
	// format date to be used as default for date picker
	const fmtDate = `${yyyy}-${mm}-${dd}`;
	// fomrat end date to be used for date picker
	const fmtDatePlus1 = `${yyyy}-${mm}-${ddPlus1}`;
	// setup export
	export default {
		data: function() {
			return {
				startDate: fmtDate,
				isDateRangeValid: false,
				endDate: fmtDate
			};
		},
		props: {
			showDateError: {
				type: Boolean,
				default: false
			},
			reset: {
				type: Boolean
			}
		},
		watch: {
			startDate: function() {
				if (this.startDate >= this.endDate) {
					this.isDateRangeValid = false;
				} else {
					this.isDateRangeValid = true;
				}
				this.$emit("getDate", {
					startDate: this.startDate,
					endDate: this.endDate,
					isDateRangeValid: this.isDateRangeValid
				});
			},
			endDate: function() {
				if (this.startDate >= this.endDate) {
					this.isDateRangeValid = false;
				} else {
					this.isDateRangeValid = true;
				}
				this.$emit("getDate", {
					startDate: this.startDate,
					endDate: this.endDate,
					isDateRangeValid: this.isDateRangeValid
				});
			},
			reset: function() {
				if (this.reset) {
					this.startDate = fmtDate;
					this.endDate = fmtDate;
				}
			}
		}
	};
</script>

<style>
</style>
