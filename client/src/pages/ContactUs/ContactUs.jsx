import React, { useState } from 'react'
import './ContactUs.css'
import locationIcon from './location-svgrepo-com.svg';
import phoneIcon from './phone-svgrepo-com.svg';
import emailIcon from './email-svgrepo-com.svg';

export default function ContactUs(e) {

    const [formDetails, updateFormDetails] = useState({
        email: '',
        feedbackMessage: '',
        feedbackSent: false,
    });

    const [validationErrorMessage, updateValidationMessage] = useState({
        emailError: '',
        messageError: '',
    });

    const feedback = formDetails.feedbackMessage;

    const handleChange = (e) => {  
        updateFormDetails({
            ...formDetails,
            [e.target.name] : e.target.value,
        });
        
        if(feedback.length == 300){
            updateFormDetails({
                ...formDetails,
                feedbackMessage: feedback
            })    
        }
    }



    let emailRegex = /^([a-z0-9.]{1,40})([@]{1})([a-z]{2,10})([.]{1})([a-z]{2,8})$/;
    let emailVal = formDetails.email;
    let isEmailValid = emailRegex.test(emailVal.trim());

    


    const sendFeedback = async (e) => {
        e.preventDefault();
        
        let emailRegex = /^([a-z0-9.]{1,40})([@]{1})([a-z]{2,10})([.]{1})([a-z]{2,8})$/;
        let messageRegex = /^([a-zA-Z0-9 ./_-]{10,200})$/;

        let emailVal = formDetails.email;
        let messageVal = formDetails.feedbackMessage;
        
        let isEmailValid = emailRegex.test(emailVal.trim());
        let isMessageValid = messageRegex.test(messageVal.trim());
        
        const formData = new FormData();

        formData.append('email', formDetails.email);
        formData.append('feedbackMessage', formDetails.feedbackMessage);

        

        if(isEmailValid && isMessageValid){
            updateValidationMessage('');                

            try{
                const response = await fetch('http://localhost:5000/api/v1/feedback/',{
                    method: 'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify(formDetails),
                });
                const data = await response.json();
                updateFormDetails({
                    email:'', 
                    feedbackMessage:'',
                    feedbackSent: true
                });
                
            }
            catch(err){
                console.log(err);
            } 
            // setTimeout(() => {
            //     updateFormDetails({
            //         ...formDetails,
            //         feedbackSent: false
            //     });
            // }, 10000); // 10000 milliseconds (10 seconds)
        
        }
        else{
            if(!isEmailValid){
                updateValidationMessage({
                    ...formDetails,
                    emailError: 'Invalid Email Id'
                });
            }
            else{
                if(!isMessageValid){
                    updateValidationMessage({
                        ...formDetails,
                        messageError: 'Message cannot be empty or too short'
                    });
                }
            } 
        }          
    }

    
    return (
        <>
            <div className='contact-us-bg'>
                <h1 className='contact-heading'>Let's have a talk!</h1>
            </div>

            <div className="contact">
                <div className="address">
                    <h3 className='meet-us-head mb-4'>Meet Us</h3>
                    <div className="meet-us-phone">
                        <img src={phoneIcon} className='meet-us-icon'/>
                        <p className='meet-us-subtxt'>+544655454</p>
                    </div>
                    <div className="meet-us-phone">
                        <img src={emailIcon} className='meet-us-icon'/>
                        <p className='meet-us-subtxt'>contact@school.ro</p>
                    </div>
                    <div className="meet-us-phone">
                        <img src={locationIcon} className='meet-us-icon'/>
                        <p className='meet-us-subtxt '>Amman St, no 35, 4th floor, ap 10, Bucharest</p>
                    </div>
                </div>
            
                <div className="contact-map">
                    {/* <iframe
                        loading="lazy"
                        allowFullScreen
                        src="https://www.google.com/maps/embed?api=1&origin=Space+Needle+Seattle+WA&destination=Pike+Place+Market+Seattle+WA&travelmode=bicycling">
                    </iframe> */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2554283904396!2d72.97503727395411!3d19.184042848574315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8df399661ab%3A0xf9d290c6676cc65d!2sExcel%20Technical%20Institute!5e0!3m2!1sen!2sin!4v1705235389837!5m2!1sen!2sin" allowFullScreen loading="lazy"></iframe>
                </div>
                
                <div className="feedback">
                    <h3 className='meet-us-head mb-4'>Feedback</h3>
                    <div className="feedback-message">
                        <form onSubmit={sendFeedback}>
                            <input onChange={handleChange} name='email' value={formDetails.email} type="email" className='form-control mb-2 feedback-ins' placeholder='Email' />
                            <textarea onChange={handleChange} name='feedbackMessage' value={formDetails.feedbackMessage} className='form-control feedback-ins' placeholder='Message' />
                            <p className='char-counter mt-1'>{feedback.length} / 300 characters max</p>
                            <input className='btn btn-primary send-btn mt-3' type='submit' value='Send'/>
                        </form>
                        
                        {
                            (!validationErrorMessage.messageError == '' || validationErrorMessage.emailError == '') ? 
                            null
                            : 
                            (isEmailValid) ? 
                            null
                                :
                                (!formDetails.feedbackSent) ? 
                                <div className="alert alert-danger mt-2" role="alert">{validationErrorMessage.emailError}</div>      
                                :
                                null
                        }
                        
                        {
                            (!validationErrorMessage.emailError == '' || validationErrorMessage.messageError == '') ? 
                            null:
                            (feedback.length >= 10 ) ?
                            null
                                : 
                                (!formDetails.feedbackSent) ? 
                                <div className="alert alert-danger mt-2" role="alert">{validationErrorMessage.messageError}</div>    
                                :
                                <div className="alert alert-success mt-2" role="alert">Thanks for Feedback!</div>
                        }


                    </div>

                </div>
            </div>
        </>
    )
}
