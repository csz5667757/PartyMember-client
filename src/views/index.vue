<template>
	<div>
		{{menu}}
		<br>
		{{dic}}
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				userInfo: {},
				dic: {},
				menu: {}
			}
		},
		watch: {
			'$store.state.menu'(newValue, oldValue) {
				this.menu = newValue;
			},
			'$store.state.dic'(newValue, oldValue) {
				this.dic = newValue;
			}
		},

	}
</script>

<style>

</style>
