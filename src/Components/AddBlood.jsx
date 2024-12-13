import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Col, Row, Card, Button } from 'react-bootstrap';
import axios from "axios";

function AddBlood() {

  const navi = useNavigate()
  const [getDonorID, setGetDonorID] = useState('')
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState('')
  const [donorDate, setDonorDate] = useState('')
  const [today, setToday] = useState(new Date())
  const [differenceDate, setDifferenceDate] = useState(0)

  const hand = () => {
    navi('/')
  }
  const handleChange = (e) => {
    e.preventDefault();
    console.log(apiData);
    console.log(getDonorID);
    if (getDonorID) {
      console.log('donor id available');
      const filteredData = apiData.filter(item => item.donnerid === getDonorID)
      console.log(filteredData.length);
      if (filteredData.length > 0) {
        console.log(filteredData);
        setFilteredData(filteredData[0])
        console.log(filteredData[0].datetime);
        if (filteredData[0].datetime == 0) {
          console.log('date is zero');

        } else {
          // alert('date is there');
          // let dated = new Date('2024-08-13T11:26:43.923Z');
          // console.log(datee);
          let dated = new Date(filteredData[0].datetime);
          console.log(dated);
          let adatee2 = `${dated.getDate()}-${dated.getMonth()}-${dated.getFullYear()} / ${dated.getHours() > 12 ? dated.getHours() - 12 : dated.getHours()}:${dated.getMinutes()}${dated.getHours() > 12 && ' PM'}`
          console.log(adatee2);
          setDonorDate(adatee2)

          const today = new Date()
          const differenceInMilliseconds = today - dated;
          // Convert milliseconds to days
          const millisecondsPerDay = 24 * 60 * 60 * 1000;
          const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsPerDay);
          setDifferenceDate(differenceInDays)
          console.log(`The difference is ${differenceInDays} days.`);
          // let adatee = `${datee.getDate()} - ${datee.getMonth()} - ${datee.getFullYear()}`
          // let adatee2 = `${dated.getDate()} - ${dated.getMonth()} - ${dated.getFullYear()}`
          // console.log(adatee);
          // console.log(adatee2);
          // setDonorDate(adatee)
        }
        // callDateFn()
        // console.log(filteredData?.datetime);

        // filteredData.datetime == 0 && setDonorDate(new Date())
        // console.log(donorDate);

      } else {
        alert('thambi nee fraud, you are entereed wrong donopr id')
        navi('/')
      }
    } else {
      alert('donorId is not empty value');

    }
  }
  async function handleUpdate(id) {
    let datee = new Date()

    try {
      axios.put(`https://67593f4e60576a194d140021.mockapi.io/donner/${id}`,
        {
          datetime: datee
        })
        .then(() => {
          alert('successfully donor data updated')
          navi('/')
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
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    getApiData()
  }, [])


  // console.log(donorDate);

  return (
    <>
      <div className='container'>
        <button className='btn btn-danger' onClick={hand}>home page</button>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Form onSubmit={handleChange}>
              <Form.Control
                type="text"
                placeholder="Name"
                value={getDonorID}
                onChange={(e) => setGetDonorID(e.target.value)}
              // required
              />
              <button className='btn btn-success m-auto'>submit</button>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
        {filteredData &&
          <Row>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Name: {filteredData.userName}</Card.Title>
                <Card.Text>Number: {filteredData.userNumber}</Card.Text>
                <Card.Text>Bg group: {filteredData.bgroup}</Card.Text>
                <Card.Text>Blood Donote Date: {filteredData.datetime == 0 ? 'not given yet' : donorDate}</Card.Text>
                <Card.Text>Today date: {today && `${today.getDate()} - ${today.getMonth()} - ${today.getFullYear()}`}</Card.Text>
                <Card.Text>Difference date: {today && filteredData.datetime != 0 ? differenceDate : 'Nil'}</Card.Text>
                <div className='d-flex justify-content-between'>
                  <Link to={'/'} className='btn btn-danger'>Reject</Link>
                  {differenceDate > 90 || filteredData.datetime == 0  && <Button onClick={() => handleUpdate(filteredData.id)} variant="success">Go</Button>}
                </div>
              </Card.Body>
            </Card>
          </Row>
        }
      </div>
    </>
  )
}

export default AddBlood

