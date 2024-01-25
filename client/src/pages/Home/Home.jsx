
import React from 'react';
import './Home.css';
import schoolInfoImage from './kids-getting-back-school-together.jpg';
import activityIcon from './activity-svgrepo-com.svg';
import studentsIcons from './child-baby-boy-girl-svgrepo-com.svg';
import staffsIcons from './people-group-svgrepo-com.svg';
import bookIcons from './book-closed-svgrepo-com.svg';

export default function Home() {

    return (

        <>
            <div className='home-page-bg-img'>
                <h1 className='home-heading'>Welcome to Home Page</h1>
            </div>

            <div className='school-info d-flex'>
                <div className="school-info-txt ">
                    <h2 className='school-info-head mb-5'>School Information</h2>
                    <p className="school-info-subtext">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, repellat blanditiis laborum at non excepturi aliquid facere! Ea, quisquam laudantium!
                    </p>
                    <p className="school-info-subtext">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, repellat blanditiis laborum at non excepturi aliquid facere! Ea, quisquam laudantium!
                    </p>
                    <p className="school-info-subtext">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, repellat blanditiis laborum at non excepturi aliquid facere! Ea, quisquam laudantium!
                    </p>
                </div>

                <div className="school-info-img">
                    <img className='image-fluid' src={schoolInfoImage} alt=""/>
                </div>
            </div>

            <div className="school-stats d-flex p-5">
                <div className="school-students-no">
                    <img className='icons' src={studentsIcons} />
                    <h1>200 Students</h1>
                </div>
                <div className="school-students-no">
                <   img className='icons' src={staffsIcons} />
                    <h1>40 Staff</h1>
                </div>
                <div className="school-students-no">
                    <img className='icons' src={bookIcons} />
                    <h1>16 Classes</h1>
                </div>
                <div className="school-students-no">
                    <img className='icons' src={activityIcon} />
                    <h1>64 Activities</h1>
                </div>
            </div>

            <div className="quote">
                <h2 className="quote-txt">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, recusandae?"</h2>
                <p className='quote-writer'>David Alaba -Parent</p>
            </div>
        </>

    )
}
