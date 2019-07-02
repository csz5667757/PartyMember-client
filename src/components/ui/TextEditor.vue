<template>
	<quill-editor v-model='content' ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
	 @change="onEditorChange($event)">
	</quill-editor>
</template>

<script>
	import Vue from 'vue'
	import VueQuillEditor from 'vue-quill-editor'
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	Vue.use(VueQuillEditor)
	export default {
		name: 'editor',
		model: {
			props: 'value',
			event: 'change'
		},
		props: {
			value: String
		},
		data() {
			return {
				content: '',
				editorOption: {
					placeholder: '请输入内容',
					theme: 'snow', // 主题
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'], // toggled buttons
							/* ['blockquote', 'code-block'], */
							[{
								'header': 1
							}, {
								'header': 2
							}], // custom button values
							[{
								'list': 'ordered'
							}, {
								'list': 'bullet'
							}],
							/* [{
								'script': 'sub'
							}, {
								'script': 'super'
							}], */ // superscript/subscript
							[{
								'indent': '-1'
							}, {
								'indent': '+1'
							}], // outdent/indent
							[{
								'direction': 'rtl'
							}], // text direction
							[{
								'size': ['small', false, 'large', 'huge']
							}], // custom dropdown
							/* [{
								'header': [1, 2, 3, 4, 5, 6, false]
							}], */

							[{
								'color': []
							}, {
								'background': []
							}], // dropdown with defaults from theme
							/* [{
								'font': []
							}], */
							[{
								'align': []
							}],
							/* ['link', 'image', 'video'], */
							['clean'] // remove formatting button
						]
					}
				}
			}
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill;
			},
		},
		methods: {
			onEditorReady(editor) { // 准备编辑器
			},
			onEditorBlur() {}, // 失去焦点事件
			onEditorFocus() {}, // 获得焦点事件
			onEditorChange(e) {
				this.content = e.html
				this.$emit('change', JSON.stringify({
					html: e.html,
					text: e.text.trim()
				}));
			}, // 内容改变事件
		},
		watch: {
			value(newValue, oldValue) {
				if (newValue) {
					this.content = JSON.parse(newValue).html
				} else {
					this.content = ''
				}
			}
		},
		mounted() {
			if (this.value) {
				this.content = JSON.parse(this.value).html
			} else {
				this.content = ''
			}
		}
	}
</script>

<style>
	.ql-editor {
		min-height: 80px;
	}
</style>
