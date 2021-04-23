import React, { Component } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Table from '../../components/Table/Table';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import getSymbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';
import { TODAY, THREE_DAYS, SEVEN_DAYS, NO_EXCHANGE_RATE_FOUND } from '../../constants';
import classes from './DetailsLayout.module.css';

class DetailsLayout extends Component {
    state = {
        frequency: TODAY,
        tableData: null,
        symbol: null,
        currencyInfo: null,
    }

    componentDidMount() {
        this.setState({ symbol: getSymbolFromCurrency(this.props.match.params.code) });
        this.updateTableDataHandler();
        this.updateCurrencyDetailsHandler();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.frequency !== this.state.frequency) {
            this.updateTableDataHandler();
        }
    }

    updateCurrencyDetailsHandler = () => {
        // TODO: use a constant
        // better to have a service, eg apiservice.fetchCurrencies() instead of putting url directly inside code
        axios.get('http://localhost:9000/currencies?type=fiat').then(response => this.setState({ currencyInfo: response.data.response.fiats[this.props.match.params.code] }))
    }

    // returns list of objects each containing date and exchange rate
    queryNDates = async (lastNDays) => {
        // get list of dates
        const dates = [];
        for (let numDays = 0; numDays < lastNDays; numDays++) {
            let date = new Date();
            date.setDate(date.getDate() - numDays);
            dates.push(date.toISOString().slice(0, 10));
        }

        // get list of exchange rates
        const requestURLs = dates.map(date => axios.get(`http://localhost:9000/historical?date=${date}&base=${this.props.base}&symbols=${this.props.match.params.code}`));
        const exchangeRates = await axios.all(requestURLs).then(axios.spread((...responses) => {
            const ratesForNDays = responses.map(response => {
                console.log(response.data, this.props.match.params.code);
                if (response.data.response.rates[this.props.match.params.code] === null) {
                    return NO_EXCHANGE_RATE_FOUND;
                }
                return response.data.response.rates[this.props.match.params.code];
            })
            return ratesForNDays;
        }))

        // combine and return list of objects
        const tableData = dates.map((date, index) => {
            return {
                date: moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY'),
                rate: exchangeRates[index],
            }
        })

        return tableData;
    }

    // TODO: could be written with reducer. useReducer
    updateTableDataHandler = () => {
        // base from props, symbol from state
        switch (this.state.frequency) {
            case TODAY:
                this.queryNDates(1).then(tableData => this.setState({ tableData: tableData }));
                break;
            case THREE_DAYS:
                this.queryNDates(3).then(tableData => this.setState({ tableData: tableData }));
                break;
            case SEVEN_DAYS:
                this.queryNDates(7).then(tableData => this.setState({ tableData: tableData }));
                break;
            default:

        }
    }

    onFrequencyClickedHandler = (event) => {
        this.setState({ frequency: event.target.name }); // can just pass in a string
    }

    render() {
        const code = this.props.match.params.code;
        let name = null;
        if (this.state.currencyInfo !== null) {
            name = this.state.currencyInfo.currency_name;
        }
        return (
            <div className={classes.DetailsContainer}>
                <h4>{code}</h4>
                <p>{name}</p>
                <ButtonGroup clicked={this.onFrequencyClickedHandler} />
                {
                    this.state.tableData !== null ?
                        <Table tableData={this.state.tableData} symbol={this.state.symbol} /> : null
                }
            </div>
        )
    };
}

export default withRouter(DetailsLayout);