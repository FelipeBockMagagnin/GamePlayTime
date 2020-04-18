import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import GamesSearch from './pages/GamesSearch';
import Header from './components/Header/Header';
import GameDescription from './pages/GameDescription';
import Login from './pages/Login';

export default function Routes() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path='/' exact component={Landing} />
                    <Route path='/login' exact component={Login}/>
                    <Route path='/games' exact component={GamesSearch} />
                    <Route path='/games/:id' component={GameDescription} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}