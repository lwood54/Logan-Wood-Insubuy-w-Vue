<template>
	<div id="app">
		<div class="nav">
			<router-link to="/" class="navItem">Home</router-link>
			<router-link to="/insubuy" class="navItem" exact>Get Quote</router-link>
		</div>
		<router-view/>
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
	$nav-color: #406a95;
	$nav-hover: rgb(189, 180, 180);
	$nav-padding: 1px 8px;

	.nav {
		margin: $nav-padding;
	}

	.navItem {
		padding: $nav-padding;
		color: $nav-color;
		text-decoration: none;
		font-size: 1.2rem;
		&:hover {
			color: $nav-hover;
		}
	}
</style>