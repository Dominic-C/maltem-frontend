import React, { Component } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Table from '../../components/Table/Table';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import getSymbolFromCurrency from 'currency-symbol-map';

class DetailsLayout extends Component {
    state = {
        frequency: "1",
        tableData: null,
        symbol: null
    }

    componentDidMount() {
        this.setState({ symbol: getSymbolFromCurrency(this.props.match.params.code) });
        this.updateTableDataHandler();
    }

    componentDidUpdate() {
    }

    updateTableDataHandler = () => {
        switch (this.state.frequency) {
            case "1":
                // code block
                const today = new Date().toISOString();
                console.log(today);
                // call function to set table data
                break;
            case "3":
                // code block
                // call function to set table data
                break;
            case "7":
                // code block
                break;
            default:

        }
    }

    onFrequencyClickedHandler = (event) => {
        this.setState({ frequency: event.target.name });
    }

    render() {
        const code = this.props.match.params.code;
        const name = this.props.currencyData.filter((entry) => {
            return entry.currency_code === code;
        })
        return (
            <div>
                <h1>{code}</h1>
                <p>{name[0].currency_name}</p>
                <ButtonGroup clicked={this.onFrequencyClickedHandler} />
                {
                    this.state.tableData !== null ?
                        <Table tableData={this.state.tableData} /> : null
                }
            </div>
        )
    };
}

export default withRouter(DetailsLayout);