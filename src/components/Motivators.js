
import { Component } from "react";
import axios from "axios";
import Quotes from "./Quotes";
import Buttons from "./Buttons";
import Photo from "./Photo";
import images from "../testData/images.json";
import { Form, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import Vids from "./Vids";

class Motivators extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zenQuotes: [],
            currentVids: false,
            motivation: '',
            staticImages: images.images,
            videos: [],
            userQuotes: [],
            selectedQuote: {}
        }
    }

    //this route hits the server and then Zen Quotes API
    getZenQuotes = () => {
        this.props.getToken()
            .then(jwt => {
                const config = {
                    headers: { 'Authorization': `Bearer ${jwt}` }
                }
                return axios.get(`${process.env.REACT_APP_SERVER}/zenquotes`, config)
            })
            .then(quoteData => this.setState({ zenQuotes: quoteData.data.data }))
            .catch(err => console.error(err));
    }

    addQuote = (likedQuote) => {
        const addedQuote = this.state.zenQuotes.filter(quoteObj => quoteObj.quote === likedQuote);
        console.log(addedQuote);
        this.setState({ selectedQuote: addedQuote }, () => console.log(this.state.selectedQuote));

        this.props.getToken()
            .then(jwt => {
                const config = {
                    headers: { 'Authorization': `Bearer ${jwt}` }
                }
                return axios.post(`${process.env.REACT_APP_SERVER}/quotes`, addedQuote[0], config)
            })
            .catch(err => console.error(err));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const Answer = { dailyMotivation: e.target.dailyMotivation.value }
        this.setState({ motivation: Answer.dailyMotivation }, () => console.log(this.state.motivation));
        this.displayVids();
    }

    displayVids = (e) => {
        let url = `${process.env.REACT_APP_SERVER}/shorts?q=${this.state.motivation}`;
        axios.get(url)
            .then(res => {
                const vids = res.data.data;
                this.setState({ videos: vids, currentVids: true }, () => console.log(this.state.videos));
            })
            .catch(err => {
                let oops = err.message;
                this.setState({ error: oops })
            })
    }

    render() {
        const vidsArr = this.state.videos.map((vid, idx) =>
            <Vids
                key={idx}
                name={vid.name}
                description={vid.description}
                url={vid.content.url}
                width={vid.content.width}
                height={vid.content.height}
            />)

        return (
            <>
                {
                    this.state.currentVids

                        ? <>
                            <Quotes
                                zenQuotes={this.state.zenQuotes}
                                addQuote={this.addQuote}
                                deleteQuote={this.deleteQuote}
                                images={this.state.staticImages}
                                updateFaveQuote={this.updateFaveQuote} />
                            <Buttons getZenQuotes={this.getZenQuotes} />
                            <Photo />
                            {vidsArr}
                        </>

                        : <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="dailyMotivation">
                                <Form.Control type="text" placeholder="What are you trying to find motivation for today?" />
                            </Form.Group>
                            <Button type="submit">Motiv8 Me</Button>
                        </Form>

                }
            </>
        )
    }
  };

  export default withAuth0(Motivators);