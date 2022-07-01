import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Form } from "react-bootstrap"
import { Card } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { create } from 'ipfs-http-client'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import './index.css'

function App() {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    useEffect(() => {
        getLId()
    }, []);

    //TO get the latest ID
    const getLId = async () => {
        var serverPost = formData.nodeserver + "/id"
        axios.get(serverPost).then(response => {
            var a = parseInt(response.data.temp)
            console.log(a, response.data.temp)
            //document.getElementById("_id").innerHTML = a
            setFormData({ ...formData, id: a })
        })
    }

    //USESTATE
    const [formData, setFormData] = useState({
        id: '', //ID With which the current data will be stores
        rn: '',//Registration Number
        _name: '',//Name
        description: '',//Description
        address: '0x847ffb59a728Ba5e3D530E4C2b843fa3C4403cFd',
        dob: '',//DOB
        dep: '',//dEPARTMENT
        batch: '',//BATCH
        file: '',//UPLOADED FILE
        file2: '',
        PicCID: '',
        uploadSuccess: false,
        uploadFail: false,
        uploadEmpty: false,
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
        show4: false,
        nodeserver: 'http://localhost:3004',
        obj1: {},
        malformedD: false
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
        e.preventDefault();
        if (logFrom.uname === "admin" && logFrom.pass === "admin234") {
            setlogFrom({ ...logFrom, show: true })
            console.log("cs")
        }
        else {
            setlogFrom({ ...logFrom, show3: true })
        }
    }

    console.log("data", "name", formData._name, "dob", formData.dob, "regno", formData.rn, "des", formData.description, "batch", formData.batch, "dep", formData.dep, "file", formData.file)

    const submitTransaction = async (e) => {
        //console.log(new Date(formData.dob) < new Date('2002-01-01'))
        //console.log(new Date(formData.dob), new Date('2002-01-01'))
        //console.log("data", "name", formData._name, "dob", formData.dob, "regno", formData.rn, "des", formData.description, "batch", formData.batch, "dep", formData.dep, "file", formData.file)
        //console.log("data not empty ? ", formData._name === '' && formData.dob === '' && formData.rn === '' && formData.description === '' && formData.batch === '' && formData.dep === '' && formData.file === '')
        if (formData._name === '' || formData.dob === '' || formData.rn === '' || formData.description === '' || formData.batch === '' || formData.dep === '' || formData.file === '') {
            setFormData({ ...formData, uploadEmpty: true })
            return
        }

        else if (new Date(formData.dob) > new Date('2002-01-01')) {   //1810045
            setFormData({ ...formData, malformedD: true })
            return
        }

        else {
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
            setFormData({ ...formData, PicCID: url })
            var lm = formData._name;
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
            console.log("STAR CID: " + url);
            console.log("STAR MetaData" + url0);
            var serverPost = formData.nodeserver + "/submit/" + formData.rn + "/" + added.path + "/" + added1.path;
            axios.post(serverPost).then(response => {  //http://20.124.215.41
                console.log("result", response)
                if (response.data.status == 200) {
                    setFormData({ ...formData, uploadSuccess: true })

                    setTimeout(() => {
                        console.log("Delayed for 1 second.");
                        setFormData({ ...formData, rn: "" })
                        setFormData({ ...formData, _name: "" })
                        setFormData({ ...formData, dob: "" })
                        setFormData({ ...formData, dep: "" })
                        setFormData({ ...formData, description: "" })
                        setFormData({ ...formData, file: "" })
                        document.getElementById("myForm").reset();
                        getLId()
                        setFormData({ ...formData, uploadSuccess: false })
                    }, "15000")
                }
                else {
                    setFormData({ ...formData, uploadFail: true })
                }
            })
        }
    }

    const uploadfile = (e) => {
        const r = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(r);
        reader.onloadend = () => {
            console.log("Buffer data: ", Buffer(reader.result));
            setFormData({ ...formData, file: reader.result })
        }
    }

    const buffer = formData.file
    const b64 = new Buffer.from(buffer).toString('base64')

    const mainPage = (
        <div>
            <div class="hdr">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <p style={{ float: "left" }}>{date}</p>
                        </div>
                        <div class="col-sm">
                            <h2 style={{ textAlign: 'center' }}>ADMIN UPLOAD</h2>
                        </div>
                        <div class="col-sm">
                            <Button style={{ float: "right" }} onClick={() => setFormData(window.location.reload(false))} variant="outline-info">
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <Alert show={formData.uploadEmpty} variant="warning">
                    <Alert.Heading style={{ textAlign: "center" }}>Fill the detail</Alert.Heading>
                    <p style={{ textAlign: "center" }}>
                        Cannot upload with an empty field
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setFormData({ ...formData, uploadEmpty: false })} variant="outline-warning">
                            Close
                        </Button>
                    </div>
                </Alert>


                <Alert show={formData.uploadFail} variant="danger">
                    <Alert.Heading style={{ textAlign: "center" }}>Upload failed for Registration Number {formData.rn}</Alert.Heading>
                    <p style={{ textAlign: "center" }}>
                        You are trying to upload a file which is already uploaded, contact Admin
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setFormData({ ...formData, uploadFail: false })} variant="outline-danger">
                            Close
                        </Button>
                    </div>
                </Alert>

                <Alert show={formData.malformedD} variant="warning">
                    <Alert.Heading style={{ textAlign: "center" }}>Upload failed for Registration Number {formData.rn}</Alert.Heading>
                    <p style={{ textAlign: "center" }}>
                        Candidate must be atleast 20 years old, contact admin
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setFormData({ ...formData, malformedD: false })} variant="outline-warning">
                            Close
                        </Button>
                    </div>
                </Alert>



                <Alert show={formData.uploadSuccess} variant="success">
                    <Alert.Heading style={{ textAlign: "center" }}>Uploaded Successfully for Registration Number {formData.rn} with ID {formData.id}</Alert.Heading>
                    <p style={{ textAlign: "center" }}>
                        {/* Uploaded Successfully for Registration Number {formData.rn} with ID {formData.id} */}
                    </p>
                    <p style={{ textAlign: "center" }}>Wait for the ID to update, Blockchain asynchronous activity may take up to 2 mins.</p>
                    <hr />
                </Alert>
            </div>
            <hr></hr>

            <div className='container'>
                <Card border="warning" >
                    <Card.Header style={{ textAlign: 'center' }}>NOTE</Card.Header>
                    <Card.Body><h5 style={{ textAlign: 'center' }}>Wait for the ID to appear, Uploading with empty ID field may cause the application to malfunction</h5></Card.Body>
                </Card>
                <hr></hr>
                <p style={{ textAlign: 'center' }}>INFO: Click the UPLOAD button after filling all the details and review <Button onClick={submitTransaction} variant="primary" type="submit" style={{ Position: 'center' }} >
                    UPLOAD
                </Button></p>
            </div>
            <hr></hr>
            <br></br>


            <div class="container">
                <div class="row">
                    <div class="col">
                        <Form id="myForm">

                            <div class="row">
                                <div class="col">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control type="string" placeholder={formData.id} readOnly />
                                    </Form.Group>
                                </div>
                                <div class="col">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Registration Number</Form.Label>
                                        <Form.Control type="string" placeholder="Valid Registration number" onChange={(e) => setFormData({ ...formData, rn: e.target.value })} />
                                    </Form.Group>
                                </div>
                            </div>



                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, _name: e.target.value })} />
                                {/* <Form.Control type="string" placeholder="Name" onChange={(e) => setFormData({ ...formData, _name: e.target.value })} /> */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Date of Birth </Form.Label>
                                {/* <input type="date" name="DOB" minDate={new Date("02-01-2020")} maxDate={new Date("02-29-2020")}  /> */}
                                <Form.Control type="date" onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
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

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload or drag and drop the file</Form.Label>
                                <Form.Control type="file" onChange={(e) => uploadfile(e)} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div class="col">
                        <embed src={`data:application/pdf;base64,${b64}`} type="application/pdf" width="100%" height="600px"></embed>

                    </div>
                    <br></br>
                    <Card border="warning" >
                        <Card.Header style={{ textAlign: 'center' }}>Warning</Card.Header>
                        <Card.Body><h5 style={{ textAlign: 'center' }}>Carefully review the file and the details before uploading   </h5></Card.Body>
                    </Card>
                </div>
            </div>

            <footer class="page-footer font-small blue">

                <hr></hr>

                <div class="footer-copyright text-center py-3">© 2022 Copyright:  Centifission Infotect Pvt ltd</div>
                <br></br>


            </footer>
        </div>
    )

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


    return (
        <div>
            {/* {mainPage} */}
            {logFrom.show ? mainPage : login}
        </div>
    );

}

export default App;