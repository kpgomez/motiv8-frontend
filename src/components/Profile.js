import React from "react";
import { Card, Button, Carousel, Row, Col} from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class Profile extends React.Component {

    componentDidMount() {
        this.props.getQuotes()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth0;
        const { userQuotes, carouselImages } = this.props;
        const imagesLength = carouselImages.length;
        const carouselStyle = {
            width: "900px",
            height: "900px"
        }
        // console.log(this.props.userQuotes)
        return (
            isAuthenticated && (
                <>

                    <Row>

                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={user.picture} />
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Text>{user.email}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Carousel style={carouselStyle}>
                                {
                                    userQuotes.map((item, idx) => {
                                        const imageIndex = idx % imagesLength;
                                        const imageUrl = carouselImages[imageIndex];
                                        return (
                                            <Carousel.Item interval={2000} key={idx} >
                                                <img
                                                    className="d-block w-100"
                                                    src={imageUrl}
                                                    alt="landscape img"
                                                />
                                                <Carousel.Caption>
                                                    <h1>{item.quote}</h1>
                                                    <p>{item.author}</p>
                                                    <Button variant="danger" onClick={() => this.props.deleteQuote(item)}>🗑</Button>
                                                    <Button variant="primary" onClick={() => this.props.updateFaveQuote(item)}>🫶🏼</Button>
                                                </Carousel.Caption>
                                            </Carousel.Item>

                                        )
                                    })
                                }
                            </Carousel>
                        </Col>

                    </Row>

                </>
            )
        )
    }
}

export default withAuth0(Profile);
