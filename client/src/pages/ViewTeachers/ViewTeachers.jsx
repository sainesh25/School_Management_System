import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch ,useSelector } from 'react-redux';

import './ViewTeachers.css'
import { saveTeachers } from '../../store/slices/teacherSlice/teacherSlice';

export default function ViewTeachers() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	let [message, updateMessage] = useState('');

	async function getTeachers (){
		try{
			const token = localStorage.getItem('token');
			const response = await fetch('http://localhost:5000/api/v1/teacher/', {
				method: 'GET',
				headers: {
					'Content-Type' : 'application/json',
                    'Authorization' : token
				}
			});

			const teacherData = await response.json();
			dispatch(saveTeachers(teacherData.data));
			// console.log(teacherData);
		}
		catch(err){
			console.log(err);
		}
	}

	useEffect(() => {
		const getData = async () => {
			await getTeachers();
		}
		getData();
	}, []);

	
	const teachers = useSelector((state) => {
		return state.teacher.teachers;
	});
	
	async function deleteTeacher (id) {
		try{
			const token = localStorage.getItem('token');
			const response = await fetch(`http://localhost:5000/api/v1/teacher/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type' : 'application/json',
					'Authorization' : token,
				},
			});

			const deletedReponse = await response.json();

			if(deletedReponse.status == 1){
				updateMessage(deletedReponse.message);
				await getTeachers();
			}
			else{
				updateMessage(deletedReponse.message);
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
					<h2 className='mb-3 text-center'>View Teachers</h2>
					<div className='col-md-12 container ' >
						<table className="table table-bordered text-center">
							<thead>
								<tr className='table-headings'>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Contact No</th>
									<th scope="col">Subject</th>
									<th scope="col">Qualification</th>
									<th scope="col">Salary</th>
									<th scope="col">Image</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{
									teachers && teachers.map((singleTeacher) => {
										return(
											<tr key={singleTeacher._id}>
												<td className='align-middle'>{singleTeacher.name}</td>
												<td className='align-middle'>{singleTeacher.email}</td>
												<td className='align-middle'>{singleTeacher.contact}</td>
												<td className='align-middle'>{singleTeacher.subject}</td>
												<td className='align-middle'>{singleTeacher.qualification}</td>
												<td className='align-middle'>{singleTeacher.salary}</td>
												<td className='align-middle'><img className='headshot-images' src={`http://localhost:5000/uploads/${singleTeacher.image}`}/></td>
												<td className='buttons align-middle'>
													<button onClick={(e) => {
														navigate(`/edit/${singleTeacher._id}`);
													}} className='btn btn-warning btn-sm m-2'>Edit</button>
													<button onClick={(e) => {
														deleteTeacher(singleTeacher._id);
													}}className='btn btn-danger btn-sm m-2'>Delete</button>
												</td>
											</tr>	
										)
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
