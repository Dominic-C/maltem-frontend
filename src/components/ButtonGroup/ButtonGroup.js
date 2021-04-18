import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import classes from './ButtonGroup.module.css';
import { TODAY, THREE_DAYS, SEVEN_DAYS } from "../../constants";

const buttonGroup = (props) => {

    return (
        <ButtonGroup className={classes.ButtonGroup}>
            <Button variant="secondary" className={classes.Button} name={TODAY} onClick={props.clicked}>Today</Button>
            <Button variant="secondary" className={classes.Button} name={THREE_DAYS} onClick={props.clicked}>Last 3 days</Button>
            <Button variant="secondary" className={classes.Button} name={SEVEN_DAYS} onClick={props.clicked}>Last 7 days</Button>
        </ButtonGroup>
    )
}

export default buttonGroup;