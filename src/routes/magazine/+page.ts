export async function _fetchFeaturedPosts() {
	await new Promise(resolve => setTimeout(resolve, 3000));
	return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}

