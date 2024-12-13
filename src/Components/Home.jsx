
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import QRCode from "react-qr-code";
import Spinner from 'react-bootstrap/Spinner';

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
      setDonnerid(`Donor-${response.data.length + 1}`)
      setLoading(false)
    } catch (error) {
      alert(error)
    }

  }
  useEffect(() => {
    getApiData()
  }, [])
  // let qrIdValue = `http://localhost:5173/donordetail/${id}`
  return (
    <div>
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
           </div>:

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
                      style={{ height: "auto", width: "100px" }}
                      value={`https://bloodbank-dben3tbad-naufans-projects.vercel.app/${a.donnerid}`}
                      viewBox={`0 0 256 256`}
                    />}</td>
                  <td><Link to={`/donordetail/${a.id}`}>View Details</Link></td>
                </tr>
              )}
            </tbody>
          </Table>
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
                  onChange={(e) => setDonnerid(e.target.value)}
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
      </div>
      {/* <button onClick={handleNavigate} className='bg-warning'>Signup</button> */}
    </div>
  );
}

export default Home;
