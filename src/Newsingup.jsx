import React, { useState, useEffect } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Table } from 'reactstrap'

export default function Newsingup() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        number: '',
        password: '',
        address: '',
        gender: '',
        hobbies: []
    });
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedData = localStorage.getItem('usersData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('usersData', JSON.stringify(data));
    }, [data]);

    const handleHobbyChange = (hobby) => {
        setUser(prevUser => {
            if (prevUser.hobbies.includes(hobby)) {
                return { ...prevUser, hobbies: prevUser.hobbies.filter(h => h !== hobby) };
            } else {
                return { ...prevUser, hobbies: [...prevUser.hobbies, hobby] };
            }
        });
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (number) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(number);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        return regex.test(password);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!user.username) newErrors.username = 'Username is required';
        if (!user.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(user.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!user.number) {
            newErrors.number = 'Contact number is required';
        } else if (!validatePhoneNumber(user.number)) {
            newErrors.number = 'Invalid contact number';
        }
        // if (!user.password) {
        //     newErrors.password = 'Password is required';
        // } else if (!validatePassword(user.password)) {
        //     newErrors.password = 'Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character';
        // }
        if (!user.address) newErrors.address = 'Address is required';
        if (!user.gender) newErrors.gender = 'Gender is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = () => {
        if (validateForm()) {
            setData([...data, user]);
            setUser({
                username: '',
                email: '',
                number: '',
                password: '',
                address: '',
                gender: '',
                hobbies: []
            });
            setErrors({});
        }
    };

    const filteredData = data.filter(e =>
        e.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className='d-flex justify-content-center'>
                <Form className='w-75 mt-5 border p-3 rounded'>
                    <h2 className='d-flex justify-content-center'>Registration Form</h2>
                    <FormGroup row>
                        <Label for="username" sm={2}>UserName</Label>
                        <Col sm={10}>
                            <Input
                                id="username"
                                name="username"
                                placeholder="Enter your name"
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="ContactNo" sm={2}>Contact Number</Label>
                        <Col sm={10}>
                            <Input
                                id="ContactNo"
                                name="number"
                                placeholder="Enter your contact number"
                                type="number"
                                value={user.number}
                                onChange={(e) => setUser({ ...user, number: e.target.value })}
                            />
                            {errors.number && <div className="text-danger">{errors.number}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleText" sm={2}>Address</Label>
                        <Col sm={10}>
                            <Input
                                id="exampleText"
                                name="text"
                                type="textarea"
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                            />
                            {errors.address && <div className="text-danger">{errors.address}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup row tag="fieldset">
                        <legend className="col-form-label col-sm-2">Gender</legend>
                        <Col sm={10}>
                            <div className='d-flex'>
                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                        value="Male"
                                        checked={user.gender === 'Male'}
                                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                    />
                                    {' '}
                                    <Label check>Male</Label>
                                </FormGroup>
                                {' '}
                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                        value="Female"
                                        checked={user.gender === 'Female'}
                                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                    />
                                    {' '}
                                    <Label check>Female</Label>
                                </FormGroup>
                            </div>
                            {errors.gender && <div className="text-danger">{errors.gender}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleHobbies" sm={2}>Hobbies</Label>
                        <Col sm={10}>
                            <div className="d-flex flex-wrap">
                                {['Reading', 'Traveling', 'Gaming', 'Cooking'].map(hobby => (
                                    <FormGroup check key={hobby} className="me-3">
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                value={hobby}
                                                checked={user.hobbies.includes(hobby)}
                                                onChange={() => handleHobbyChange(hobby)}
                                            />
                                            {hobby}
                                        </Label>
                                    </FormGroup>
                                ))}
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ offset: 2, size: 10 }}>
                            <Button onClick={submitHandler}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-50"
                />
            </div>
            <Table bordered className="border p-3 mt-4">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>ContactNo</th>
                        <th>Password</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Hobbies</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((e, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{e.username}</td>
                            <td>{e.email}</td>
                            <td>{e.number}</td>
                            <td>{e.password}</td>
                            <td>{e.address}</td>
                            <td>{e.gender}</td>
                            <td>{e.hobbies.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
