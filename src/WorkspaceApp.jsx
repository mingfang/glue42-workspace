// Glue42 Platform app, aka Main app
import {GlueProvider} from '@glue42/react-hooks';
import GlueWebPlatform from '@glue42/web-platform';
import GlueWorkspaces from '@glue42/workspaces-api';

// workspace component
import Workspaces from "@glue42/workspaces-ui-react";
import "@glue42/workspaces-ui-react/dist/styles/glue42-theme.css";
import "@glue42/workspaces-ui-react/dist/styles/goldenlayout-base.css";
import "@glue42/workspaces-ui-react/dist/styles/popups.css";
import React from 'react';

// Glue42 Platform configuration
import applications from './applications'
import channels from './channels'
import layouts from './layouts'

import BootstrapPlugin from "./BootstrapPlugin";
import HistoryListener from "./HistoryListener";

// main app render
// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  const pathname = props.location.pathname.split('/')[1]
  console.log('pathname', pathname)

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
              name: "BootstrapPlugin",
              config: {
                pathname: pathname
              },
              start: BootstrapPlugin
            }
          ]
        }
      }
    }
  }

  return (
    <GlueProvider settings={glue42settings}>
      <Workspaces components={{
        header: {
          AddWorkspaceComponent: () => <></>
        }
      }}/>
      <HistoryListener/>
    </GlueProvider>
  );
}

