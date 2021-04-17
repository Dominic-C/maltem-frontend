import classes from './Card.module.css';

const Card = (props) => {
    let rate = null;
    if (props.rate && props.decimals) {
        rate = props.rate.toFixed(props.decimals);
    }

    return (
        <div className={classes.Card} onClick={props.clicked()}>
            <div className={classes.TopItems}>
                <h4 className={`${classes.Code} ${classes.TopItem}`}>{props.title}</h4>
                <h4 className={`${classes.Rate} ${classes.TopItem}`}>{rate}{props.symbol}</h4>
            </div>
            <p className={classes.Name}>{props.name}</p>
        </div>
    )
}

export default Card;