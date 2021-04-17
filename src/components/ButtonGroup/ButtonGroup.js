import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const buttonGroup = (props) => {

    return (
        <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" name="1" onClick={props.clicked}>Today</Button>
            <Button variant="secondary" name="3" onClick={props.clicked}>Last 3 days</Button>
            <Button variant="secondary" name="7" onClick={props.clicked}>Last 7 days</Button>
        </ButtonGroup>
    )
}

export default buttonGroup;