
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Col, Form, Row, Table, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import QRCode from "react-qr-code";
import ModalDeleteData from './ModalDeleteData';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '60px',
    boxShadow: '1px 2px 40px 2px lightgray',
  },
};

function Home() {
  // const [qrValue, setQrValue] = useState('Donor-1')
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [donnerid, setDonnerid] = useState('');
  const [userName, setUserName] = useState('');
  const [bgroup, setBgroup] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [datetime, setDatetime] = useState('');
  const [count, setCount] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);  // To toggle modal visibility
  const [itemToDelete, setItemToDelete] = useState(null);  // Store the item to be deleted


  const navi = useNavigate();

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const handleNavigate = () => {
    navi('/addblood');
    // navi('/signup')
  };
  // const qrCodeCreate = async (id) => {
  //   console.log('qr code');
  //   return (
  //     <QRCode
  //       size={50}
  //       style={{ height: "auto", maxWidth: "100%", width: "100%" }}
  //       value={id}
  //       viewBox={`0 0 50 50`}
  //     />
  //   )
  // }
  const handleSubmit = async (e) => {

    //donnerid
    // const qrData = await qrCodeCreate(donnerid)
    // console.log(qrData.props, qrData.type);

    e.preventDefault();
    try {
      axios.post('https://67593f4e60576a194d140021.mockapi.io/donner',
        { donnerid, userName, bgroup, userNumber, datetime })
        .then(() => {
          setDonnerid('');
          setUserName('');
          setBgroup('');
          setUserNumber('');
          setDatetime('');
          closeModal();
          alert('successfully donor data updated')
          getApiData();
        })
    } catch (error) {
      alert(error)
    }

  }

  async function getApiData() {

    try {
      setLoading(true)
      const response = await axios.get('https://67593f4e60576a194d140021.mockapi.io/donner')
      setApiData(response.data)
      let data = response.data
      // alert(data[data.length-1].id)
      let idNumber = Number(data[data.length-1].id)
      // alert(idNumber, `Donor-${idNumber + 1}`)
      // console.log(idNumber, `Donor-${idNumber + 1}`)
      setDonnerid(`Donor-${idNumber + 1}`)
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    getApiData()
  }, [])
  // let qrIdValue = `http://localhost:5173/donordetail/${id}`
  console.log(apiData);
  const filterBlood = (apidata, bloodCaps, bloodSmall) => {
    let data = apiData.filter(item => item.bgroup === bloodCaps || item.bgroup === bloodSmall)
    return data
  }
  // let filterBloodTypes = apiData.filter(item => item.bgroup === 'A+' || item.bgroup === 'a+')
  // console.log(filterBloodTypes);
  const bloodAPositive = filterBlood(apiData, 'A+', 'a+')
  const bloodANegative = filterBlood(apiData, 'A-', 'a-')
  const bloodBPositive = filterBlood(apiData, 'B+', 'b+')
  const bloodBNegative = filterBlood(apiData, 'B-', 'b-')
  const bloodOPositive = filterBlood(apiData, 'O+', 'o+')
  const bloodONegative = filterBlood(apiData, 'O-', 'o-')
  const bloodABPositive = filterBlood(apiData, 'AB+', 'ab+')
  const bloodABNegative = filterBlood(apiData, 'AB-', 'ab-')
  // console.log(bloodAPositive);

  // const handleDelete = async(id) => {
  //   try {
  //     setLoading(true)
  //     await axios.delete(`https://67593f4e60576a194d140021.mockapi.io/donner/${id}`)
  //       .then(()=>{
  //         alert('successfully donor data deleted')
  //         getApiData();
  //       })
  //     setLoading(false)
  //   } catch (error) {
  //     alert(error)
  //   }
  // }
  const handleDelete = async (itemId) => {
    try {
      // Call the API to delete the item
      const response = await fetch(`https://67593f4e60576a194d140021.mockapi.io/donner/${itemId}`, {
        method: 'DELETE', // DELETE request to the API
      });

      if (response.ok) {
        // If successful, you can update the state (e.g., remove the item from the list)
        console.log('Item deleted successfully');
        alert('donro is deleted')
        // Optionally update the state to remove the deleted item from the UI
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error occurred while deleting item:', error);
    } finally {
      // Close the modal after the deletion attempt
      handleCloseModal();
    }
  };


  const handleShowModal = (itemId) => {
    setItemToDelete(itemId);
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setItemToDelete(null);
    getApiData()
  };
  return (
    <div className='container'>
      {/* {qrIdValue &&
        <QRCode
          size={50}
          style={{ height: "auto", maxWidth: "100%", width: "10%" }}
          value={qrIdValue}
          viewBox={`0 0 50 50`}
        />
      } */}
      <div className="card">
        <div className='d-flex justify-content-between'>

          <button className='btn btn-warning' onClick={openModal}>Blood Donor</button>
          <button className='btn btn-success' onClick={handleNavigate}>Add blood</button>
        </div>

        {loading ?
          <div className='text-danger'>
            <Spinner animation="border" role="status">
              <span className="visually-hidden fs-1">Loading...</span>
            </Spinner>
          </div> :

          <div style={{ maxHeight: '200px', overflow: 'auto' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Donor ID</th>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Mobile Number</th>
                  <th>Date & Time</th>
                  <th>QR code</th>
                  <th>Donor details</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {apiData && apiData.map((a, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{a.donnerid}</td>
                    <td>{a.userName}</td>
                    <td>{a.bgroup}</td>
                    <td>{a.userNumber}</td>
                    <td>{a.datetime}</td>
                    <td>{
                      <QRCode
                        size={256}
                        style={{ height: "auto", width: "20px" }}
                        value={`https://bloodbank-drab.vercel.app/donordetail/${a.id}`}
                        viewBox={`0 0 256 256`}
                      />}</td>
                    <td><Link to={`/donordetail/${a.id}`}>View Details</Link></td>
                    <td><Button variant='danger' onClick={() => handleShowModal(a.id)}>Delete</Button></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        }

      </div>
      <div className="card my-3">
        <h5 className='text-center'>Blood Counts</h5>
        <div className='d-flex justify-content-between d-none'>

          <button className='btn btn-warning' onClick={openModal}>Blood Donor</button>
          <button className='btn btn-success' onClick={handleNavigate}>Add blood</button>
        </div>

        {loading ?
          <div className='text-danger'>
            <Spinner animation="border" role="status">
              <span className="visually-hidden fs-1">Loading...</span>
            </Spinner>
          </div> :

          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Count</th>
                  <th>A+</th>
                  <th>A-</th>
                  <th>B+</th>
                  <th>B-</th>
                  <th>AB+</th>
                  <th>AB-</th>
                  <th>O+</th>
                  <th>O-</th>
                </tr>
              </thead>
              <tbody>
                {/* {apiData && apiData.map((a, index) => */}
                <tr >
                  <td>Count</td>
                  <td>{bloodAPositive.length}</td>
                  <td>{bloodANegative.length}</td>
                  <td>{bloodBPositive.length}</td>
                  <td>{bloodBNegative.length}</td>
                  <td>{bloodOPositive.length}</td>
                  <td>{bloodONegative.length}</td>
                  <td>{bloodABPositive.length}</td>
                  <td>{bloodABNegative.length}</td>

                </tr>
                {/* )} */}
              </tbody>
            </Table>
          </div>
        }

      </div>
      <div className="card d-none">
        <div className='d-flex justify-content-between'>

          <button className='btn btn-warning' onClick={openModal}>Blood Donor</button>
          <button className='btn btn-success' onClick={handleNavigate}>Add blood</button>
        </div>

        {loading ?
          <div className='text-danger'>
            <Spinner animation="border" role="status">
              <span className="visually-hidden fs-1">Loading...</span>
            </Spinner>
          </div> :

          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Donor ID</th>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Mobile Number</th>
                  <th>Date & Time</th>
                  <th>QR code</th>
                  <th>Donor details</th>
                </tr>
              </thead>
              <tbody>
                {apiData && apiData.map((a, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{a.donnerid}</td>
                    <td>{a.userName}</td>
                    <td>{a.bgroup}</td>
                    <td>{a.userNumber}</td>
                    <td>{a.datetime}</td>
                    <td>{
                      <QRCode
                        size={256}
                        style={{ height: "auto", width: "20px" }}
                        value={`https://bloodbank-drab.vercel.app/donordetail/${a.id}`}
                        viewBox={`0 0 256 256`}
                      />}</td>
                    <td><Link to={`/donordetail/${a.id}`}>View Details</Link></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        }

      </div>


      <div className="mt-3">

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="d-flex justify-content-end mb-5">
            <button onClick={closeModal} className="btn btn-close" aria-label="close"></button>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                DonerId
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="DonerId"
                  value={donnerid}
                  // onChange={(e) => setDonnerid(e.target.value)}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                B Group
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Bloodgroup"
                  value={bgroup}
                  onChange={(e) => setBgroup(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                Number
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="number"
                  placeholder="Mobile number"
                  value={userNumber}
                  onChange={(e) => setUserNumber(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                Date&Time
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Date & Time"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                />
              </Col>
            </Form.Group>

            <div className="text-center mt-4">
              <button className="btn bg-primary text-white px-4" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Modal>
        <ModalDeleteData
          show={showModal}
          onClose={handleCloseModal}
          onDelete={handleDelete}
          itemId={itemToDelete}
        />
      </div>


      {/* <button onClick={handleNavigate} className='bg-warning'>Signup</button> */}
    </div >
  );
}

export default Home;
