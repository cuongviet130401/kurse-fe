import { provokeGet } from "$lib/utils/ServiceApiConnector";

export async function _retrieveCustomerReviews(showroomId: number) {
	return await provokeGet('customer-reviews/showroom/' + showroomId);
}