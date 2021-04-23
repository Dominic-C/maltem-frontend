import ButtonGroup from 'react-bootstrap/ButtonGroup'; // can rename ButtonGroup as ...
import Button from 'react-bootstrap/Button';
import classes from './ButtonGroup.module.css';
import { TODAY, THREE_DAYS, SEVEN_DAYS } from "../../constants";


// TODO: use proptypes for functional components to validate. eg expect clicked function. Will have error if we dont pass the correct props.
const buttonGroup = (props) => { // consistency issue with naming. this component not too reusable. either name it more specifically or make code more general.

    // can use destructuring
    // can pass to onclick an anon function that takes in number of days
    return (
        <ButtonGroup className={classes.ButtonGroup}>
            <Button variant="secondary" className={classes.Button} name={TODAY} onClick={props.clicked}>Today</Button>
            <Button variant="secondary" className={classes.Button} name={THREE_DAYS} onClick={props.clicked}>Last 3 days</Button>
            <Button variant="secondary" className={classes.Button} name={SEVEN_DAYS} onClick={props.clicked}>Last 7 days</Button>
        </ButtonGroup>
    )
}

export default buttonGroup;