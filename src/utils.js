export function fetchFromServer(api, body={}) {
  return fetch(api, {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(result => result.json())
}
