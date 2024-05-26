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
  }).then(response => {
     /*console.log(response);*/ return response.json()
    })
.catch(err => { console.log(err); return err; });
}

export async function provokePost(path: string, payload: object) {

  const response = await fetch("/server?targetUrl=" + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const responseBody = await response.json();

  if (!response.ok) {
    throw responseBody;
  }

  return responseBody;

  // return fetch("/server?targetUrl=" + path, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(payload)
  // }).then(async (response) => {
  //   console.log(response);
  //   const res = await response.json();
  //   if (response.status >= 400) {
  //     throw res;
  //   }
  //   return res;
  // }).catch(err => {console.error(err); throw err;});
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

