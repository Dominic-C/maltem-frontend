import './App.css';
import LandingLayout from './containers/LandingLayout/LandingLayout';
import DetailsLayout from './containers/DetailsLayout/DetailsLayout';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function App() {
    const [currencyData, setCurrencyData] = useState("");
    const [currencyList, setCurrencyList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/currencies?type=fiat")
            .then((response) => {
                setCurrencyData(response.data);
                setCurrencyList(Object.keys(response.data.response.fiats));
            })
            .catch();
    })

    return (
        <BrowserRouter>
            <Navbar currencyList={currencyList} />
            <Switch>
                <Route path="/" exact component={() => <LandingLayout currencyData={currencyData} />} />
                <Route path="/:code" exact component={DetailsLayout} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
