import type { RequestHandler } from '../$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_KURSE_API_HOST } from "$env/static/public";

const ORIGIN: string = PUBLIC_KURSE_API_HOST;

function getTargetUrl(url: any) {
	const targetUrl = url.searchParams.get("targetUrl") ?? undefined;
	if (!targetUrl) {
		throw error(400, "targetUrl is required");
	}
	return targetUrl;
}

export const GET: RequestHandler = async ({url: any}) => {

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
	console.log(url + " ->> " + targetUrl);
	console.log(PUBLIC_KURSE_API_HOST);

	let body = await request.json();

	const t = await _makePostRequest(targetUrl, body);

	if (t instanceof Error) {
		return new Response(JSON.stringify(
			{
				httpStatus: 404,
				message: t.message,
				description: t.cause
			}
		), { status: 404 });
	}

	const tBody = await t.json();
	if (t.status >= 400) {

		return new Response(JSON.stringify(
			{
				httpStatus: t.status,
				...tBody
			}
		), { status: t.status });
	}

	console.log("[DEBUG api/response]: " + targetUrl)
	console.log(t);

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

function _makePostRequest(path: string, payload: any): Promise<any> {

  console.log(`[DEBUG: api/post/payload]:`);
  console.log(payload);
  return fetch(ORIGIN + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    // body: payload
  }).then(response => response)
		.catch(err => err);
}

function _makePutRequest(path: string, payload: any): Promise<any> {

  console.log(`[DEBUG: api/post/payload]:`);
  console.log(payload);
  return fetch(ORIGIN + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    // body: payload
  }).then(response => { console.log(response); return response.json() })
    .catch(err => { console.log(err); return err.json() });
}

async function _makeGetRequest(path: string, params?: object): Promise<any> {

  let paramsSuffix: string = "?";
  if (!!params) {
    let paramsSuffix: string = "?";
    for (const key in params) {
      paramsSuffix += key + "=" + params[key] + "&";
    }
  }

  paramsSuffix = paramsSuffix.slice(0, -1);
  console.log(`[DEBUG: api]: GET ${path}${paramsSuffix}`);

  return fetch(ORIGIN + path + paramsSuffix, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => { /*console.log(response);*/ return response.json() })
    .catch(err => { console.log(err); return err; });
}

async function _makeDeleteRequest(path: string, params?: object): Promise<any> {

  let paramsSuffix: string = "?";
  if (!!params) {
    let paramsSuffix: string = "?";
    for (const key in params) {
      paramsSuffix += key + "=" + params[key] + "&";
    }
  }

  paramsSuffix = paramsSuffix.slice(0, -1);
  console.log(`[DEBUG: api]: DELETE ${path}${paramsSuffix}`);

  return fetch(ORIGIN + path + paramsSuffix, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => { /*console.log(response);*/ return response.json() })
    .catch(err => { console.log(err); return err; });
}