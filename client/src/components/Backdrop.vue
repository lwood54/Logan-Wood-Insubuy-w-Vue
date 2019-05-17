<template>
	<div v-if="activateModal" @click="clickBackdrop" class="backdrop"/>
</template>

<script>
	export default {
		props: {
			activateModal: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			clickBackdrop: function() {
				this.$emit("clearBackdrop");
			}
		}
	};
</script>

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
</style>
