import { browser } from "$app/environment";
import { writable } from "svelte/store";

function createAuthStore() {

	const { set, subscribe } = writable();

	return {
		save: (authenticationResult: any) => {
			set(authenticationResult);
			if (browser) {
				localStorage?.setItem('authInfo', JSON.stringify(authenticationResult));
			}
		},

		get: () => {
			let authInfo;
			subscribe(v => authInfo = v);
			if (!authInfo && browser && localStorage?.authInfo) {
				const parsedData = JSON.parse(localStorage?.authInfo)
				set(parsedData)
				return parsedData;
			}
			return authInfo;
		},

		reset: () => {
			set(undefined)
			if (browser) {
				localStorage.removeItem("authInfo");
			}
		}
	}

}

export const authStore = createAuthStore();


