import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FaSort } from 'react-icons/fa';
//import { Link } from 'react-router-dom';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import Select from 'react-select';
import Printout from '../components/Printout';
import '../App.css';
//import '../Table.css';

function ReorderReport() {
  const [report, setReport] = useState([]);
  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://localhost:8081/stock_level`)
      .then(res => setReport(res.data))
      .catch(err => console.log(err));
  };
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const sortedInventory = [...report].sort((a, b) => {
    if (sortBy) {
      const valA = String(a[sortBy]).toLowerCase();
      const valB = String(b[sortBy]).toLowerCase();
      if (valA < valB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const options = [
    { value: 'all', label: 'All' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'low_stock', label: 'Low Stock' },
  ];

  const handleMenuOpen = () => {
    // Reset the data when the select dropdown is clicked
    fetchData(); // This will fetch data from the server
  };

  function handleChange(selectedOption) {
   
    switch (selectedOption.value) {
      case 'out_of_stock':
        break;
      case 'low_stock':
        break;
      case 'all':
        // Fetch all data again
        fetchData();
        return;
      default:
        // Handle other options
        return;
    }

 
    // Filter the report based on the selected date range
    const filteredReport = report.filter(item => {
      return
    });
  
    // Update the report state with the filtered data
    setReport(filteredReport);
  }

  function handlePrint (){
    const nonPrintableContent = document.getElementById('non-printable-content');
    if (nonPrintableContent) {
      nonPrintableContent.style.display = 'none';
      const nonPrint = document.getElementById('non-print');
      if (nonPrint) nonPrint.style.display = 'none';
      const printableContent = document.getElementById('printable');
      if (printableContent) printableContent.style.display = 'block';
    }
    // Print the page
    window.print();

    // Show the non-printable content again after printing is done
    if (nonPrintableContent) {
      nonPrintableContent.style.display = 'block';
      document.getElementById('non-print').style.display = 'block'
      document.getElementById('printable').style.display = 'none'
    }
  };

  
  //download pdf
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.autoTable({
      html: tableRef.current,
      startY: 10,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 8 },
    });

    doc.save('Reorder_report.pdf');
  };

  function createCSV() {
    const header = [
      "Item",
      "Serial Number",
      "ISBN",
      "Threshold",
      "Quantity Left",
      "Reorder URL"
    ];
    const csvRows = [];

    // Function to escape commas by enclosing the text in double quotes
    const escapeCommas = (text) => {
      if (text && text.toString().includes(',')) {
        return `"${text}"`;
      }
      return text;
    };

    // Add header row
    csvRows.push(header.join(','));

    // Add data rows
    sortedInventory
      .filter((data) => {
        const searchLower = search.toLowerCase();
        // Specific return statement to filter data based on the search
        return (
          searchLower === '' ||
          Object.values(data).some(
            (value) =>
              value && value.toString().toLowerCase().includes(searchLower)
          )
        );
      })
      .forEach((data) => {
        const rowData = [
          escapeCommas(data.name),
          escapeCommas(data.serial_number),
          escapeCommas(data.isbn),
          escapeCommas(data.threshold),
          escapeCommas(data.quantity),
          escapeCommas(data.reorder_url)
        ];
        csvRows.push(rowData.join(','));
      });

    // Combine rows into a single CSV string
    const csvString = csvRows.join('\n');

    // Create a Blob object containing the CSV data
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'table.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);

    // Click the anchor element to trigger the download
    link.click();

    // Remove the temporary anchor element
    document.body.removeChild(link);
  }
  

  return (
    <div className='main-content' id='printable-content'>
      <Container>
      <div id="non-print">
        <h5 className='mt-4'>Reorder Report</h5>
        <div className='row'>
          <div className='mb-2 col-5'>

            <label htmlFor='filter'>Report Period</label>
            <Select
              options={options}
              onChange={handleChange}
              placeholder="Select an option"
            />

          </div>

          
          <div className='mb-2 col-5'>
          <label htmlFor=''>Filter Report</label>
          <Form>
          <InputGroup >
            <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Items' />
          </InputGroup>

        </Form>
          </div>

          <div className='col-2'>
        <label htmlFor=''>Exports</label>
        <br></br>
          <div class="btn-group " role="group" aria-label="outputs">
          <button className='btn  success ' onClick={handlePrint}> Print </button>
          <button className='btn  btn-dark ' onClick={downloadPDF}>PDF</button>
          <button className='btn  btn-light ' onClick={createCSV}>CSV</button>
          </div>
          </div>
        </div>
        
        <Table striped bordered hover style={{ fontSize: '12px' }} ref={tableRef}>
          <thead>
            <tr>
            <th onClick={() => handleSort('name')}><FaSort/> Item</th>
            <th onClick={() => handleSort('serial_number')}><FaSort/> Serial Number</th>
            <th onClick={() => handleSort('isbn')}><FaSort/> ISBN</th>
            <th onClick={() => handleSort('threshold')}><FaSort/> Threshold</th>
            <th onClick={() => handleSort('quantity')}><FaSort/> Quantity Left</th>
            <th onClick={() => handleSort('reorder_url')}><FaSort/> Reorder URL</th>
            </tr>
          </thead>
          <tbody>

            {
              sortedInventory.filter((data) => {
                const searchLower = search.toLowerCase();
                //specific   return search.toLowerCase()=== ''? data : data.item.toLowerCase().includes(search)
                return (
                  searchLower === '' ||
                  Object.values(data).some(
                    (value) =>
                      value && value.toString().toLowerCase().includes(searchLower)
                  )
                );
              }).map((data, i) => (
                <tr key={i}>
                <td>{data.name}</td>
                <td>{data.serial_number}</td>
                <td>{data.isbn}</td>
                <td>{data.threshold}</td>
                  <td>{data.quantity}</td>
                  <td><a href={data.reorder_url}>{data.reorder_url}</a></td>
                </tr>
              ))
            }

          </tbody>

        </Table>
        </div>
        <div  id='printable' style={{ margin: '0', padding: '0', display: 'none' }}>
        <Printout 
        //title = {'Delivery Report From ' + document.getElementById('startDate').value + ' To '+ document.getElementById('endDate').value}
        title={`Reorder Report`}
        report={sortedInventory.filter((data) => {
                const searchLower = search.toLowerCase();
                //specific   return search.toLowerCase()=== ''? data : data.item.toLowerCase().includes(search)
                return (
                  searchLower === '' ||
                  Object.values(data).some(
                    (value) =>
                      value && value.toString().toLowerCase().includes(searchLower)
                  )
                );
              })}
         /> 
         </div>
      </Container>
    </div>


  )
}

export default ReorderReport