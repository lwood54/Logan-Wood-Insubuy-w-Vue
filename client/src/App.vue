<template>
	<div id="app">
		<div id="nav">
			<router-link to="/" class="navItem">Home</router-link>
			<router-link to="/insubuy" class="navItem" exact>Insubuy Quote Form</router-link>
		</div>
		<div class="app-container">
			<router-view/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "App",
		components: {},
		data: function() {
			return {
				mainTitle: "Insubuy Challenge w Vue"
			};
		}
	};
</script>

<style lang="scss">
	$nav-color: black;
	$nav-hover: rgb(134, 130, 130);
	$nav-padding: 1px 5px;
	.navItem {
		padding: $nav-padding;
		color: $nav-color;
		text-decoration: none;
		&:hover {
			color: $nav-hover;
		}
	}
	.app-container {
		p {
			/* color: green; */
		}
	}
</style>