import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import './App.css';
import React, { useState } from 'react';
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { create } from 'ipfs-http-client'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import centifission from './c.png'
import './index.css'



function App() {

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
    returnedUrls: [], //for displaying the description along side ids
    returnedURL: '',
    returnedimg: '',
    id1: '',
    open: true,
    show2: false,
    show3: false,
    show4: false,
    nodeserver: 'http://localhost:3004',
    obj1: {}
  })

  const [logFrom, setlogFrom] = useState({
    uname: '',
    pass: '',
    show: false,
    show3: false,
    Error: '',
    base64String: ''
  })

  const loginCheck = (e) => {
    // console.log(logFrom.uname)
    e.preventDefault();
    if (logFrom.uname === "admin" && logFrom.pass === "admin234") {
      setlogFrom({ ...logFrom, show: true })
      console.log("cs")
    }
    else {
      setlogFrom({ ...logFrom, show3: true })
    }
  }

  const uploadfile = (e) => {
    const r = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(r);

    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));

      setFormData({ ...formData, file: reader.result })
      // setfile(reader.result)
    }
  }




  const submitTransaction = async (e) => {

    e.preventDefault();

    const projectId = '25zncbF9s5N6baxgOz09hXT2fEU'; //Process.env
    const projectSecret = '32747d80826cf8acf3d491c9c4a819ab'; //Process.env
    const auth =
      'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');


    const ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });

    // const ipfs = new create("/ip4/127.0.0.1/tcp/5001") client.add https://infura-ipfs.io/ipfs/<Content-Identifier>/<optional path to resource>
    const added = await ipfs.add(formData.file);
    const url = `https://infura-ipfs.io/ipfs/${added.path}` //https://ipfs.infura.io:5001/api/v0/block/get //MASTER CHECK //add /ipfs/    0x847ffb59a728Ba5e3D530E4C2b843fa3C4403cFd 'http://b669-2404-8ec0-4-2170-a0fe-4fe7-5808-8e9a.ngrok.io/ipfs/${added.path}'
    // const url =  `http://b669-2404-8ec0-4-2170-a0fe-4fe7-5808-8e9a.ngrok.io/ipfs/${added.path}` //MASTER CHECK //add /ipfs/    0x847ffb59a728Ba5e3D530E4C2b843fa3C4403cFd 'http://b669-2404-8ec0-4-2170-a0fe-4fe7-5808-8e9a.ngrok.io/ipfs/${added.path}'
    setFormData({ ...formData, PicCID: url })
    var lm = formData.name;
    var obj = {}

    ////
    obj.name = lm;
    obj.DOB = formData.dob;////
    obj.rn = formData.rn;
    obj.description = formData.description;
    obj.Batch = formData.batch; ////
    obj.Depar = formData.dep; ////
    obj.URI = url;
    const myJSON = JSON.stringify(obj);
    const added1 = await ipfs.add(myJSON); //metaData
    const url0 = `https://infura-ipfs.io/ipfs/${added1.path}`
    // const url0 = `http://b669-2404-8ec0-4-2170-a0fe-4fe7-5808-8e9a.ngrok.io/ipfs/${added1.path}` submit
    console.log(" STAR CID: " + url);
    console.log("STAR MetaData" + url0);
    // var serverPost = formData.nodeserver + "/additem/" + formData.rn + "/" + formData.address + "/" + added.path + "/" + added1.path;
    var serverPost = formData.nodeserver + "/submit/" + formData.rn + "/" + added.path + "/" + added1.path;
    // var serverPost = "http://20.124.215.41/additem/" + formData.rn + "/" + formData.address + "/" + added.path + "/" + added1.path;
    axios.post(serverPost).then(response => {  //http://20.124.215.41
      console.log("result", response)
      if (response.data.status == 200) {
        setFormData({ ...formData, show: true })
      }

      else {
        setFormData({ ...formData, show3: true })
      }

    })
  }

  const buffer = formData.file
  const b64 = new Buffer.from(buffer).toString('base64')
  //const mimeType = "pdf"
  const src = "data:image/png;base64," + b64
  console.log(src)

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
                  <div class="d-flex justify-content-center text-center mt-4 pt-1">
                    <img src={centifission} alt="Logo" />
                  </div>
                  <br></br>
                  <Form onSubmit={loginCheck}>
                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
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

  const mainPage = (

    <div  >




      <div class="row">
        <div class="col-12 col-md-4" style={{ "backgroundColor": "#081740" }}> <img src={centifission} alt="Logo" /></div>
        <div class="col-6 col-md-8" style={{ "backgroundColor": '#081740', "color": 'white', "paddingTop": '100px', "paddingRight": '600px', "fontSize": '60px', "textAlign": 'center' }}>Admin portal</div>
      </div>

      {/* <br></br>
      <br></br> */}
      <div class="container">
        <Alert show={formData.show1} variant="primary" tyle={{ textAlign: 'center' }}>
          <Alert.Heading style={{ textAlign: "center" }} >Warning</Alert.Heading>
          <p style={{ textAlign: "center" }}>
            Please Confirm the details before proceeding
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setFormData({ ...formData, show1: false })} variant="outline-success">
              Understood
            </Button>
          </div>
        </Alert>

        <Alert show={formData.show3} variant="danger">
          <Alert.Heading style={{ textAlign: "center" }}>Upload failed for Registration Number {formData.rn}</Alert.Heading>
          <p style={{ textAlign: "center" }}>
            The file Chosen is already assinged, please contact the admin
          </p>
          <hr />
        </Alert>


        <Alert show={formData.show} variant="success">
          <Alert.Heading style={{ textAlign: "center" }}>Uploaded</Alert.Heading>
          <p style={{ textAlign: "center" }}>
            Uploaded Successfully for Registration Number {formData.rn}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setFormData({ ...formData, show: false })} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
      </div>
      <br></br>
      <div class="row">
        <div class="col-5">
          <Container style={{ "backgroundColor": "white" }}>
            <br></br>
            <h2 style={{ textAlign: 'center' }}>Create new</h2>

            <br></br>
            <Form onSubmit={submitTransaction}>



              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control type="string" placeholder="Valid Registration number" onChange={(e) => setFormData({ ...formData, rn: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="string" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" placeholder="Name" onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
              </Form.Group>


              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="string" placeholder="Degree, sports" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Department</Form.Label>
                <Form.Control type="string" placeholder="Information technology" onChange={(e) => setFormData({ ...formData, dep: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Batch</Form.Label>
                <Form.Control type="string" placeholder="2017-2021" onChange={(e) => setFormData({ ...formData, batch: e.target.value })} />
              </Form.Group>







              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control type="string" placeholder="Ethereum address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </Form.Group> */}

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload or drag and drop the file</Form.Label>
                <Form.Control type="file" onChange={(e) => uploadfile(e)} />
              </Form.Group>

              <div class="alert alert-info" role="alert" style={{ width: "700px" }}>
                <br>
                </br>

                <h4 style={{ textAlign: 'center' }}>Preview in Left</h4>
                <br>
                </br>
                <p style={{ textAlign: 'center' }}> Check the file and details before Uploading</p>
                <p style={{ textAlign: 'center' }}> Any Discrepancy, Contact Admin</p>
              </div>


              <Button variant="primary" type="submit" style={{ Position: 'center' }} >
                Submit
              </Button>
            </Form>
            <br></br>

          </Container>


        </div>
        <div class="col-7" >
          <Container style={{ "backgroundColor": "white" }}>

            <br></br>
          </Container>
          <embed src={`data:application/pdf;base64,${b64}`} type="application/pdf" width="100%" height="1000px"></embed>

        </div>


        <div

        >

        </div>

      </div>

      {/* </div> */}



      <br></br>


      <div style={{ backgroundColor: "#081740", height: "200px", color: 'white' }}>
        <br></br>
        <br></br>
        <br></br>
        <p style={{ textAlign: 'center' }}>Powered by Centifission</p>
        <p style={{ textAlign: 'center' }}>For Strictly use by Dhanalakshimi Srinivasan Medical College</p>
        <p style={{ textAlign: 'center' }}>All rights reserved ©</p>
      </div>

      <Alert show={formData.show4} variant="primary">
        <Alert.Heading>Warning</Alert.Heading>
        <p>
          Enter the details correctly, make sure you have the approved file and the uploading file name same as persons Address. If different contact the admin
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setFormData({ ...formData, show4: false })} variant="outline-success">
            Understood
          </Button>
        </div>
      </Alert>

    </div>)


  return (
    <div>

      {logFrom.show ? mainPage : login}
    </div>
  );

}

export default App;
