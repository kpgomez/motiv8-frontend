import React from "react";
import { Button, Carousel } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class Quotes extends React.Component {

    render() {
        const { images } = this.props;
        const imagesLength = images.length;
        return (
            <>
                <Carousel>
                    {
                        this.props.zenQuotes.map((item, idx) => {
                            const imageIndex = idx % imagesLength;
                            const imageUrl = images[imageIndex];
                            // console.log(imageUrl);
                            return (
                                <Carousel.Item key={idx}>
                                    <img
                                        className="d-block w-100"
                                        src={imageUrl}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h1>{item.quote}</h1>
                                        <p>{`- ${item.author}`}</p>
                                        <Button onClick={() => this.props.addQuote(item.quote)}>❤️</Button>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            );
                        }
                        )}
                </Carousel >
            </>
        )
    }
}

export default withAuth0(Quotes);