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
                <div class="card-container">
                    <h1>Profile User</h1>
                    <img
                        class="round"
                        src={userProfile.profileImg}
                        alt="user"
                    />
                    <h3>Hi {userProfile.name}</h3>
                    <h5>User Name : {userProfile.userName}</h5>
                    <p>Email :  {userProfile.email}</p>
                    <p>Birthday : {userProfile.startDate}</p>


                    <div class="buttons">
                        <form onSubmit={clearAll}>
                            <button type="submit">Log Out</button>
                        </form>
                        <form onSubmit={ToTheGame}>
                            <button type="submit">Go Play</button>
                        </form>
                        <form onSubmit={UpdateDetails}>
                            <button type="submit">Update User</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;