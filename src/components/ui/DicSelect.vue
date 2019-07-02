<template>
	<el-select class='dic-select' :value="cvalue" :size='size' @change="selectChange" :disabled="disabled" :clearable="clearable" @visible-change="visibleChange">
		<el-option v-if="allowNull" :value="null" label='全部'></el-option>
		<template v-for="item in options">
			<el-option :label='item.label' :value="item.value" :key='item.value'></el-option>
		</template>
	</el-select>
</template>

<script>
	export default {
		name:'dic-select',
		model: {
			props: 'value',
			event: 'change'
		},
		props: {
			keyword: String,
			value: [String,Number],
			disabled: {
				type: Boolean,
				default: false
			},
			allowNull: {
				type: Boolean,
				default: false
			},
			clearable: {
				type: Boolean,
				default: true
			},
			size:{
				type:String,
				default:''
			}
		},
		data: function() {
			return {
				options: []
			}
		},
		created: function() {
			this.options = this.$dic.getKV(this.keyword);
		},
		methods: {
			visibleChange(val) {
				if (val && (!this.options || this.options.length <= 0)) {
					this.options = this.$dic.getKV(this.keyword);
				}
			},
			selectChange(e) {
				this.$emit('change', e);
			},
		},
		computed: {
			cvalue() {
				if(typeof this.value=='number')
					return this.value.toString()
					else
					return this.value
			}
		},
	}
</script>

<style>
	.dic-select.el-select {
		width: 100%;
	}
</style>
