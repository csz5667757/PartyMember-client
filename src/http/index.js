import axios from 'axios';
import router from '../router'
import {
	Loading,
	Message,
	Notification
} from 'element-ui';

var service = axios.create({
	baseURL: '/api/',
	timeout: 5000,
	headers: {
		'content-type': 'application/json',
	},
})

function checkLogin() {
	let userInfo = sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo) : {};
	if (!userInfo) {
		Message({
			message: '服务器拒绝访问：登录失效',
			type: 'error',
			duration: 2000
		});
		router.push('/login')
		return;
	}
	if (!userInfo.libraryId) {
		Message({
			message: '服务器拒绝访问：登录失效',
			type: 'error',
			duration: 2000
		});
		router.push('/login')
		return;
	} else {
		sessionStorage.setItem("libraryId", userInfo.libraryId);
		return {
			libraryId: userInfo.libraryId
		};
	}
}

var websocket = null;
export default {
	//get请求，其他类型请求复制粘贴，修改method
	get(url, params, loading, libId = true) {
		if (libId) {
			let libraryId = checkLogin();
			params = { ...params,
				...libraryId
			}
		}
		if (loading) {
			var loadingService = Loading.service({
				lock: true,
				text: '加载中',
				fullscreen: true,
				//           spinner: 'el-icon-loading',
				//           background: 'rgba(0, 0, 0, 0.7)'
			})
		}
		return new Promise((cback, reject) => {
			service({
				method: 'get',
				url,
				params,
			}).then(res => {
				loadingService ? loadingService.close() : null;
				if (res.data) {
					if (res.data.status != 200) {
						Message({
							message: res.data.status + ' 服务器拒绝访问：' + res.data.description,
							type: 'error',
							duration: 2000
						});
					} else {
						cback(res.data.data); //cback在promise执行器内部
					}
				} else {
					Message({
						message: '请求发生未知错误，请联系管理员',
						type: 'error',
						duration: 2000
					});
					reject(res);
				}
			}).catch(err => {
				loadingService ? loadingService.close() : null;
				if (!err.response) {
					Message({
						message: '请求发生未知错误，请联系管理员',
						type: 'error',
						duration: 2000
					});
				} else {
					if (err.response.status == 401) {
						Message({
							message: '服务器拒绝访问：登录失效',
							type: 'error',
							duration: 2000
						});
						router.push('/login')
					} else {
						Message({
							message: '服务器拒绝访问：' + err.response.status,
							type: 'error',
							duration: 2000
						});
					}
				}
				reject(err);
			})

		})
	},
	post(url, data, loading, libId = false) {
		if (libId) {
			let libraryId = checkLogin();
			data = { ...data,
				...libraryId
			}
		}
		if (loading) {
			var loadingService = Loading.service({
				lock: true,
				text: '加载中',
				fullscreen: true,
				// spinner: 'el-icon-loading',
				// background: 'rgba(0, 0, 0, 0.7)'
			})
		}
		return new Promise((cback, reject) => {
			service({
				method: 'post',
				url,
				data,
			}).then(res => {
				loadingService ? loadingService.close() : null;
				if (res.data) {
					if (res.data.status != 200) {
						Message({
							message: res.data.status + ' 服务器拒绝访问：' + res.data.description,
							type: 'error',
							duration: 2000
						});
						reject(res);
					} else {
						cback(res.data.data); //cback在promise执行器内部
					}
				} else {
					Message({
						message: '请求发生未知错误，请联系管理员',
						type: 'error',
						duration: 2000
					});
					reject(res);
				}
			}).catch(err => {
				loadingService ? loadingService.close() : null;
				if (!err.response) {
					Message({
						message: '请求发生未知错误，请联系管理员',
						type: 'error',
						duration: 2000
					});
				} else {
					if (err.response.status == 401) {
						Message({
							message: '服务器拒绝访问：登录失效',
							type: 'error',
							duration: 2000
						});
						router.push('/login')
					} else {
						Message({
							message: '服务器拒绝访问：' + err.response.status,
							type: 'error',
							duration: 2000
						});
					}
				}
				reject(err);
			})

		})
	},

	all(parms, loading) {
		if (parms && parms.length > 0) {
			var qqs = [];
			parms.forEach((parm) => {
				qqs.push(service(parm))
			});
			if (loading) {
				var loadingService = Loading.service({
					lock: true,
					text: '加载中',
					fullscreen: true,
					// spinner: 'el-icon-loading',
					// background: 'rgba(0, 0, 0, 0.7)'
				})
			}
			return new Promise((cback, reject) => {
				axios.all(qqs).then(
					(responses) => {
						loadingService ? loadingService.close() : null;
						//console.log(responses);
						cback(responses);
					}
				).catch((errors) => {
					loadingService ? loadingService.close() : null;
					//console.log(errors);
					if (!errors.response) {
						Message({
							message: '请求发生未知错误，请联系管理员',
							type: 'error',
							duration: 2000
						});
					} else {
						if (errors.response.status == 401) {
							Message({
								message: '服务器拒绝访问：登录失效',
								type: 'error',
								duration: 2000
							});
							router.push('/login')
						} else {
							Message({
								message: '服务器拒绝访问,错误：' + err.response.status,
								type: 'error',
								duration: 2000
							});
						}
					}
					reject(errors);
				})
			});

		}
	},
	// 	ws:{
	//       wsUri:"ws://zlf.tangsiwen.net/api/websocket/",
	// 
	//     init:function (username,wsToken) {
	//        // debugger;
	//       if(websocket!=null)
	//         websocket.close();
	//       websocket = new WebSocket(this.wsUri+username+"?wsToken="+wsToken);
	// 
	//       websocket.onopen = function(evt) {
	//         //this.onOpen(evt)
	//         //websocket.send("WebSocket rocks");
	//       };
	//       websocket.onclose = function(evt) {
	//         //this.onClose(evt)
	//         websocket.close();
	//       };
	//       websocket.onmessage = function(message) {
	//         //this.onMessage(evt)
	//         //
	//         try{
	//           const notifi = JSON.parse(message.data);
	//           console.log(notifi);
	//           Notification(notifi);
	//         }catch (e) {
	//           console.log(message);
	//         }
	//       };
	//       websocket.onerror = function(evt) {
	//         //this.onError(evt)
	//       };
	//     },
	//     onOpen: function (evt) {
	//       //this.doSend("WebSocket rocks");
	//     },
	// 
	//     onClose: function (evt) {
	// 
	//     },
	// 
	//     onMessage: function (message) {
	//       console.log(message)
	//     },
	// 
	//     onError:function (evt) {
	//     },
	// 
	//     doSend: function (message) {
	//       websocket.send(message);
	//     }
	// 
	// 
	// 
	//     //window.addEventListener("load", init, false);
	//   }
}
