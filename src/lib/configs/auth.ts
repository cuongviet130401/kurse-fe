import { writable } from 'svelte/store';
import { browser } from '$app/environment'

export const authenticatedUser = writable();

if (browser) {
	let stored = localStorage?.authenticatedUser;
	console.log("STORED: " + stored);
	console.log(typeof(stored));

	if (stored == "undefined") {
		stored = "null";
	}

	if (stored) {
		authenticatedUser.set(JSON.parse(stored));
	}


	authenticatedUser.subscribe((v) => localStorage.authenticatedUser = JSON.stringify(v));
}
