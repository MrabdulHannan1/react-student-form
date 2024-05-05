import React, { useState } from 'react';
import axios from 'axios';

const REG = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;

        // Validate Full Name
        if (fullName.trim() === '') {
            setFullNameError('Full Name is required');
            valid = false;
        } else {
            setFullNameError('');
        }

        // Validate Email
        if (email.trim() === '') {
            setEmailError('Email is required');
            valid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
            valid = false;
        } else {
            setEmailError('');
        }

        // Validate Age
        if (age.trim() === '') {
            setAgeError('Age is required');
            valid = false;
        } else if (isNaN(age) || parseInt(age) <= 0) {
            setAgeError('Age must be a valid number');
            valid = false;
        } else {
            setAgeError('');
        }

        // Validate Address
        if (address.trim() === '') {
            setAddressError('Address is required');
            valid = false;
        } else {
            setAddressError('');
        }

        // Validate Phone Number
        if (phoneNumber.trim() === '') {
            setPhoneNumberError('Phone Number is required');
            valid = false;
        } else if (!isValidPhoneNumber(phoneNumber)) {
            setPhoneNumberError('Invalid phone number format');
            valid = false;
        } else {
            setPhoneNumberError('');
        }

        if (valid) {
            // Send form data to backend using Axios
            axios.post('/api/formData', {
                fullName,
                email,
                age,
                address,
                phoneNumber
            })
            .then(response => {
                setSuccessMessage(response.data.message);
                // Reset form fields if needed
                setFullName('');
                setEmail('');
                setAge('');
                setAddress('');
                setPhoneNumber('');
            })
            .catch(error => console.error('Error:', error));
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        return /^[0-9]{11}$/.test(phoneNumber);
    };

    return (
        <div className="form-box">
            <form className="form" onSubmit={handleSubmit}>
                <span className="title">Student Registration</span>
                <span className="subtitle">Create an account with your details.</span>
                <div className="form-container">
                    <input type="text" className="input" id="fullName" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    {fullNameError && <span className="error">{fullNameError}</span>}
                    <input type="email" className="input" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <span className="error">{emailError}</span>}
                    <input type="number" className="input" id="age" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    {ageError && <span className="error">{ageError}</span>}
                    <input type="text" className="input" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {addressError && <span className="error">{addressError}</span>}
                    <input type="text" className="input" id="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    {phoneNumberError && <span className="error">{phoneNumberError}</span>}
                </div>
                <button type="submit">Sign up</button>
                {successMessage && <div id="successMessage">{successMessage}</div>}
            </form>
            <div className="form-section">
                <p>Already have an account? <a href="">Log in</a></p>
            </div>
        </div>
    );
};

export default REG;
