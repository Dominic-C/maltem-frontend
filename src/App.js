import './App.css';
import LandingLayout from './containers/LandingLayout/LandingLayout';
import DetailsLayout from './containers/DetailsLayout/DetailsLayout';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

    state = {
        currencyList: [],
        currencyData: [],
        currencyRates: '',
        base: 'SGD'
    }
    componentDidMount() {
        this.updateCurrencyList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.base !== this.state.base) {
            this.updateCurrencyList();
        }
    }

    updateBaseHandler = (newBase) => {
        this.setState({ base: newBase });
    }

    updateCurrencyList = async () => {
        axios.get('http://localhost:9000/currencies?type=fiat')
            .then((res) => {
                axios.get(`http://localhost:9000/latest?base=${this.state.base}`)
                    .then((response) => {
                        this.setState({ currencyData: Object.keys(res.data).map((key => res.data[key])) });
                        this.setState({ currencyList: Object.keys(res.data) });
                        this.setState({ currencyRates: response.data });
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
