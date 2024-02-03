import axios from "axios";
import { useEffect, useState } from "react";
import './EmployeeCrud.css';

function EmployeeCrud() {

    const [_id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employees, setUsers] = useState([]);


    useEffect(() => {
        Load();
    }, []);


    async function Load() {
        const result = await axios.get("http://localhost:8000/user/getAll");
        setUsers(result.data.data);
        console.log(result.data);
    }


    async function Save(event) {
        event.preventDefault();

        try {
            await axios.post("http://localhost:8000/user/create", {
                name: name,
                address: address,
                phone: phone,
                username: username,
                email: email,
                password: password
            });

            alert("Employee Registration Successfully");

            setId("");
            setName("");
            setAddress("");
            setMobile("");
            setUsername("");
            setEmail("");
            setPassword("");

            Load();

        } catch (error) {
            alert("User Registration Failed");
        }
    }


    async function EditEmployee(employees) {
        setId(employees._id);
        setName(employees.name);
        setAddress(employees.address);
        setMobile(employees.phone);
        setUsername(employees.username);
        setEmail(employees.email);
        setPassword(employees.password);
    }


    async function DeleteEmployee(_id) {
        await axios.delete("http://localhost:8000/user/delete/" + _id);
        alert("Employee deleted Successfully");
        Load();
    }


    async function Update(event) {
        event.preventDefault();

        try {
            await axios.patch("http://localhost:8000/user/update/" + employees.find((u) => u._id === _id)._id || _id,
                {
                    _id: _id,
                    name: name,
                    address: address,
                    phone: phone,
                    username: username,
                    email: email,
                    password: password
                }
            );

            alert("Data Updated");

            setId("");
            setName("");
            setAddress("");
            setMobile("");
            setUsername("");
            setEmail("");
            setPassword("");

            Load();
        } catch (error) {
            alert(error);
        }
    }


    return (
        <>
            <div className="container">
                <h1 className="text-center text-primary fs-1 fw-bolder my-5">
                    Click The Button Below To Create Account
                </h1>

                <form>
                    {/* <!-- Button trigger modal --> */}
                    <div className="m-5 d-flex justify-content-center align-items-center">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createAccount">
                            Create Account
                        </button>
                    </div>

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="createAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Create Your Account Here</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="_id"
                                                        hidden
                                                        value={_id}
                                                        onChange={(event) => {
                                                            setId(event.target.value);
                                                        }}
                                                    />

                                                    <label for="name" className="form-label">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        value={name}
                                                        onChange={(event) => {
                                                            setName(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group mt-2">
                                                    <label for="username" className="form-label">Username</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        value={username}
                                                        onChange={(event) => {
                                                            setUsername(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group mt-3">
                                                    <label for="phone" className="form-label">Mobile</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(event) => {
                                                            setMobile(event.target.value)
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group mt-3">
                                                    <label for="password" className="form-label">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        value={password}
                                                        onChange={(event) => {
                                                            setPassword(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group mt-3">
                                                    <label for="email" className="form-label">Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        value={email}
                                                        onChange={(event) => {
                                                            setEmail(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group mt-3">
                                                    <label for="address" class="form-label">Address</label>
                                                    <textarea
                                                        type="text"
                                                        class="form-control"
                                                        id="address"
                                                        value={address}
                                                        onChange={(event) => {
                                                            setAddress(event.target.value);
                                                        }} rows="3"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary me-auto" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={Update}>Update</button>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={Save}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>


                {/* <hr /><br /><br /> */}

                <div class="table-responsive-md">
                    <table className="table table-striped table-hover table-bordered border-dark align-middle" align="center">
                        <thead class="table-primary">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        {employees.map((employee) => {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope="row">{employee._id}</th>
                                        <td>{employee.name}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.username}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.password}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#createAccount" onClick={() => EditEmployee(employee)}>Edit</button>
                                            <button type="button" className="btn btn-danger m-1" onClick={() => DeleteEmployee(employee._id)}>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </div>
        </>
    );
}
export default EmployeeCrud;