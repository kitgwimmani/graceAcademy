import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const IconMenu = (props) => {
  const { icon: Icon, title, page } = props; // Destructure icon prop and rename it to Icon
  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
    color: "#53958f",
  };
  return (
    <Card className="text-center">
      <Card.Link as={Link} to={page} style={linkStyle}>
        <Card.Body>
          <Icon size={30} /> {/* Render the icon component */}
          <Card.Title style={{fontSize:'1rem'}}>{title}</Card.Title> {/* Use the title prop */}
        </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default IconMenu;
