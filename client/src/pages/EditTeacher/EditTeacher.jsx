import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import './EditTeacher.css'
export default function EditTeacher() {
    const navigate = useNavigate();
    const params = useParams();
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

    useEffect((e) => {
        async function getTeacherOldDetails(){            
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/v1/teacher/${params.teacherId}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : token
                }
            })
            const teachersData = await response.json();
            // console.log(teachersData.data);
            updateFormDetails({
                ...teachersData.data,
            });
        }
        getTeacherOldDetails();
    }, []);

    const handleChange = (e) => {  
        updateFormDetails({
            ...formDetails,
            [e.target.name] : e.target.value,
        });
        
    }
    
    const editTeacherOldData = async (e) => {
        e.preventDefault();
        let nameRegex = /^([A-Za-z ]{1,50})$/;
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

        let isNameValid = nameRegex.test(nameVal);
        let isEmailValid = emailRegex.test(emailVal);
        let isContactValid = contactRegex.test(contactVal);
        let isSubjectValid = subjectRegex.test(subjectVal);
        let isQualificationValid = qualificationRegex.test(qualificationVal);
        let isSalaryValid = salaryRegex.test(salaryVal);


        if(isNameValid && isEmailValid && isContactValid && isSubjectValid && isQualificationValid && isSalaryValid){
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/v1/teacher/${params.teacherId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : token
                },
                body: JSON.stringify(formDetails)
            })

            const editedTeacherData = await response.json();
            if(editedTeacherData.status == 1){
                console.log(editedTeacherData.message);
                navigate('/view');
            }
            else{
                console.log(editedTeacherData.message);
            }
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
                                    validationErrorMessage: 'Invalid Designation',
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

                <div className='jumbotron container  col-md-6 col-sm-8 col-xs-10 mt-4'>
                    <h2 className='text-center'>Update Teacher's Data</h2>
                    <form onSubmit={editTeacherOldData}>
                        <div className="form-group">
                            <label htmlFor="name">Teacher Name: </label>
                            <input onChange={handleChange} value={formDetails.name} type="text" name='name' className="form-control" id="name" placeholder="Enter your Name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input onChange={handleChange} value={formDetails.email} type="email" name='email' className="form-control" id="email" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact: </label>
                            <input onChange={handleChange} value={formDetails.contact} type="text" name='contact' className="form-control" id="contact" placeholder="Enter Phone Number"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject: </label>
                            <input onChange={handleChange} value={formDetails.subject} type="text" name='subject' className="form-control" id="subject" placeholder="Enter Subject"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qualification">Qualification: </label>
                            <input onChange={handleChange} value={formDetails.qualification} type="text" name='qualification' className="form-control" id="qualification" placeholder="Enter Qualification"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary: </label>
                            <input onChange={handleChange} value={formDetails.salary} type="number" name='salary' className="form-control" id="salary" placeholder="Enter Salary"/>
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
                            <button type="submit" className="btn btn-primary col-md-12">Update Teacher</button>
                        </form>
                        
                        {
                        (formDetails.validationErrorMessage && formDetails.validationErrorMessage.trim() !== '') ? 
                            <div className="alert alert-danger mt-2" role="alert">{formDetails.validationErrorMessage}</div>
                            :
                            null
                        }

                </div>
            </div>
        </>
    )
}
