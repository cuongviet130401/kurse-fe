import { _makeDeleteRequest, _makeGetRequest, _makePostRequest, _makePutRequest } from '$lib/utils/ServiceApiConnector';
import type { RequestHandler } from '../$types';
import { error } from '@sveltejs/kit';

function getTargetUrl(url) {
	const targetUrl = url.searchParams.get("targetUrl") ?? undefined;
	if (!targetUrl) {
		throw error(400, "targetUrl is required");
	}
	url.searchParams.delete("targetUrl");
	return url;
}

export const GET: RequestHandler = async ({url}) => {

	const targetUrl = getTargetUrl(url);
	let params: object | undefined = undefined;

	if (url.searchParams.size > 0) {
		params = {}
		url.searchParams.forEach((value, key) => {
			params[key] = value;
		});
	}

	const t = await _makeGetRequest(targetUrl, params);

	console.log("[DEBUG api/response]: " + targetUrl)
	console.log(t);

	if (t.status >= 400) {
		throw error(t.status, t);
	}

	return new Response( JSON.stringify(t) );
};

export const DELETE: RequestHandler = async ({url}) => {

	const targetUrl = url.searchParams.get("targetUrl")??undefined;
	console.log(url.searchParams.get("targetUrl"));


	if (!targetUrl) {
		throw error(400, "targetUrl is required");
	}

	url.searchParams.delete("targetUrl");

	let params: object | undefined = undefined;
	if (url.searchParams.size > 0) {
		params = {}
		url.searchParams.forEach((value, key) => {
			params[key] = value;
		});
	}

	const t = await _makeDeleteRequest(targetUrl, params);

	console.log("[DEBUG api/response]: " + targetUrl)
	console.log(t);

	if (t.status >= 400) {
		throw error(t.status, t);
	}

	return new Response( JSON.stringify(t) );

};

export const POST: RequestHandler = async ({url, request}) => {

	const targetUrl = getTargetUrl(url);
	let body = await request.json();

	const t = await _makePostRequest(targetUrl, body);
	const tBody = await t.json();

	console.log("[DEBUG api/response]: " + targetUrl)
	console.log(t);

	if (t.status >= 400) {
		return new Response(JSON.stringify(
			{
				httpStatus: t.status,
				...tBody
			}
		), { status: t.status });
	}

	return new Response( JSON.stringify(tBody) );

}

export const PUT: RequestHandler = async ({url, request}) => {

	const targetUrl = getTargetUrl(url);
	let body = await request.json();
	const t = await _makePutRequest(targetUrl, body);

	console.log("[DEBUG api/response]: " + targetUrl)
	console.log(t);

	if (t.status >= 400) {
		throw error(t.status, t);
	}

	return new Response( JSON.stringify(t) );
}