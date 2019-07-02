export default {
	formatMenu(data) {
		if (!data)
			return [];
		var orgs = [];
		var result = [];
		data.forEach((item) => {
			var org = { ...item
			};
			org.submenu = org.menuPath ? false : true;
			orgs.push(org);
		})
		orgs.forEach((item) => {
			item.children = this.getChildren(orgs, item);
		})
		orgs.forEach((item) => {
			if (!item.notop)
				result.push(item);
		})
		return result;
	},
	getChildren(orgs, org) {
		var children = null;
		orgs.forEach((item) => {
			if (item.pid === org.id) {
				if (!children)
					children = [];
				item.notop = true;
				children.push(item);
			}
		})
		return children;
	}
}
