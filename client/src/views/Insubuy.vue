<template>
	<div>
		<quotes-form :formTitle="title"/>
	</div>
</template>

<script>
	import QuotesForm from "../components/QuotesForm.vue";

	export default {
		data: function() {
			return {
				title: "Travel Insurance"
			};
		},
		components: {
			"quotes-form": QuotesForm
		}
	};
</script>

<style>
</style>
