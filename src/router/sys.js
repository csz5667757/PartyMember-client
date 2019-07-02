import UserList from '@/views/sys/UserList'
import GroupList from '@/views/sys/GroupList'
import RoleList from '@/views/sys/RoleList2'
import MenuList from '@/views/sys/MenuList'
import OrgList from '@/views/sys/OrgList'
import DictionaryList from '@/views/sys/DictionaryList'
import index from '@/views/index'
import LibraryList from '@/views/library/List'

export default [{
					path: '/index',
					component: index,
					name: '首页'
				},
				{
					path: '/xtgl/yhgl',
					component: UserList,
					name: '用户管理'
				},
				{
					path: '/xtgl/jggl',
					component: OrgList,
					name: '机构管理'
				},
				{
					path: '/xtgl/zzgl',
					component: GroupList,
					name: '组织管理'
				},
				{
					path: '/xtgl/jsgl',
					component: RoleList,
					name: '角色管理'
				},
				{
					path: '/xtgl/dhlgl',
					component: MenuList,
					name: '导航栏管理'
				},
				{
					path: '/xtgl/sjzdgl',
					component: DictionaryList,
					name: '数据字典'
				},
				{
					path: '/library/list',
					component: LibraryList,
					name: '图书馆管理'
				},
			]