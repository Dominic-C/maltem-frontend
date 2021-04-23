import './App.css';
import LandingLayout from './containers/LandingLayout/LandingLayout';
import DetailsLayout from './containers/DetailsLayout/DetailsLayout';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage';

class App extends Component {

    state = {
        currencyList: [],
        currencyData: [],
        currencyRates: '',
        base: 'SGD'
    }
    componentDidMount() {
        this.setState({ base: ls.get('base') || 'SGD' });
        this.updateCurrencyList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.base !== this.state.base) {
            this.updateCurrencyList();
        }
    }

    updateBaseHandler = (newBase) => {
        // persist to local storage
        ls.set('base', newBase);
        this.setState({ base: newBase });
    }

    // TODO: use service to retrieve currencies
    // could use promises.all will do things in parallel.
    updateCurrencyList = async () => {
        axios.get('http://localhost:9000/currencies?type=fiat')
            .then((res) => {
                axios.get(`http://localhost:9000/latest?base=${this.state.base}`)
                    .then((response) => {
                        this.setState({ currencyData: Object.keys(res.data.response.fiats).map((key => res.data.response.fiats[key])) });
                        this.setState({ currencyList: Object.keys(res.data.response.fiats) });
                        this.setState({ currencyRates: response.data.response.rates });
                    })
                    .catch(error => console.log(error));
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Navbar currencyList={this.state.currencyList} baseHandler={this.updateBaseHandler} base={this.state.base} />
                <Switch>
                    <Route path='/' exact component={() => <LandingLayout currencyData={this.state.currencyData} currencyRates={this.state.currencyRates} />} />
                    <Route path='/:code' exact component={() => <DetailsLayout base={this.state.base} currencyData={this.state.currencyData} />} />
                </Switch>
            </div>
        );

    }
};

export default App;
