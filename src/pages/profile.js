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
            <div class="userProfile">
                <p>You must be logged in to view this profile</p>
            </div>
        )
    }




    if (userProfile != null) {

        return (

            <div className='cardProfile'>

                <div class="cardStyle">

                    <div class="col-md-4">

                        <div class="CardUser p-3 py-4">

                            <div class="text-center">
                                <img src={userProfile.profileImg} width="100" class="rounded-circle" />
                            </div>

                            <div class="text-center mt-3">
                                <h5 class="mt-2 mb-0">Hello {userProfile.userName}</h5>

                                <br />

                                <div class="px-4 mt-1">

                                    <p class="fonts">Email - {userProfile.email} </p>
                                    <p class="fonts">Birthday - {userProfile.startDate} </p>

                                </div>

                                <br />

                                <div class="buttons">

                                    <button class="btn btn-success px-4" onClick={ToTheGame}>Go Play</button>
                                    <button class="btn btn-warning px-4 ms-3" onClick={UpdateDetails}>Update User</button>
                                    <button class="btn btn-danger px-4 ms-3" onClick={clearAll}>Log Out</button>

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