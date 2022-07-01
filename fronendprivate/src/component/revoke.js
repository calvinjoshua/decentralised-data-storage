import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import '../App.css';
import React, { Component, useState } from 'react';
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Stack from 'react-bootstrap/Stack'
import { Buffer } from 'buffer';

import Hash from 'ipfs-only-hash'
import Table from 'react-bootstrap/Table'

import MovingComponent from 'react-moving-text'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
// import Home from './component/Home';
// // import About from './component/About';
// import Revoke from './component/AboutTran';
// import Ratify from './component/AboutLed';





function App() {

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


    const [formData, setFormData] = useState({
        rn: '',
        file: '',
        id1: '',
        show2: true,
        exist: false,
        nodeserver: 'http://localhost:3004',
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




  

      
    const uploadfile = (e) => {
        const r = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(r);

        reader.onloadend = () => {
            console.log("Buffer data: ", Buffer(reader.result));
            setFormData({ ...formData, file:  Buffer(reader.result) })
        }
    }

    const buffer = formData.file
    const b64 = new Buffer.from(buffer).toString('base64')

   

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

    const verify1 = async (e) => {
        e.preventDefault();
        console.log(formData.rn);
        console.log(formData.id1);
        var hash = await Hash.of(formData.file)
        //////////////////////
        var serverPost1 = formData.nodeserver + "/Ids/" + formData.rn;
        await axios.get(serverPost1).then(response => {
          console.log("getid 1", response)
          var ids = response.data.ids;
          var idsl = Object.keys(ids).length;
          console.log("lenght", idsl)
          var status;
       //   var status1;
          for (var i = 0; i < idsl; i++) {
            console.log(ids[i].id ,"and 2", formData.id1)
            console.log(ids[i].id === formData.id1)
             if(ids[i].id === formData.id1){
                status = true;
                var lmd = ids[i].Mdata;
                var serverPost = lmd;
                axios.get(serverPost).then(async response => {
                    var imurl = response.data.URI;
                    console.log(imurl.slice(28, 74) , "and", imurl)
                  
                    if(hash == imurl.slice(28, 74)){
                        var sp = formData.nodeserver + "/revoke/" + formData.id1 + "/" + hash
                        console.log(sp);
                        axios.post(sp).then(async response => {
                            if(response.data.status == "404"){
                                console.log("server error")
                                window.alert("file already revoked")
                            }
                            else{
                                window.alert("Revoked ID", formData.id1)
                            }
                        
                          })

                  
                    }
                    else{
                        window.alert("certificate mismatch with ID")
                    }
                  })
            }
          }
          if(status !== true){
            window.alert("ID not found with registration number")
        
            // console.log(")
        }
    
        ///////////////////////

        //     var temp1 = countries1.indexOf(formData.id1)
        //     console.log(temp1)
        //     console.log(countries1)
        //     console.log(setCountries2)
        //    // if(temp1 >= 0){
        //    console.log("ok 1")
        //     var serverPost = countries2[temp1];
        //     console.log(serverPost)
        //     axios.get(serverPost).then(async response => {
        //       var imurl = response.data.URI;
        //       console.log(imurl.slice(28, 74) , "and", imurl)
            
        //       console.log(hash == imurl.slice(28, 74))
  
        //     })
    })
      }


    const main = (
        <div className='gradient-custom1' >
            <div class="hdr">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8"> <h2 style={{ textAlign: 'center' }}>Data Retrieve</h2> </div>
                        <div class="col-sm-4"> <p style={{ textAlign: 'center' }}>{date}</p> </div>
                    </div>
                </div>
            </div>
            <div className='container'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/"> Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/enable">Enable Ceritificate</a>
      </li>
     
    </ul>

  </div>
</nav>
</div>
            <br></br>
            <div class="container">
            <Alert show={formData.exist} variant="danger">
                    <Alert.Heading style={{ textAlign: "center" }}>File already Revoked</Alert.Heading>
                    <hr/>
                </Alert>
                <div class="row">
                    <div class="col">
                        <Form onSubmit={verify1}>
                            <br></br>
                            <br></br>
                            <div class="row">
                                <div class="col">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="number" placeholder="Unique ID of the Certificate" onChange={(e) => setFormData({ ...formData, id1: e.target.value})} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                                </div>
                                <div class="col">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Registration Number</Form.Label>
                                <Form.Control type="string" placeholder="Valid Registration number" onChange={(e) => setFormData({ ...formData, rn: e.target.value })} />
                            </Form.Group>
                                </div>
                            </div>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload or drag and drop the file</Form.Label>
                                <Form.Control type="file" onChange={(e) => uploadfile(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="danger" type="submit">
                                REVOKE
                            </Button>
                        </Form>
                        <br>
                        </br>
<br></br>

            <Alert show={formData.show2} variant="warning">
                            <Alert.Heading style={{ textAlign: "center" }}>Your are about to revoke a Certificate Validity</Alert.Heading>
                            <p style={{ textAlign: "center" }}>
                                Enter the certificate ID and Upload the file
                            </p>
                            <hr />

                        </Alert>
                        <Alert show={formData.show2} variant="primary">
                            <Alert.Heading style={{ textAlign: "center" }}>Preview and confirm</Alert.Heading>
                            <p style={{ textAlign: "center" }}>
                                Certificate will be marked as revoked
                            </p>
                            <hr />

                        </Alert>

                        

                    </div>
                    <div class="col">
                        <br></br>
                        <div class="col">
                        <embed src={`data:application/pdf;base64,${b64}`} type="application/pdf" width="100%" height="700px"></embed>

                    </div>

                        
                    </div>
                </div>
            </div>


            



        </div>

    )



    const ad = (
        <div >

        </div>
    )

    return (
        <div>
            {logFrom.show ? main : login}
            {/* {logFrom.show ? main : login} */}
            {/* {formData.show2 ? main2 : ad} */}
        </div>
    )


}

export default App;
