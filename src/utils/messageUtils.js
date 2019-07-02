import {
	Message,
	MessageBox
} from 'element-ui';

export default {
	success(message) {
		Message({
			message,
			type: 'success',
			duration: 2000
		});
	},
	error(message) {
		Message({
			message,
			type: 'error',
			duration: 2000
		});
	},
	delete(_then, _catch) {
		MessageBox.confirm("即将执行删除操作，是否继续?", '删除提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error',
			center: true,
			customClass: 'confirm_del'
		}).then(() => {
			_then && _then()
		}).catch(() => {
			_catch && _catch()
		})
	},
	locking(_then, _catch) {
		MessageBox.confirm('是否锁定所选项？', '提示', {
			confirmButtonText: '锁定',
			cancelButtonText: '不锁定',
			type: 'warning',
			center: true,
			customClass: 'confirm_del'
		}).then(() => {
			_then && _then()
		}).catch(() => {
			_catch && _catch()
		})
	},
	activate(_then, _catch) {
		MessageBox.confirm('是否激活所选项？', '提示', {
			confirmButtonText: '激活',
			cancelButtonText: '不激活',
			type: 'warning',
			center: true,
			customClass: 'confirm_del'
		}).then(() => {
			_then && _then();
		}).catch(() => {
			_catch && _catch();
		})
	}
}
