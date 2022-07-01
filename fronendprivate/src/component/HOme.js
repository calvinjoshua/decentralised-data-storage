import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import '../App.css';
import React, { Component, useState } from 'react';
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Stack from 'react-bootstrap/Stack'

import Table from 'react-bootstrap/Table'

import MovingComponent from 'react-moving-text'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
// import Home from './component/HOme';
// // import About from './component/About';
// import Revoke from './component/revoke';
// import Ratify from './component/ratify';




function App() {

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


  const [formData, setFormData] = useState({
    rn: '',
    name: '',
    description: '',
    address: '0x847ffb59a728Ba5e3D530E4C2b843fa3C4403cFd',
    dob: '',
    dep: '',
    batch: '',
    file: '',
    file2: '',
    PicCID: '',
    show: false,
    show1: true,
    CRegN: '',
    returnedName: '',
    returnedid: [],
    returnedUrls: [],
    returnedURL: '',
    returnedimg: '',
    id1: '',
    open: true,
    show2: false,
    show3: false,
    show4: false,
    nodeserver: 'http://localhost:3004',
    obj1: {},
    returnedds: [],


  })

  const [logFrom, setlogFrom] = useState({
    uname: '',
    pass: '',
    show: false,
    show3: false,
    Error: '',
    base64String: ''
  })

  const [countries, setCountries] = useState([])  //description
  const [countries1, setCountries1] = useState([]) //ids
  const [countries2, setCountries2] = useState([]) //mdata
  const [countries3, setCountries3] = useState([]) //status

  const loginCheck = (e) => {
    e.preventDefault();
    if (logFrom.uname === "admin" && logFrom.pass === "admin234") {
      setlogFrom({ ...logFrom, show: true })
      console.log("cs")
    }
    else {
      setlogFrom({ ...logFrom, show3: true })
    }
  }

  const getids = async (e) => {
    e.preventDefault();
    var serverPost = formData.nodeserver + "/Ids/" + formData.CRegN;
    await axios.get(serverPost).then(response => {

      console.log(response)
      var ids = response.data.ids;
      var idsl = Object.keys(ids).length;
      console.log(idsl)
      for (var i = 0; i < idsl; i++) {

        setCountries2(countries2 => [...countries2, ids[i].Mdata])
        setCountries3(countries3 => [...countries3, ids[i].Status])
        console.log(ids[i].Status)
        axios.get(ids[i].Mdata).then(async response => {
          console.log(response.data.description)

          setCountries(countries => [...countries, response.data.description])

        })

        setCountries1(countries1 => [...countries1, ids[i].id])

      }

      setFormData({ ...formData, show2: true })
    })

  }

  const getMetadata = async (e) => {
    e.preventDefault();
    var temp1 = countries1.indexOf(formData.id1)
    console.log(temp1)
    var serverPost = countries2[temp1];
    // var serverPost = countries[temp1]
    var obj = {};
    console.log("AD")
    console.log(countries2)
    axios.get(serverPost).then(async response => {

      var nam = response.data.name;
      var des = response.data.description;
      var imurl = response.data.URI;
      console.log(response.data.rn)
     // console.log(formData.obj1.rgn)
      obj.reger = response.data.rn;
      obj.name = nam;
      obj.description = des;
      obj.URL = imurl;
      obj.batch = response.data.Batch;
      obj.depart = response.data.Depar;
      obj.dob = response.data.DOB;
      obj.status = countries3[countries1.indexOf(formData.id1)]
     
      setFormData({ ...formData, obj1: obj });

    })
  }

  const login = (

    <section class="vh-100 gradient-custom">


      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div class="card-body p-5 text-center">

                <div class="mb-md-5 mt-md-4 pb-5">
                  <Alert show={logFrom.show3} variant="danger">
                    <Alert.Heading style={{ textAlign: "center" }}>Invalid Credentials</Alert.Heading>
                  </Alert>

                  <br></br>
                  <Form onSubmit={loginCheck}>
                    <h2 class="fw-bold mb-2 ">Centifission Infotech Pvt ltd</h2>
                    <p class="text-white-50 mb-5">Please enter your login and password</p>

                    <div class="form-outline form-white mb-4">
                      <input type="text" placeholder='User Name' id="typeEmailX" class="form-control form-control-lg" onChange={(e) => setlogFrom({ ...logFrom, uname: e.target.value })} />
                      <label class="form-label" for="typeEmailX"></label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input type="password" placeholder='Password' id="typePasswordX" class="form-control form-control-lg" onChange={(e) => setlogFrom({ ...logFrom, pass: e.target.value })} />
                      <label class="form-label" for="typePasswordX"></label>
                    </div>



                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                  </Form>


                </div>



              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );



  const main = (

    <div className='gradient-custom1' >

      <Alert show={formData.show3} variant="danger">
        <Alert.Heading style={{ textAlign: "center" }}>Upload failed</Alert.Heading>
        <p style={{ textAlign: "center" }}>
          The file Chosen is already assinged, please contact the admin
        </p>
        <hr />
      </Alert>


      <div class="hdr">
      <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <p style={{ float: "left" }}>{date}</p>
                        </div>
                        <div class="col-sm">
                            <h2 style={{ textAlign: 'center' }}>Data Retrieve</h2>
                        </div>
                        <div class="col-sm">
                            <Button style={{ float: "right" }} onClick={() => setFormData(window.location.reload(false))} variant="outline-info">
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
        {/* <div class="container">
          <div class="row">
            <div class="col-sm-8"> <h2 style={{ textAlign: 'center' }}>Data Retrieve</h2> </div>
            <div class="col-sm-4"> <p style={{ textAlign: 'center' }}>{date}</p> </div>
          </div>
        </div> */}
      </div>
      <div className='container'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/revoke"> Revoke</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/enable">Enable Ceritificate</a>
      </li>
     
    </ul>

  </div>
</nav>
</div>

      <br></br>
      <br></br>

      <MovingComponent
        type="flash"
        duration="5000ms"
        delay="50000ms"
        direction="normal"
        timing="ease-out"
        iteration="infinite"
        fillMode="none"
        style={{ textAlign: 'center' }}>
        <h4>Enter a valid ID</h4>
      </MovingComponent>
      {/* <hr></hr>  */}
      <br></br>
      <Container>
        <br></br>
        <Stack gap={3}>
          <Form>
            <h2>Admin Retrieve</h2>
            <br></br>
            <Form.Group className="mb-3">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control type="string" placeholder="Valid register number" onChange={(e) => setFormData({ ...formData, CRegN: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={getids} >
              Retrieve
            </Button>
          </Form>
        </Stack>
        <hr></hr>

        <br></br>
      </Container>
      <br></br>
    </div>

  )

  const main2 = (
    <div className='gradient-custom1' >
      <Container style={{ backgroundColor: "#f5f5f5" }}>
        <br></br>
        <br></br>

        <Stack gap={3}>
          <h6>IDs registered with the entered registration number</h6>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>ID</th>
                <th style={{ textAlign: 'center' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center' }}> {countries1[0]}</td>
                <td style={{ textAlign: 'center' }}>{countries[0]}</td>
                {/* <td>{formData.returnedds[0]}</td> */}
                {/* <td>{formData.returnedUrls[0]}</td> */}
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>{countries1[1]}</td>
                <td style={{ textAlign: 'center' }}>{countries[1]}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>{countries1[2]}</td>
                <td style={{ textAlign: 'center' }}>{countries[2]}</td>

              </tr>
            </tbody>
          </Table>



          <Form>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter the ID</Form.Label>
              <Form.Control type="string" placeholder="id" onChange={(e) => setFormData({ ...formData, id1: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={getMetadata} >
              Get
            </Button>
            <br></br>
            <br></br>
          </Form>

          <div>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>Registration Number</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date of Birth</th>
                  <th>Department</th>
                  <th>Batch</th>
                  <th>Revoked</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{JSON.stringify(formData.obj1.reger, null, 1)}</td>
                  <td>{JSON.stringify(formData.obj1.name, null, 1)}</td>
                  <td>{JSON.stringify(formData.obj1.description, null, 1)}</td>
                  <td> {JSON.stringify(formData.obj1.dob, null, 1)}</td>
                  <td> {JSON.stringify(formData.obj1.depart, null, 1)}</td>
                  <td>{JSON.stringify(formData.obj1.batch, null, 1)}</td>
                  <td>{JSON.stringify(formData.obj1.status, null, 1)}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* <Image src={JSON.stringify(formData.obj1.URL, null, 1)} /> */}

          <Button href={formData.obj1.URL} variant="link" target="_blank" style={{ display: "flex", justifyContent: "left" }}>Open Certificate in new tab</Button>
        </Stack>
      </Container>
      <br></br>

      {/* <div style={{ backgroundColor: "#081740", height: "200px", color: 'white' }}>
        <br></br>
        <br></br>
        <br></br>
        <p style={{ textAlign: 'center' }}>Powered by Centifission</p>
        <p style={{ textAlign: 'center' }}>For Strictly use by Dhanalakshimi Srinivasan Medical College</p>
        <p style={{ textAlign: 'center' }}>All rights reserved ©</p>
      </div>

    </div> */}

      <footer class="page-footer font-small blue">

        <hr></hr>

        <div class="footer-copyright text-center py-3">© 2022 Copyright:  Centifission Infotect Pvt ltd</div>
        <br></br>


      </footer>

    </div>


  )

  const ad = (
    <div >

    </div>
  )

  return (
    <div>
      {/* {main} */}
      {logFrom.show ? main : login}
      {formData.show2 ? main2 : ad}
    </div>
  )


}

export default App;
