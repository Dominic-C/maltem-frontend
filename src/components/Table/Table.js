const Table = (props) => {
    const tableBody = this.props.tableData.map((data) => {
        return <tr key={data.date}>
            <td>{data.date}</td>
            <td>{data.exchangeRate} {data.symbol}</td>
        </tr>
    })

    return (
        <table>
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
