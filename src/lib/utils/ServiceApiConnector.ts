const ORIGIN: string = "https://";
// const ORIGIN: string = "http://";

export function _makePostRequest(path: string, payload: any): Promise<any> {

  console.log(`[DEBUG: api/post/payload]:`);
  console.log(payload);
  return fetch(ORIGIN + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    // body: payload
  }).then(response => { console.log(response); return response.json() })
    .catch(err => { console.log(err); return err.json() });
}

export function _makePutRequest(path: string, payload: any): Promise<any> {

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


export async function _makeGetRequest(path: string, params?: object): Promise<any> {

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

export async function _makeDeleteRequest(path: string, params?: object): Promise<any> {

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

export async function provokeGet(path: string, params?: object) {

  let paramsSuffix: string = "";
  for (const key in params) {
    paramsSuffix += "&" + (key + "=" + params[key])
  }

  return fetch("/server?targetUrl=" + path + paramsSuffix, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => { /*console.log(response);*/ return response.json() })
    .catch(err => { console.log(err); return err; });
}

export async function provokeDelete(path: string, params?: object) {

  let paramsSuffix: string = "";
  for (const key in params) {
    paramsSuffix += "&" + (key + "=" + params[key])
  }

  return fetch("/server?targetUrl=" + path + paramsSuffix, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => { /*console.log(response);*/ return response.json() })
    .catch(err => { console.log(err); return err; });
}

export async function provokePost(path: string, payload: object) {
  console.log(payload)
  return fetch("/server?targetUrl=" + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => { console.log(response); return response.json() })
    .catch(err => { console.log(err); return err; });
}

export async function provokePut(path: string, payload: object) {
  console.log(payload)
  return fetch("/server?targetUrl=" + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => { console.log(response); return response.json() })
    .catch(err => { console.log(err); return err; });
}


export async function _login(payload: object) {
  let responseJson = await _makePostRequest("users/login", payload);
  return responseJson;
}

export async function _approveSellRequest() {

}

export async function _retrieveMotoBrandName(motoBrandId: number) {
  const t = await provokeGet(`moto-brands/${motoBrandId}`);
  return t.name;
}

export async function _retrieveMotoBrandDetails(motoBrandId: number) {
  return await provokeGet(`moto-brands/${motoBrandId}`);
}

export async function _retrieveBikeInformation(id: number) {
  const t = await provokeGet(`motorbikes/${id}`);
  return t;
}
