<template>
	<el-cascader class="area3cascader" :clearable="clearable" :change-on-select="changeOnSelect" :props="jgProps" :options="AreaCode3"
	 :value="cascaderValue" @change="handleChange" :size="size"></el-cascader>
</template>

<script>
	import AreaCode3 from '@/utils/areacode3.json'
	export default {
		model: {
			props: 'value',
			event: 'change'
		},
		props: {
			value: String,
			clearable: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			},
			changeOnSelect: {
				type: Boolean,
				default: false
			},
			size:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				AreaCode3,
				jgProps: {
					value: "id",
					label: "name"
				},
				cascaderValue: []
			}
		},
		methods: {
			handleChange(val) {
				if (val && val.length > 0)
					this.$emit('change', val[val.length - 1]);
				else
					this.$emit('change', null);
			}
		},
		created() {
			if (this.value) {
				this.cascaderValue = this.$dic.getArea(this.value);
			}
		},
		watch: {
			'value': function(newValue, oldValue) {
				this.cascaderValue = this.$dic.getArea(this.value);
			}
		},
	}
</script>

<style>
	.area3cascader.el-cascader {
		width: 100%;
	}
</style>
