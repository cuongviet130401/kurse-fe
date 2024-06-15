import { mockFetching } from "$lib/utils/CommonUtils";

export async function _fetchActionItems() {
	return mockFetching([]);
}

export async function _fetchActiveCourses() {
	return mockFetching([
		{
			id: "heheboiz",
			title: "Introduction to Programming with Python",
			imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VP1dqbcDeIPJCacOSj_wzr5j_abezZLh5g&s",
			tags: [ "python", "easy" ],
			instructor: {
				avatarUrl: "",
				fullName: "Steve Pham"
			},
			unreadNotificationsCount: 4,
			actionItemsCount: 3
		},
		{
			id: "heheboiz",
			title: "Introduction to Programming with Python",
			imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VP1dqbcDeIPJCacOSj_wzr5j_abezZLh5g&s",
			tags: [ "python", "easy" ],
			instructor: {
				avatarUrl: "",
				fullName: "Steve Pham"
			},
			unreadNotificationsCount: 4,
			actionItemsCount: 0
		},
		{
			id: "heheboiz",
			title: "Introduction to Programming with Python",
			imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VP1dqbcDeIPJCacOSj_wzr5j_abezZLh5g&s",
			tags: [ "python", "easy" ],
			instructor: {
				avatarUrl: "",
				fullName: "Steve Pham"
			},
			unreadNotificationsCount: 0,
			actionItemsCount: 3
		}
	]);
}

export async function _fetchInactiveCourses() {
	return mockFetching([]);
}

export async function _fetchRecentCourse() {
	return mockFetching({
		imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VP1dqbcDeIPJCacOSj_wzr5j_abezZLh5g&s",
		title: "Mock Course Title",
		navigationUrl: "",
		progressPercent: 30
	});
}