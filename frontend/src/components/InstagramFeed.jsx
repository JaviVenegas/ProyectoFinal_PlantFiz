import { useState, useEffect } from 'react';
import { Container, Row, Col, Card} from "react-bootstrap"; 

const InstagramFeed = () => {
        const { posts, setPost} = useState([]);

        useEffect(() => {
            const fetchInstagramPosts = async () => {
                try {
                    const response = await fetch('https://graph.facebook.com/v16.0/instagram_oembed?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FCL7w4cZK7Yk%2F&fields=media_url,caption,permalink');
                    const data = await response.json();
                    setPost(data);
                } catch (error) {
                    console.error('Error fetching Instagram posts:', error);
                }
            };

            fetchInstagramPosts();
        }, []);

    return (
        <Container className="mt-4">
      <h2 className="text-center mb-4">Últimos Posts de Instagram</h2>
      <Row>
        {posts.slice(0, 6).map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Card>
              <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                <Card.Img variant="top" src={post.media_url} alt="Instagram Post" />
              </a>
              {post.caption && <Card.Body><Card.Text>{post.caption}</Card.Text></Card.Body>}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InstagramFeed;
