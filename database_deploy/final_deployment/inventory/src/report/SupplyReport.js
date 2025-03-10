import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
//import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { FaSort } from 'react-icons/fa';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import Select from 'react-select';
import Printout from '../components/Printout';
import '../App.css';
//import '../Table.css';




function SupplyReport() {
  const [report, setReport] = useState([]);
  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showPrintable, setShowPrintable] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`https://ghaacademy.com.ng/supply_report`)
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
    { value: 'all', label: 'All Time' },
    { value: 'last_week', label: 'Last Week' },
    { value: 'this_week', label: 'This Week' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_year', label: 'Last Year' },
    { value: 'this_year', label: 'This Year' },
    // Add more options as needed
  ];

  const handleMenuOpen = () => {
    // Reset the data when the select dropdown is clicked
    fetchData(); // This will fetch data from the server
  };

  function handleChange(selectedOption) {
    const currentDate = new Date();
    let startDate;
    let endDate;
    switch (selectedOption.value) {
      case 'last_week':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() - 6);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        break;
      case 'this_week':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));
        break;
      case 'last_month':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        break;
      case 'this_month':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;
      case 'last_year':
        startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
        endDate = new Date(currentDate.getFullYear() - 1, 11, 31);
        break;
      case 'this_year':
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
        break;
      case 'all':
        // Fetch all data again
        fetchData();
        return;
      default:
        //startDate = "2023-01-01";
        //endDate = currentDate.toISOString().split('T')[0];
        return;
    }

    setStartDate(startDate.toISOString().slice(0, 10));
    setEndDate(endDate.toISOString().slice(0, 10));
    // Update the value of the input field with the start date and end date
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    document.getElementById('startDate').value = formattedStartDate;

    const formattedEndDate = endDate.toISOString().slice(0, 10);
    document.getElementById('endDate').value = formattedEndDate;

    // Filter the report based on the selected date range
    const filteredReport = report.filter(item => {
      const supplyDate = new Date(item.supply_date);
      return supplyDate >= startDate && supplyDate <= endDate;
    });

    // Update the report state with the filtered data
    setReport(filteredReport);
  }

  function handleDateChange() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    const filteredReport = report.filter(item => {
      const supplyDate = new Date(item.supply_date);
      return supplyDate >= startDate && supplyDate <= endDate;
    });

    setReport(filteredReport);
  }
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  //document.getElementById('printable').style.display = 'none'
  function handlePrint() {
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
    // Set the header text
    const reportHeader = `Delivery Report from ${new Date(startDate).toLocaleDateString('en-GB')} to ${new Date(endDate).toLocaleDateString('en-GB')}`;
    // Add header to the PDF
    doc.setFontSize(12); // You can adjust the font size as needed
    doc.text(reportHeader, 14, 10); // (text, x, y) - adjust x, y for positioning
    doc.autoTable({
      html: tableRef.current,
      startY: 12,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 8 },
    });

    // Get current timestamp
    const timestamp = new Date().toLocaleString().replace(/[/,:]/g, '-'); // Format timestamp for filename
    const filename = `delivery_report_at_${timestamp}.pdf`; // Create the filename

    doc.save(filename); // Save with the new filename
  };

  function createCSV() {
    const header = [
      "Supply Date",
      "Item",
      "Supplier",
      "Unit",
      "Quantity",
      "Serial Number",
      "ISBN",
      "Barcode",
      "Remark"
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
          escapeCommas(data.supply_date),
          escapeCommas(data.item),
          escapeCommas(data.supplier),
          escapeCommas(data.unit),
          escapeCommas(data.quantity),
          escapeCommas(data.serial_number),
          escapeCommas(data.isbn),
          escapeCommas(data.barcode),
          escapeCommas(data.remark)
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
    link.setAttribute('download', `Delivery_Report_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`);

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
          <h5 className='mt-4'>Delivery Report</h5>
          <div className='row'>
            <div className='mb-2 col-3'>

              <label htmlFor='filter'>Report Period</label>
              <Select
                options={options}
                onChange={handleChange}
                onMenuOpen={() => handleMenuOpen()}
                placeholder="Select an option"
              />

            </div>

            <div className='mb-2 col-2'>
              <label htmlFor=''>From:</label>
              <input type='date'
                className='form-control'
                //value='2023-01-01' 
                id='startDate'
                onChange={handleDateChange}
                onClick={() => handleMenuOpen()}
              />
            </div>

            <div className='mb-2 col-2'>
              <label htmlFor=''>To:</label>
              <input type='date'
                className='form-control'
                //value={new Date().toISOString().split('T')[0]}
                id='endDate'
                onChange={handleDateChange}
                onClick={() => handleMenuOpen()}
              />
            </div>
            <div className='mb-2 col-3'>
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
                <th onClick={() => handleSort('supply_date')}><FaSort /> Supply Date</th>
                <th onClick={() => handleSort('item')} ><FaSort /> Item</th>
                <th onClick={() => handleSort('supplier')}><FaSort /> Supplier</th>
                <th onClick={() => handleSort('unit')}><FaSort /> Unit</th>
                <th onClick={() => handleSort('quantity')}><FaSort /> Quantity</th>
                <th onClick={() => handleSort('serial_number')}><FaSort /> Serial Number</th>
                <th onClick={() => handleSort('isbn')}><FaSort /> ISBN</th>
                <th onClick={() => handleSort('barcode')}><FaSort /> Barcode</th>
                <th onClick={() => handleSort('remark')}><FaSort /> Remark</th>
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
                    <td>{data.supply_date}</td>
                    <td>{data.item}</td>
                    <td>{data.supplier}</td>
                    <td>{data.unit}</td>
                    <td>{data.quantity}</td>
                    <td>{data.serial_number}</td>
                    <td>{data.isbn}</td>
                    <td>{data.barcode}</td>
                    <td>{data.remark}</td>
                  </tr>
                ))
              }

            </tbody>

          </Table>

        </div>
        <div id='printable' style={{ margin: '0', padding: '0', display: 'none' }}>
          <Printout
            //title = {'Delivery Report From ' + document.getElementById('startDate').value + ' To '+ document.getElementById('endDate').value}
            title={`Delivery Report From ${startDate} To ${endDate}`}
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

export default SupplyReport