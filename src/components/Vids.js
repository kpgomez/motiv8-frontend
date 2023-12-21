import React from 'react';
import YouTube from 'react-youtube';
import { withAuth0 } from "@auth0/auth0-react";
// import { ListGroup } from "react-bootstrap";

class Vids extends React.Component {
    getVideoId(url) {
        const parts = url.split('/');
        const videoIdIndex = parts.indexOf('vi') + 1;
        let output;
        (videoIdIndex !== 0) && (videoIdIndex < parts.length)
            ? output = parts[videoIdIndex]
            : output = null;
        return output
    }

    render() {
        const opts = {
            height: "100%",
            width: "auto",
        };
        return (
            <>
                <div style={{ maxWidth: '500px', margin: '0 auto', padding: '16px' }}>
                    <YouTube
                        videoId={this.getVideoId(this.props.url)}
                        opts={opts}
                    />
                </div>

                {/* <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {this.props.newsItems.map((item, index) => (
                        <ListGroup.Item key={index}>{item}</ListGroup.Item>
                    ))}
                </ListGroup> */}
            </>
        )
    }
}

export default withAuth0(Vids);