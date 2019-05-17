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
		<div class="clear-button-container">
			<button @click="handleClear" class="clear-button">clear</button>
		</div>
	</div>
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
			handleClear: function() {
				this.$emit("clearModal", false);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.modal {
		position: absolute;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		z-index: 1000;
		background-color: white;
		width: 80%;
		border: 1px solid #ccc;
		box-shadow: 1px 1px 1px black;
		left: 10%;
		top: 10%;
		box-sizing: border-box;
		transition: all 0.5s ease-out;
		overflow-y: scroll;
		justify-content: space-evenly;
	}

	.clear-button-container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.clear-button {
		height: 50px;
		line-height: 50px;
		border-radius: 4px;
		background-color: #ed8029;
		color: #fff;
		margin: 2px 5px;
		cursor: pointer;
		width: 125px;
	}
</style>
