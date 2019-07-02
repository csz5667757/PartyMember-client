<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App',
		created() {
			document.title = '党员信息后台管理平台';
		}
	}
</script>

<style>
	@import 'quill/dist/quill.core.css';
	@import 'quill/dist/quill.snow.css';
	@import 'quill/dist/quill.bubble.css';
	
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html,
	body {
		height: 100%;
		margin: 0;
	}

	#app {
		height: 100%;
		/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
	}

	ul {
		list-style: none;
		color: #606266;
	}

	.contr {
		margin-bottom: 20px;
	}

	.search {
		margin-bottom: 20px;
		padding-bottom: 18px;
		border-bottom: dotted 3px #dadada;
	}

	.search>label {
		font-size: 14px;
		color: #333333;
	}

	.search .dic-select,
	.search .area3cascader,
	.search .el-input {
		margin: 0 10px 0 5px;
		max-width: 150px;
	}

	.el-form.search {
		margin-bottom: 20px;
		padding: 0;
		border-bottom: dotted 3px #dadada;
	}

	.el-form.search .dic-select,
	.el-form.search .area3cascader,
	.el-form.search .el-input {
		max-width: 150px;
	}

	.el-button.el-button--add {
		background: #cee8db;
		border-color: #cee8db;
		color: #009944;
	}

	.el-button.el-button--add:hover,
	.el-button.el-button--add:focus {
		background: #aae6c8;
		color: #009944;
	}

	.el-button.el-button--edit {
		background: #ffefcc;
		border-color: #ffefcc;
		color: #f08300;
	}

	.el-button.el-button--edit:hover,
	.el-button.el-button--edit:focus {
		background: #f8dea2;
		color: #f08300;
	}

	.el-button.el-button--login {
		background: #cfebfb;
		border-color: #cfebfb;
		color: #00a0e9;
	}

	.el-button.el-button-login:hover,
	.el-button.el-button-login:focus {
		background: #aadcf8;
		color: #00a0e9;
	}

	.el-button.el-button--del {
		background: #fbdddd;
		border-color: #fbdddd;
		color: #e60012;
	}

	.el-button.el-button--del:hover,
	.el-button.el-button--del:focus {
		background: #f8bab9;
		color: #e60012;
	}

	.confirm_del .el-message-box__content {
		padding: 20px 0;
		font-size: 16px;
	}

	.no-cascader.el-cascader.is-disabled {
		margin: -10px 0;
	}

	.no-cascader.el-cascader.is-disabled .el-cascader__label {
		color: #606266;
	}

	.no-cascader .is-disabled .el-input__suffix {
		display: none;
	}

	.no-cascader.el-cascader.is-disabled .el-input.is-disabled .el-input__inner {
		background: transparent;
		border-color: transparent;
	}

	.no-cascader .el-cascader__label {
		cursor: default;
	}

	.no-cascader .el-cascader__label {
		/* text-align: center; */
	}

	.el-pagination {
		margin-top: 10px;
	}
</style>
