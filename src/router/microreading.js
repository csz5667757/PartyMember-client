import List from '@/views/microreading/List'
import CommentList from '@/views/microreading/CommentList'
import item from '@/views/microreading/Item'
export default [
	{
		path: '/microreading/list',
		component: List,
		name: '微阅读列表'
	},
	{
		path: '/microreading/commentlist',
		component: CommentList,
		name: '微阅读评论管理'
	},
	{
		path: '/microreading/Item/:id',
		component: item,
		name: '详情'
	},
]
