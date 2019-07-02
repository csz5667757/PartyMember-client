import http from '@/http'
// import nation from './nation'
// import country from './country'
import areacode3 from './areacode3'
// import jobs from './jobs'
var dic = {};

export default {
	getKV(keyword) {
		return dic[keyword];
	},
	setDic() {
		http.get("/dictionary/selectall", null, true).then(data => {
			dic = { ...dic,
				...data
			};

			console.log(dic);
		}).catch(error => {

		})
	},
	setDic2(data) {
		dic = { ...dic,
			...data
		};
	},
	dic,
	getArea(area) {
		const tem = [];
		if (!!area) {
			tem.push(area.slice(0, 2) + '0000000000');
			tem.push(area.slice(0, 4) + '00000000');
			tem.push(area)
		}
		return tem;
	},
	getType(type, val) {
		var tem = {};
		if (this.getKV(type)) {
			this.getKV(type).forEach((item) => {
				if (item.value == val) {
					tem = item;
				}
			})
		}
		return tem;
	},
	get(types, id) {
		var tem = {};
		types.forEach((item) => {
			if (item.id == id) {
				tem = item;
			}
		})
		return tem;
	},
	// getLibrary(callback) {
	// 	http.get("/library/select", {
	// 		pageNum: 1,
	// 		pageSize: 10000
	// 	}, true).then((data) => {
	// 		callback && callback(data);
	// 	}).catch((err) => {})
	// },
	// getActivity(activity) {
	// 	http.get("/activity/select", {
	// 		pageNum: 1,
	// 		pageSize: 10000
	// 	}, true).then((data) => {
	// 		activity && activity(data);
	// 	}).catch((err) => {})
	// },
	getLabel(type, val) {
		return this.getType(type, val).label
	},
	getValue(type, val) {
		return this.getType(type, val).value
	},
	formatter(type, row, column, cellValue, index) {
		//console.log(this);
		return this.getLabel(type, cellValue);
	},
	areaCode3Formatter(row, column, cellValue, index) {
		var result = "";
		try {
			var area = this.getArea(cellValue);
			for (var p = 0; p < areacode3.length; p++) {
				if (area[0] == areacode3[p].id) {
					result = result + areacode3[p].name + "/";
					for (var c = 0; c < areacode3[p].children.length; c++) {
						if (area[1] == areacode3[p].children[c].id) {
							result = result + areacode3[p].children[c].name + "/";
							for (var x = 0; x < areacode3[p].children[c].children.length; x++) {
								if (area[2] == areacode3[p].children[c].children[x].id) {
									result = result + areacode3[p].children[c].children[x].name;
									break;
								}
							}
							break;
						}
					}
					break;
				}
			}
		} catch (err) {}
		return result;
	},
	getCheck(truevalue, falsevalue, row, column, cellValue, index) {
		return cellValue == 1 && truevalue || cellValue == 2 && falsevalue || '';
	},
	getCascader(key, arr, step) {
		if(!key){
			return '';
		}
		var result = '',
			step = step || 2;
		(function tem(key, arr, len) {
			len = len || 1;
			var temp = (key.slice(0, step * len) + '0000000000').slice(0, key.length);
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id == temp) {
					result = result + "/" + arr[i].name;
					if (!arr[i].children) {
						return result = result.slice(1);
					} else {
						tem(key, arr[i].children, ++len);
					}
				}
			}
		})(key, arr)
		return result;
	},
}
