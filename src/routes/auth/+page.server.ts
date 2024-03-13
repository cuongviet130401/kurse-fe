import { authenticatedUser } from '$lib/configs/auth';
import { _login } from '$lib/utils/ServiceApiConnector';
import { get } from 'svelte/store';
import type { Actions } from './$types';

export const actions = {
	default: async (event) => {

		const formData = await event.request.formData();

		const preparedPayload = {
			loginIdentity: formData.get("loginIdentity"),
			password: formData.get("password")
		}

		const serverResponse = await _login(preparedPayload);

		if (serverResponse?.success === false) {
			return {success: false}
		}

		console.log(serverResponse);

		event.cookies.set(
			'loggedInUser', serverResponse?.id,
			{
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 30
			}
		);

		authenticatedUser.set(serverResponse);
		console.log("[DEBUG store/authUser] " + JSON.stringify(get(authenticatedUser)));

		return {
			success: true,
			authenticatedUser: serverResponse
		};
	},
} satisfies Actions;