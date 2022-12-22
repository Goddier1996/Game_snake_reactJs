import { useHistory } from 'react-router-dom';
import './pages.css';
import React from 'react'
import Swal from 'sweetalert2'



const Profile = () => {


    const history = useHistory()

    let userProfile = JSON.parse(sessionStorage.getItem('usersArray')); // קבלת נתוני משתמש מהמאגר הראשי הכולל את כלל המשתמשים  
    // מכיוון שהנתונים נשמרו קודם לכן בדף ההתחברות באותו המאגר 




    // כפתור התנתק המנקה את זכרון המאגר הראשי ומחזיר לדף ההתחברות --> (Session Storage)
    const clearAll = () => {

        sessionStorage.clear();

        history.push('Login');
        window.location.reload(false);

    }



    // לחיצה על הכפתור ומעבר למשחק
    const ToTheGame = () => {

        Swal.fire({
            title: 'This game can only be played with keys (keyboard)!',
            icon: 'warning',
        })

        history.push('game');

    }



    // עדכון פרטי משתמש - מעבר לטופס הרשמה
    const UpdateDetails = (event) => {
        event.preventDefault();
        history.push('UpdateDetails');
    }






    if (userProfile == null) {

        return (
            <div className="userProfile">
                <p>You must be logged in to view this profile</p>
            </div>
        )
    }




    if (userProfile != null) {

        return (

            <div className='cardProfile'>

                <div className="cardStyle">

                    <div className="col-md-4">

                        <div className="CardUser p-3 py-4">

                            <div className="text-center">
                                <img src={userProfile.profileImg} width="100" className="rounded-circle" />
                            </div>

                            <div className="text-center mt-3">
                                <h5 className="mt-2 mb-0">Hello {userProfile.userName}</h5>

                                <br />

                                <div className="px-4 mt-1">

                                    <p className="fonts">Email - {userProfile.email} </p>
                                    <p className="fonts">Birthday - {userProfile.startDate} </p>

                                </div>

                                <br />

                                <div className="buttons">

                                    <button className="btn btn-success px-4" onClick={ToTheGame}>Go Play</button>
                                    <button className="btn btn-warning px-4 ms-3" onClick={UpdateDetails}>Update User</button>
                                    <button className="btn btn-danger px-4 ms-3" onClick={clearAll}>Log Out</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;