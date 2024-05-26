import { writable } from "svelte/store";

function createAuthStore() {

	const { set, subscribe } = writable();

	return {
		save: (authenticationResult: any) => {
			set(authenticationResult);
			localStorage.setItem('authInfo', JSON.stringify(authenticationResult));
		},

		get: () => {
			let authInfo;
			subscribe(v => authInfo = v);
			if (!authInfo && localStorage.authInfo) {
				const parsedData = JSON.parse(localStorage.authInfo)
				set(parsedData)
				return parsedData;
			}
			return authInfo;
		},

		reset: () => {
			set(undefined)
			localStorage.removeItem("authInfo");
		}
	}

}

export const authStore = createAuthStore();


