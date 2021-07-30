// Glue42 Platform app, aka Main app
import {GlueContext, GlueProvider, useGlue} from '@glue42/react-hooks';
import GlueWebPlatform from '@glue42/web-platform';
import GlueWorkspaces from '@glue42/workspaces-api';

// workspace component
import Workspaces from "@glue42/workspaces-ui-react";
import "@glue42/workspaces-ui-react/dist/styles/glue42-theme.css";
import "@glue42/workspaces-ui-react/dist/styles/goldenlayout-base.css";
import "@glue42/workspaces-ui-react/dist/styles/popups.css";
import React, {useContext} from 'react';

// Glue42 Platform configuration
import applications from './applications'
import channels from './channels'
import layouts from './layouts'
import {fetchFromServer} from "./utils";

const bootstrap = async (glue, config) => {
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
    console.log('all layouts', layouts)
    for (let i = 0; i < layouts.length; i++) {
      await glue.workspaces.restoreWorkspace(layouts[i].name, {
        newFrame: false,
      });
    }

    await glue.workspaces.getAllWorkspaces()
      .then((workspaces)=> console.log('workspaces', workspaces))
    // hack to close the default workspace
    await glue.workspaces.getAllWorkspaces()
      .then((workspaces) => workspaces[0].close());

  }

  await importApplications();
  await importLayouts();
  await openWorkspaces()

};

const glue42settings = {
  webPlatform: {
    factory: GlueWebPlatform,
    config: {
      glue: {
        libraries: [GlueWorkspaces],
      },
      workspaces: {
        src: "/",
        isFrame: true,
        frameCache: false
      },
      channels,
      applications,
      layouts,
      plugins: {
        // Plugin definitions.
        definitions: [
          {
            name: "bootstrap",
            config: {},
            start: bootstrap
          }
        ]
      }
    }
  }
}

console.log("settings", glue42settings)

// main app render
// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  return (
    <GlueProvider settings={glue42settings}>
      <Workspaces/>
    </GlueProvider>
  );
}
