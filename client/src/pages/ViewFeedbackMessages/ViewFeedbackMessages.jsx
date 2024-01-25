import React, { useEffect } from 'react'
import { saveFeedbackMessage } from '../../store/slices/feedbackSlice/feedbackSlice'
import { useDispatch, useSelector } from 'react-redux'
import '../ViewTeachers/ViewTeachers.css';
import './ViewFeedbackMessages.css'

export default function ViewFeedbackMessages() {
    const dispatch = useDispatch();

    const getFeedbackMessages = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:5000/api/v1/feedback/', {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : token,
                }
            });

            const feedbackData = await response.json();
            dispatch(saveFeedbackMessage(feedbackData.data));
        } 
        catch (err) {
            console.log(err);
        }
    }

    useEffect((e) => {
        const getData = async () => {
            await getFeedbackMessages();
        }
        getData();
    }, []);

    const feedbacks = useSelector((state) => {
        return state.feedback.feedbacks;
    });

    const deleteFeedback = async (feedbackId) => {
        try{
            const token  = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/v1/feedback/${feedbackId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : token,
                }
            });
            const deletedFeedback = await response.json();
            if(deletedFeedback.status == 1){
                await getFeedbackMessages();
            }
        }   
        catch(err){
            console.log(err);
        }     
    }

    return (
        <>
            <div className="main-bg">
				<div className=''>
					<h2 className='mb-3 text-center'>View Feedback Messages</h2>
					<div className='container d-flex justify-content-center' >
						<table className="table table-bordered text-center"  >
							<thead>
								<tr className='table-headings'>
									<th >Email</th>
									<th className='col-md-5'>Feedback Message</th>
									<th>Action</th>    
								</tr>
							</thead>
							<tbody>
								{
									feedbacks && feedbacks.map((feedbackMessage) => {
										return(
											<tr key={feedbackMessage._id}>
												<td className='align-middle'>{feedbackMessage.email}</td>
												<td className='align-middle'>{feedbackMessage.feedbackMessage}</td>
												<td className='align-middle'><button onClick={(e) => {deleteFeedback(feedbackMessage._id)}} className='btn btn-danger btn-sm'>Delete</button></td>
											</tr>
										);	
									})
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
    )
}
