import React from "react";
import { Button, Row } from "react-bootstrap";


class Buttons extends React.Component {
    render() {
        console.log('props that live in the Buttons component', this.props)
        return (
            <div className="custom-buttons">
                <Row>
                    <Button variant="primary" onClick={this.props.getZenQuotes}>Find More Quotes</Button>
                </Row>
            </div>
        )
    }
}

export default Buttons;