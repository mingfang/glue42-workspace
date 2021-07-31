import {fetchFromServer, focusWorkspace} from "./utils";

const BootstrapPlugin = async (glue, config) => {
  async function importApplications() {
    await fetchFromServer('/api/applications').then(res => {
      console.log('applications', res)
      glue.appManager.inMemory.import(res.applications, "merge");
    });
  }

  async function importLayouts() {
    await fetchFromServer('/api/layouts').then(res => {
      console.log('layouts', res)
      glue.layouts.import(res.layouts, "merge");
    });
  }

  async function openWorkspaces() {
    const layouts = await glue.layouts.getAll("Workspace");
    console.log('allLayouts', layouts)
    for (let i = 0; i < layouts.length; i++) {
      const workspace = await glue.workspaces.restoreWorkspace(layouts[i].name, {
        newFrame: false,
        noTabHeader: false,
      });

      // lock workspaces
      await workspace.lock(lockConfig => {
        lockConfig.allowExtract = false;
        lockConfig.showCloseButton = false;
        lockConfig.showAddWindowButtons = false;
        lockConfig.showEjectButtons = false;
        lockConfig.showWindowCloseButtons = false;
        return lockConfig;
      });

      // lock groups
      workspace.getAllGroups(group => true)
        .forEach(group => group.lock(lockConfig => {
          lockConfig.showMaximizeButton = false
          return lockConfig
        }));
    }

    // hack to close the default workspace
    await glue.workspaces.getAllWorkspaces()
      .then((workspaces) => workspaces[0].close());

  }

  async function handleWorkspaceSelected() {
    const allWorkspaces = await glue.workspaces.getAllWorkspaces()
    if (allWorkspaces.length > 0) {
      await allWorkspaces[0].frame.onWorkspaceSelected(workspace => {
        // console.log('window.history.state', window.history.state)
        if(window.history.state !== workspace.layoutName) {
          window.history.pushState(workspace.layoutName, workspace.title, `/${workspace.layoutName}`);
          console.log('pushState', workspace.layoutName)
        }
      })
    }
  }

  await importApplications()
  await importLayouts()
  await openWorkspaces()
  await handleWorkspaceSelected()
  await focusWorkspace(glue, config.pathname)
};

export default BootstrapPlugin;