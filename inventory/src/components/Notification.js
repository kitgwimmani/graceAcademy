import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Notification = (props) => {
  const { title,count, page } = props;
  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
  };
  return (
    <Card>
    <Card.Link as={Link} to={page} style={linkStyle} class="btn btn-light">
    
        {title} 
        {count>0 ? (
           <span class="badge bg-danger"> {count}</span>
        ): (
          <span class="badge"></span>
        )}
        
    
      </Card.Link>
      </Card>
  );
};

export default Notification;
