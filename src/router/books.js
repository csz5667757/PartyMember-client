import List from '@/views/books/List'
import CommentList from '@/views/books/BooksCommentList'
import item from '@/views/books/Item'
export default [
	{
		path: '/books/list',
		component: List,
		name: '图书列表'
	},
	{
		path: '/books/commentlist',
		component: CommentList,
		name: '图书评论管理'
	},
	{
		path: '/books/Item/:id',
		component: item,
		name: '详情'
	},
]
