import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import AppBar from './modules/views/AppBar';
import Home from './modules/Home';
import Form from './modules/views/Form';
import Result from './modules/views/Result';
import Analysis from './modules/views/Analysis';


function App() {
  return (
    <section>
      <HashRouter>
        <Route path="/" component={AppBar}/> 
        <Route path="/" exact component={Home}/> 
        <Route path="/form/:id" component={Form} />
        <Route path="/:id/result" component={Result} />
        <Route path="/:id/analysis" component={Analysis} />
      </HashRouter>
    </section>
  );
}

export default App;