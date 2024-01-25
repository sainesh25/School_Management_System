import React from 'react'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'
import { useState } from 'react'
// import store from '../../store/store';
import { saveTeachers } from '../../store/slices/teacherSlice/teacherSlice'
import './AddTeachers.css';

export default function AddTeachers() {
    const navigate = useNavigate();

    const teacherData = useSelector((state) => {
        return state.teacher;
    });

    let [formDetails, updateFormDetails] = useState({
        name: '',
        email: '',
        contact: '',
        subject: '',
        qualification: '',
        salary: '',
        image: null,
        validationErrorMessage: '',
        fileUploadMessage: '',
    });

    const handleChange = (e) => {  
        updateFormDetails({
            ...formDetails,
            [e.target.name] : e.target.value,
        });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        let nameRegex = /^([A-Za-z ./]{1,50})$/;
        let emailRegex = /^([a-z0-9.]{1,40})([@]{1})([a-z]{2,10})([.]{1})([a-z]{2,8})$/;
        let contactRegex = /^([6-9]{1})([0-9]{9})$/
        let subjectRegex = nameRegex
        let qualificationRegex = nameRegex; 
        let salaryRegex = /^([0-9]{0,9})$/

        let nameVal = formDetails.name;
        let emailVal = formDetails.email;
        let contactVal = formDetails.contact;
        let subjectVal = formDetails.subject;
        let qualificationVal = formDetails.qualification;
        let salaryVal = formDetails.salary;

        let isNameValid = nameRegex.test(nameVal.trim());
        let isEmailValid = emailRegex.test(emailVal.trim());
        let isContactValid = contactRegex.test(contactVal.trim());
        let isSubjectValid = subjectRegex.test(subjectVal.trim());
        let isQualificationValid = qualificationRegex.test(qualificationVal.trim());
        let isSalaryValid = salaryRegex.test(salaryVal.trim());

        // SENDING DATA TO SERVER 

        const formData = new FormData();

        if(isNameValid && isEmailValid && isContactValid && isSubjectValid && isQualificationValid && isSalaryValid){
            formData.append('name', formDetails.name);
            formData.append('email', formDetails.email);
            formData.append('contact', formDetails.contact);
            formData.append('subject', formDetails.subject);
            formData.append('qualification', formDetails.qualification);
            formData.append('salary', formDetails.salary);
            formData.append('image', formDetails.image);

            try{
                const token = localStorage.getItem("token")
                const response = await fetch('http://localhost:5000/api/v1/teacher/', {
                    method: 'POST',
                    headers: {
                        // "Content-Type" : 'application/json',
                        'Authorization' : token
                    },
                    body: formData,
                });
                
                const data = await response.json();
                console.log(data);
            }
            catch(err){
                console.log(err);
            }
            navigate('/view');      
        }
        else{
            if(!isNameValid){
                updateFormDetails({
                    ...formDetails,
                    validationErrorMessage: 'Please Enter name correctly',
                });
            }
            else{
                if(!isEmailValid){
                    updateFormDetails({
                        ...formDetails,
                        validationErrorMessage: 'Invalid Email Id',
                    });
                }
                else{
                    if(!isContactValid){
                        updateFormDetails({
                            ...formDetails,
                            validationErrorMessage: 'Invalid Phone Number',
                        });
                    }
                    else{
                        if(!isSubjectValid){
                            updateFormDetails({
                                ...formDetails,
                                validationErrorMessage: 'Enter a applicable subject',
                            });
                        }
                        else{
                            if(!isQualificationValid){
                                updateFormDetails({
                                    ...formDetails,
                                    validationErrorMessage: 'Invalid Qualification',
                                });
                            }    
                            else{
                                if(!isSalaryValid){
                                    updateFormDetails({
                                        ...formDetails,
                                        validationErrorMessage: 'Only Enter numericals',
                                    });
                                }
                            }
                        }
                    }
                }
            }   
        }            
    }

    return (
        <>
            <div className="main-bg">
                <div className='jumbotron container col-md-6 col-sm-8 col-xs-10 mt-4'>
                    <h2 className='text-center'>Add Teacher's Data</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="name">Teacher Name: </label>
                            <input onChange={handleChange} type="text" name='name' className="form-control" id="name" placeholder="Enter your Name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input onChange={handleChange} type="email" name='email' className="form-control" id="email" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact: </label>
                            <input onChange={handleChange} type="text" name='contact' className="form-control" id="contact" placeholder="Enter Phone Number"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject: </label>
                            <input onChange={handleChange} type="text" name='subject' className="form-control" id="subject" placeholder="Enter Subject"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qualification">Qualification: </label>
                            <input onChange={handleChange} type="text" name='qualification' className="form-control" id="qualification" placeholder="Enter Qualification"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary: </label>
                            <input onChange={handleChange} type="number" name='salary' className="form-control" id="salary" placeholder="Enter Salary"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image" className='btn btn-success'>Upload Image</label>
                            
                            <p style={{display:'none', color: 'green'}}>File Uploaded Successfully</p>
                            <input onChange={(e) => {
                                updateFormDetails({
                                    ...formDetails,
                                    image: e.target.files[0],
                                    fileUploadMessage: 'File Uploaded Successfully',
                                });
                        }} className='form-control' type="file" name="image" id="image" style={{display: 'none'}}/>
                    
                    {
                        (!formDetails.image) ? null : <p className='' style={{color: 'green', fontSize: '.8rem'}}>{formDetails.fileUploadMessage}</p>
                    }
                        </div>                
                        <button type="submit" className="btn btn-primary col-md-12">Add Teacher</button>
                    </form>
                    
                    {
                        (formDetails.validationErrorMessage == '') ? 
                        null:
                        <div className="alert alert-danger mt-2" role="alert">{formDetails.validationErrorMessage}</div>
                    }
                </div>
            </div>
        </>
    )
}
