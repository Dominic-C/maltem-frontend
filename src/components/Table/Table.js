import classes from './Table.module.css';
import { NO_EXCHANGE_RATE_FOUND } from '../../constants';

const Table = (props) => {
    const tableBody = props.tableData.map((data) => {
        return <tr key={data.date}>
            <td>{data.date}</td>
            {data.rate === NO_EXCHANGE_RATE_FOUND ?
                <td>{data.rate}</td> :
                <td>{data.rate} {props.symbol}</td>
            }
        </tr>
    })

    return (
        <table className={classes.Table}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Exchange rate</th>
                </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </table>
    )
}

export default Table;
