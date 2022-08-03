import { useState } from "react";
import { useHistory } from 'react-router-dom';
import './pages.css';
import { Button, Modal } from 'react-bootstrap'
import React from 'react'
import Swal from 'sweetalert2'



const Login = () => {


    // הגדרת משתנים עבור טופס התחברות
    const history = useHistory()
    const [userName1, setUserName] = useState('')
    const [password1, setPassword] = useState('')



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let userDetails = JSON.parse(sessionStorage.getItem('usersArray')) // קבלת משתמש ספציפי כדי לעדכן את הפרטים שלו




    //ההרשמה כשלוחצים על כפתור הרשמה
    const signUp = () => {

        if (userName1 === '' || password1 === '') {

            Swal.fire({
                icon: 'warning',
                title: 'oops..',
                text: 'All fields must be filled in.',
            })

            return;
        }



        if (userName1 != '' || password1 != '') {

            let usersArray = JSON.parse(localStorage.getItem('users')); // קבלת המשתמשים ממאגר הנתונים והשמתם בתוך משתנה

            for (let i = 0; i < usersArray.length; i++) // מעבר על כמות המשתמשים 
            {
                if (usersArray[i].userName == userName1 && usersArray[i].password == password1) { // בדיקה אם השם משתמש והסיסמא שהמשתמש הזין, זהים לנתונים שקבלנו ממאגר הנתונים
                    sessionStorage.setItem('usersArray', JSON.stringify(usersArray[i])); // שמירת אובייקט המשתמש בתוך המאגר -> Session Storage 
                    history.push('Profile'); // לאחר התחברות המשתמש יועבר לדף הפרופיל
                    return;
                }
            }
        }




        if ('admin' == userName1 && 'admin1234admin' == password1) { // בדיקה האם המנהל הוא המשתמש שמתחבר 

            Swal.fire({
                icon: 'success',
                title: 'successfully',
                text: 'Admin Login succes',
            })

            history.push('Admin'); // לאחר התחברות המנהל יועבר לדף מנהל
        }



        else { // אם אין משתמש כזה במאגר הנתונים אז מציג הודעה מתאימה
            alert('Login unsucces, please try again');
        }

    }






    const signUpDemoUser = () => {

        let user = {
            userName: "User",
            password: "12345678",
            city: "Tel-Aviv",
            email: "user@gmail.com",
            startDate: "20/07/96",
            profileImg: "https://i.postimg.cc/d31L9Ct5/men.png"
        }

        sessionStorage.setItem('usersArray', JSON.stringify(user));
        history.push('Profile');
        return;
    }






    if (userDetails != null) {

        return (
            <>

                <div className='main1'>
                    <img src={require("../images/gamrz.jpg").default}></img>
                    <div className="content">
                        <h1>Welcome</h1>
                        <p>To Snake Game</p>
                    </div>
                </div>


                <>
                    <Modal show={show} onHide={handleClose}>

                        <div class="sign-box">
                            <h1>Sign In<p></p></h1>

                            <form action="#" method="get" autocomplete="off">

                                <div class="input-field">
                                    <p>User Name :</p>
                                    <input class="input" onInput={(event) => { setUserName(event.target.value) }} />
                                </div>

                                <div class="input-field">
                                    <p>Password :</p>
                                    <input type="password" class="input" onInput={(event) => { setPassword(event.target.value) }} />
                                </div>


                                <div class="input-field right">
                                    <button class="btn" onClick={signUp} >Play</button>
                                </div>


                                <div className='DemoUserAndDoctor'>
                                    <a href="" onClick={signUpDemoUser} >Connect Demo User</a>
                                </div>
                            </form>
                        </div>

                    </Modal>
                </>
            </>
        )
    }



    else {

        return (
            <>

                <div className='main1'>
                    <img src={require("../images/gamrz.jpg").default}></img>
                    <div className="content">
                        <h1>Welcome</h1>
                        <p>To Snake Game</p>
                        <Button variant="warning" onClick={handleShow}>Start Game</Button>
                    </div>
                </div>


                <>
                    <Modal show={show} onHide={handleClose}>

                        <div class="sign-box">
                            <h1>Sign In<p></p></h1>

                            <form action="#" method="get" autocomplete="off">

                                <div class="input-field">
                                    <p>User Name :</p>
                                    <input class="input" onInput={(event) => { setUserName(event.target.value) }} />
                                </div>

                                <div class="input-field">
                                    <p>Password :</p>
                                    <input type="password" class="input" onInput={(event) => { setPassword(event.target.value) }} />
                                </div>


                                <div class="input-field right">
                                    <button class="btn" onClick={signUp} >Play</button>
                                </div>


                                <div className='DemoUserAndDoctor'>
                                    <a href="" onClick={signUpDemoUser} >Connect Demo User</a>
                                </div>
                            </form>
                        </div>

                    </Modal>
                </>
            </>
        )
    }


}


export default Login;