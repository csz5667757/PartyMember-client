<template>
	<span class='div_popover'>
		<el-button size="small" type="warning" icon="el-icon-printer" title='打印' @click='print'></el-button>
		<el-button size="small" type="success" icon="el-icon-refresh" title='刷新' @click='refresh'></el-button>
		<el-popover :placement="placement" :width="width" trigger="click" v-model="visible">
			<p class='props_sel'>
				<a href="javascript:void(0)" @click="propsall">全部</a>
				<a href="javascript:void(0)" @click="propsreset">重置</a>
				<!-- <a href="javascript:void(0)" @click="propssave">保存</a> -->
			</p>
			<el-checkbox-group :value="value" @input="propschange" style='line-height: 23px;line-height: 23px;font-size: 10px;'>
				<template v-for="option in options">
					<p :key='option'><el-checkbox :label='option'></el-checkbox></p>
				</template>
			</el-checkbox-group>
			<el-button slot="reference" type="primary" icon="el-icon-menu" size="small" title='选择属性'></el-button>
		</el-popover>
	</span>
</template>

<script>
	export default {
		model: {
			props: 'value',
			event: 'change'
		},
		props: {
			value: Array,
			placement: {
				type: String,
				default: 'bottom-end'
			},
			width: {
				type: Number,
				default: 100
			},
			options: Array,
		},
		data() {
			return {
				visible: false
			}
		},
		methods: {
			propschange(e) {
				this.$emit('change', e);
			},
			propsreset() {
				this.$emit('change', []);
			},
			propsall() {
				this.$emit('change', this.options);
			},
			propssave() {
				this.visible = false;
			},
			print() {
				
			},
			refresh() {
				this.$emit('refresh');
			},
		},
	};
</script>
<style>
	.div_popover {
		float: right;
	}

	.div_popover .el-button {
		margin: 0;
	}

	.props_sel {
		padding-bottom: 5px;
		border-bottom: 1px #E4E7ED solid;
	}

	.props_sel a {
		margin-left: 8px;
		color: #606266;
		text-decoration: none;
	}

	.props_sel a:hover {
		color: #409EFF;
	}
</style>
