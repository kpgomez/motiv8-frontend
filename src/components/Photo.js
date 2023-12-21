import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './Photo.css';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      photos: [],
    };
  }

  updateSearchQuery = (e) => this.setState({ searchQuery: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.searchQuery);
    try {
      const API = process.env.REACT_APP_SERVER;
      const url = `${API}/photos`;

      console.log(url);

      const response = await axios.get(url, {
        params: { searchQuery: this.state.searchQuery },
      });
      console.log(response);
      this.setState({ photos: response.data });
    } catch (err) {
      console.error(err);
    }
  };

  //function from https://dev.to/sbodi10/download-images-using-javascript-51a9
  handleDownload = async (imageURL) => {
    try {
      const response = await fetch(imageURL);
      const blob = await response.blob();

      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = 'photo.jpg';
      link.click();

      URL.revokeObjectURL(blobURL);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Find Photos About...</Form.Label>
            <Form.Control
              onChange={this.updateSearchQuery}
              type="text"
              placeholder="Enter a search term"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>

        {/* {this.state.photos.length > 0 &&
          this.state.photos.map((photo, idx) => (
            <div key={idx}>
              {photo.img_url && (
                <a href={photo.original_image}>
                  <img
                    alt={this.state.searchQuery}
                    width={200}
                    src={photo.img_url}
                  />
                </a>
              )}

              <span>photo by: {photo.photographer} from unsplash</span>
            </div>
          ))} */}
        {/* <div class="container">
          <div class="row g-2">
            <div class="col-6">
              <div class="p-3 border bg-light">Custom column padding</div>
            </div>
            <div class="col-6">
              <div class="p-3 border bg-light">Custom column padding</div>
            </div>
            <div class="col-6">
              <div class="p-3 border bg-light">Custom column padding</div>
            </div>
            <div class="col-6">
              <div class="p-3 border bg-light">Custom column padding</div>
            </div>
          </div>
        </div> */}
        {this.state.photos.length > 0 &&
          this.state.photos.map((photo, idx) => (
            <div key={idx} className="container flex">
              <div className="space">
                {photo.imageURL && (
                  <a href={photo.imageURL}>
                    <img
                      className="rounded border border-1"
                      alt={photo.description}
                      width={450}
                      src={photo.imageURL}
                    />
                  </a>
                )}
                <p>photo by: {photo.creator}</p>
                <Button
                  className="d-grid gap-2 col-6 mx-auto btn btn-success "
                  onClick={() => this.handleDownload(photo.imageURL)}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
      </>
    );
  }
}

export default Photo;
