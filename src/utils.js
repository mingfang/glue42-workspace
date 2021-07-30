export function fetchFromServer(api, body={}) {
  return fetch(api, {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(result => result.json())
}

export async function focusWorkspace(glue, focusName) {
  let focusWorkspace = await glue.workspaces.getWorkspace(workspace => workspace.layoutName === focusName)
  if (!focusWorkspace) {
    const allWorkspaces = await glue.workspaces.getAllWorkspaces()
    if (allWorkspaces.length > 0) {
      focusWorkspace = allWorkspaces[0]
    }
  }
  if (focusWorkspace) {
    focusWorkspace.focus();
    console.log('focusWorkspace', focusWorkspace.layoutName)
  }
}
