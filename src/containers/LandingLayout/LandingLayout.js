import React, { PureComponent } from "react";
import Card from '../../components/Card/Card';
import getSymbolFromCurrency from 'currency-symbol-map';
import classes from './LandingLayout.module.css';
import { withRouter } from 'react-router-dom';


class LandingLayout extends PureComponent {

    onClickHandler = (code) => {
        this.props.history.push(this.props.location.pathname + code);
    }

    render() {
        let currencyDataList = null;
        if (this.props.currencyData.length > 0) {
            currencyDataList = this.props.currencyData.map((item) => {
                return <Card
                    key={item.currency_code}
                    title={item.currency_code}
                    name={item.currency_name}
                    decimals={item.decimal_units}
                    symbol={getSymbolFromCurrency(item.currency_code)}
                    rate={this.props.currencyRates[item.currency_code]}
                    clicked={() => this.onClickHandler.bind(this, item.currency_code)}
                />
            })
        }
        return (
            <div className={classes.Center}>
                {currencyDataList}
            </div>
        );
    }
};
export default withRouter(LandingLayout);