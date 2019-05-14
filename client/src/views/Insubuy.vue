<template>
	<div>
		<second-form :formTitle="title"/>
	</div>
</template>

<script>
	import QuotesForm from "../components/QuotesForm.vue";

	export default {
		data: function() {
			return {
				title: "Insubuy 2"
			};
		},
		components: {
			"second-form": QuotesForm
		}
	};
</script>

<style>
</style>
