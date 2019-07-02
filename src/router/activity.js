import List from '@/views/activity/List'
import CommentList from '@/views/activity/CommentList'
import item from '@/views/activity/Item'

export default [
	{
		path: '/activity/list',
		component: List,
		name: '活动列表'
	},
	{
		path: '/activity/commentlist',
		component: CommentList,
		name: '活动评论管理'
	},
	{
		path: '/activity/Item/:id',
		component: item,
		name: '详情'
	},
]
