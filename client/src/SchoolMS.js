import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import "./SchoolMS.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ContactUs from "./pages/ContactUs/ContactUs";
import AddTeachers from "./pages/AddTeachers/AddTeachers";
import EditTeacher from "./pages/EditTeacher/EditTeacher";
import ViewTeachers from "./pages/ViewTeachers/ViewTeachers";
import ViewFeedbackMessages from "./pages/ViewFeedbackMessages/ViewFeedbackMessages";
import Protected from "./components/Protected/Protected";
import NotFound from "./pages/404/NotFound";

function SchoolMS() {
  	return (
		<div className="SchoolMS">
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="register" element={<Register/>}/>
				<Route path="login" element={<Login/>}/>
				<Route path="contact" element={<ContactUs/>}/>
				<Route path="add" element={<Protected component = {AddTeachers}/>}/>
				<Route path="edit/:teacherId" element={<Protected component = {EditTeacher}/>}/>
				<Route path="view" element={<Protected component = {ViewTeachers}/>}/>
				<Route path="viewMessages" element={<Protected component = {ViewFeedbackMessages}/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</div>
  	);
}

export default SchoolMS;
