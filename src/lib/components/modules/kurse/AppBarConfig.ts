export const studentMenuStructure = [
	{
		label: "Dashboard",
		href: "/student"
	},
	{
		label: "Courses",
		submenu: [
			{
				label: "Active Courses",
				href: "/student/courses/active"
			},
			{
				label: "History",
				href: "/student/courses/history"
			},
			{
				label: "Search courses",
				href: "/search"
			},
			{
				label: "Test results",
				href: "/student/results"
			},
			{
				label: "My bookmarks",
				href: "/student/bookmarks"
			}
		]
	},
	{
		label: "InfoBoard",
		submenu: [
			{
				label: "Calendar",
				href: "/student/calendar"
			},
			{
				label: "Notifications",
				href: "/student/notifications"
			},
			{
				label: "Action Items",
				href: "/student/todos"
			}
		]
	},
	{
		label: "Magazine",
		href: "/magazine"
	}
]

export const teacherMenuStructure = {

}