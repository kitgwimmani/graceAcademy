import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = (props) => {
  const { title, count } = props;
  return (
    <Card style={{ width: '18rem', textAlign: 'center' }}>
      
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {count && <Card.Text>{count}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
