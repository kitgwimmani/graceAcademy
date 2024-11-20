import React from 'react';
import { Table } from 'react-bootstrap';

const Printout = ({ title, report }) => {
  if (report.length === 0) {
    return <div>No data available</div>;
  }

  // Extracting column names dynamically from the first object in the report array
  const columns = Object.keys(report[0]);

    
  return (
    <div style={{ margin: '0', padding: '0' }}>
      <h5>{title}</h5>
      <Table striped bordered style={{ fontSize: '8px', margin: '0', padding: '0', width: '100%' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {report.map((data, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{data[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Printout;
