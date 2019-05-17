<template>
	<div
		v-if="activateModal"
		class="modal"
		style="{
                  transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                  opacity: props.showModal ? '1' : '0'
            }"
	>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			activateModal: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style lang="scss" scoped>
	.modal {
		position: fixed;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		z-index: 500;
		background-color: white;
		width: 80%;
		border: 1px solid #ccc;
		box-shadow: 1px 1px 1px black;
		left: 10%;
		top: 5%;
		box-sizing: border-box;
		transition: all 0.5s ease-out;
		overflow-y: scroll;
	}
</style>
