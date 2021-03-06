import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import './App.css';
import React, { useState } from 'react';
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
// import { create } from 'ipfs-http-client'
import Hash from 'ipfs-only-hash'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Stack from 'react-bootstrap/Stack'
import { Accordion } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Buffer } from 'buffer';
import centifission from './c.png'
import verifyIcon from './verify.png'
import Table from 'react-bootstrap/Table'
import MovingComponent from 'react-moving-text'

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
    show1: false,
    CRegN: '',
    returnedName: '',
    returnedid: [],
    returnedURL: '',
    returnedimg: '',
    id1: '',
    open: true,
    show2: false,
    show3: false,
    show4: false,
    temprg: '',
    tempid: '',
    tempdob: '',
    show10: false,
    holdtemid: '',
    v1: false,
    v2: false,
    nodeserver: 'http://localhost:3004',
    ob: {},


  })

  const [countries, setCountries] = useState([])  //description
  const [countries1, setCountries1] = useState([]) //ids
  const [countries2, setCountries2] = useState([]) //mdata


  const uploadfile = (e) => {
    const r = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(r);
    reader.onloadend = () => {
      // console.log("Buffer data: ", Buffer(reader.result));
      setFormData({ ...formData, file: Buffer(reader.result) })
      // setfile(reader.result)
    }
  }


  const validation = async (e) => {
    e.preventDefault();

    var serverPost = formData.nodeserver + "/Ids/" + formData.temprg;

    //var serverPost = formData.nodeserver + "/Ids/" + formData.CRegN;
    await axios.get(serverPost).then(response => {

      console.log(response)
      var ids = response.data.ids;
      var idsl = Object.keys(ids).length;
      console.log(idsl)
      for (var i = 0; i < idsl; i++) {
        setCountries2(countries2 => [...countries2, ids[i].Mdata])
        console.log(ids[i].Madta)
        axios.get(ids[i].Mdata).then(async response => {
          console.log(response.data.description)

          setCountries(countries => [...countries, response.data.description])

        })

        setCountries1(countries1 => [...countries1, ids[i].id])

      }

      // setFormData({ ...formData, show2: true })
    })

    var temp1 = countries1.indexOf(formData.tempid)

    var serverPost = countries2[temp1];
    // var serverPost = countries[temp1]
    // var obj = {};
    console.log("AD")
    console.log(countries2)
    axios.get(serverPost).then(async response => {
      var rn = response.data.rn;
      var dob = response.data.DOB;

      var obj = {};

      if (rn == formData.temprg && dob == formData.tempdob) {
        obj.regger = response.data.rn;
        obj.name = response.data.name;
        obj.description = response.data.description;
        obj.URL = response.data.URI;
        obj.batch = response.data.Batch;
        obj.depart = response.data.Depar;
        obj.dob = response.data.DOB;
        setFormData({ ...formData, ob: obj });
      }
      else {
        setFormData({ ...formData, show3: true });
      }
    })

    //   var temp = "zero"; //master caution //0
    //     var rgn = 0; //master check
    //     var dbo = 0;
    //     var obj = {};
    //   await axios.get(serverPost).then(async response => {
    //     var ids = response.data.ids; //
    //     var idsl0 = Object.keys(ids).length;  //1

    //     var temp1 = formData.tempid; 


    //     for (var i = 0; i < idsl0; i++) {  
    //       if (temp1 === ids[i]) {
    //        // console.log(ids[i])
    //         temp = i; //0
    //       }
    //     }
    //     console.log(temp) //0
    //     formData.id1 = temp; //0

    //     var metadat = response.data.Mdata;
    //     var idsl = Object.keys(metadat).length; // 0,1,2 = 1,2,3
    //     // console.log(response.data)
    //     console.log(temp)
    //     var lurl;

    //     for (var i1 = 0; i1 < idsl; i1++) {
    //       console.log("check1");
    //       if (temp === i1) {
    //         console.log("check2");
    //          lurl = metadat[i1];


    //         console.log(lurl)
    //         await axios.get(lurl).then(async response => {
    //           rgn = response.data.rn;
    //           dbo = response.data.DOB
    //           var nam = response.data.name;
    //           var des = response.data.description;
    //           var imurl = response.data.URI;
    //            obj.regger = response.data.rn;
    //           obj.name = nam;
    //            obj.description = des;
    //            obj.URL = imurl;
    //           obj.batch = response.data.Batch;
    //           obj.depart = response.data.Depar;
    //          obj.dob = response.data.DOB;            
    //           console.log(rgn)
    //           console.log(dbo)
    //         })
    //         console.log(obj)

    //       }
    //     }

    //     if(temp === 'zero' || rgn === 0 || dbo === 0 || dbo !== formData.tempdob ){
    //       setFormData({...formData, show3: true });
    //     }
    //     else{
    //       setFormData({...formData, show10: true });
    //       setFormData({ ...formData, ob: obj });
    //       console.log(formData.ob)
    //     }
    // })
  }



  const verify = async (e) => {
    e.preventDefault();
    console.log(formData.file)
    console.log("check")
    var hash = await Hash.of(formData.file)
    console.log("check2")
    console.log(hash)
    console.log("end")
    var serverPost = formData.nodeserver + "/verify/" + hash;
    await axios.get(serverPost).then(response => {
      var valid = response.data.status;
      console.log(valid)
      if (valid === 404) {
        setFormData({ ...formData, v1: true })
      }
      else {
        setFormData({ ...formData, v2: true })
      }
    })
    console.log("end1")
  }
  const main = (

    <div style={{ backgrounColor: '#E6F0FF' }}>
   

      <div class='.gradient-custom1'>
      <div class="hdr">
        <div class="container">
          <div class="row">
            <div class="col-sm-8"> <h2 style={{ textAlign: 'center' }}>Public Retrieve</h2> </div>
            <div class="col-sm-4"> <p style={{ textAlign: 'center' }}>{date}</p> </div>
          </div>
        </div>
      </div>
        <br></br>
        <br></br>
        <MovingComponent
          type="slideInFromTop"
          duration="10000ms"
          delay="2000ms"
          direction="normal"
          timing="ease-out"
          iteration="infinite"
          fillMode="none"
          style={{ textAlign: 'center' }}>
          <h4>Welcome to the public portal </h4>
          <h4>Please enter the Candidates registration ID, DOB and the Certificate ID / Choose or drop the certificate to verify </h4>
        </MovingComponent>





        <br></br>
        <br></br>

        <br></br>
        <div className='row' style={{ backgroundColor: '#F6F6F6' }}>
          <div class="col-sm-6">

            <Container style={{ backgrounColor: '#E6F0FF' }}>


              {/* <Alert show={formData.show10} variant="success">
        <Alert.Heading style={{textAlign: "center"}}>Retrieve</Alert.Heading>
        <p style={{textAlign: "center"}}  >
        <Badge bg="success">Success</Badge> 
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setFormData({ ...formData, show10: false })} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert> */}

              <Stack gap={3}>
                <Form>

                  <br></br>
                  <Form.Group className="mb-3">
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control type="string" placeholder="Valid register number" onChange={(e) => setFormData({ ...formData, temprg: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="string" placeholder="yyyy-mm-dd" onChange={(e) => setFormData({ ...formData, tempdob: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Certificate ID</Form.Label>
                    <Form.Control type="string" placeholder="Valid register number" onChange={(e) => setFormData({ ...formData, tempid: e.target.value })} />
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={validation} >
                    Retrieve
                  </Button>

                  <hr></hr>


                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>View</Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <Table>
                            <thead>
                              <tr>
                                <th>Registration Number</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Date of Birth</th>
                                <th>Department</th>
                                <th>Batch</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{JSON.stringify(formData.ob.regger, null, 1)}</td>
                                <td>{JSON.stringify(formData.ob.name, null, 1)}</td>
                                <td>{JSON.stringify(formData.ob.description, null, 1)}</td>
                                <td> {JSON.stringify(formData.ob.dob, null, 1)}</td>
                                <td> {JSON.stringify(formData.ob.depart, null, 1)}</td>
                                <td>{JSON.stringify(formData.ob.batch, null, 1)}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>

                        <Button href={formData.ob.URL} variant="link" target="_blank" style={{ display: "flex", justifyContent: "left" }}>Open file in new tab</Button>
                      </Accordion.Body>
                    </Accordion.Item>

                  </Accordion>

                </Form>
              </Stack>
              <br>
              </br>

            </Container>

            <br></br>
            <hr></hr>
          </div>



          <div class="col-sm-4">

            <Container>

              <br></br>
              <br></br>
              <Alert show={formData.v1} variant="success">
                <Alert.Heading style={{ textAlign: 'center' }}>Verified</Alert.Heading>
                <p style={{ textAlign: 'center' }}>
                  Document recognised by the University
                </p>
                <hr />
                <div className="d-flex justify-content-end" >
                  <Button onClick={() => setFormData({ ...formData, v1: false })} variant="outline-success" >
                    Understood
                  </Button>
                </div>
              </Alert>
              <Alert show={formData.v2} variant="danger">
                <Alert.Heading style={{ textAlign: 'center' }}>Warning</Alert.Heading>
                <p>
                  Document not recognised by the University
                </p>
                <p>
                  For any queries, Contact office
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button onClick={() => setFormData({ ...formData, v2: false })} variant="danger">
                    Understood
                  </Button>
                </div>
              </Alert>


              <Form onSubmit={verify}>
                <Form.Group controlId="formFile" className="mb-3" style={{ textAlign: 'center', height: '100px' }}>
                  <Form.Label > <h4>Choose or drag and drop the file to verify </h4> </Form.Label>
                  <Form.Control type="file" onChange={(e) => uploadfile(e)} />
                </Form.Group>


                <Button variant="primary" type="submit" >
                  Verify
                </Button>
              </Form>

             
              <img style={{height:"400px", width:"800px", verticalAlign:"middle"}} src={verifyIcon} />

              {/* <Accordion defaultActiveKey="0">
  <Accordion.Item eventKey="0">
    <Accordion.Header>view</Accordion.Header>
    <Accordion.Body>
      <p>cal</p>
    {/* <p>Name: {JSON.stringify(formData.obj1.name, null, 1)}</p>
          <p>Description: {JSON.stringify(formData.obj1.description, null, 1)}</p> */}
              {/* </Accordion.Body>
  </Accordion.Item>

// </Accordion> */}




            </Container>
          </div>
        </div>

      </div>

      {/* <div style={{ width: "1840px", backgroundColor: "#081740", height: "200px", color: 'white' }}>
        <br></br>
        <br></br>
        <br></br>
        <p style={{ textAlign: 'center' }}>Powered by Centifission</p>
        <p style={{ textAlign: 'center' }}>For Strictly use by Dhanalakshimi Srinivasan Medical College</p>
        <p style={{ textAlign: 'center' }}>All rights reserved ??</p>
      </div> */}
        <footer class="page-footer font-small blue">


<div class="footer-copyright text-center py-3">?? 2022 Copyright:  Centifission Infotect Pvt ltd</div>
<br></br>


</footer>

    </div>
  )

  return (
    main
  )
}

export default App;
