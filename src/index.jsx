import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css'

const WorkspaceApp = React.lazy(() => import('./WorkspaceApp'));
const Adapter = React.lazy(() => import('./AdapterApp'));

ReactDOM.render(
  <Router>
    <React.Suspense fallback={<></>}>
    <Switch>
        <Route path="/adapter/:url" component={Adapter}/>
        <Route path="/:workspace" component={WorkspaceApp}/>
        <Route path="/" component={WorkspaceApp}/>
    </Switch>
    </React.Suspense>
  </Router>,
  document.getElementById('root')
);
