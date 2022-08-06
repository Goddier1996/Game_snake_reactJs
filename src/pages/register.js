import React from 'react'
import { useState, useEffect } from "react";
import FormFeild from "../components/formField";
import { useHistory } from 'react-router-dom';
import './pages.css';
import Swal from 'sweetalert2'



const Register = () => {

    // הגדרת משתנים עבור טופס הרשמה
    const history = useHistory()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [startDate, setStartDate] = useState('');
    const [profileImg, setProfileImg] = useState('')



    //משתנה הצגת ערים
    const [cities, setCities] = useState([])



    //פונקציה מוציאה את כל הנתונים(ערים) שקיימים במערך
    const getCitiesFromJson = async () => {
        let response = await fetch('./data/israel-cities.json');
        let data = await response.json(); //the values
        setCities(data);
    }




    //בדיקה אם כל נתונים מלאים
    const checkForm = () => {

        if (userName === '' || password === '' || confirmPassword === '' || city === '') {

            Swal.fire({
                icon: 'warning',
                title: 'oops..',
                text: 'All fields must be filled in.',
            })

            return false;
        }

        else {
            return true;
        }
    }




    // בדיקת שם משתמש
    const checkUserName = () => {

        let decimal = /([A-Z-a-z])/;

        if (userName.match(decimal)) {
            return true;
        }

        else {

            Swal.fire({
                icon: 'warning',
                title: 'oops..',
                text: 'wrong user name - you need big char and letter char',
            })

            return false;
        }
    }




    // בדיקת סיסמא
    const checkPassword = () => {

        // let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,12}$/;
        let decimal = /.{5,12}/;

        if (password.match(decimal)) {
            return true;
        }

        else {

            Swal.fire({
                icon: 'warning',
                title: 'oops..',
                text: 'wrong password - you need 5-12 numbers',
            })

            return false;
        }
    }



    // אימות סיסמאות
    const checkCorrectPassword = () => {

        if (password === confirmPassword)
            return true;

        else {

            Swal.fire({
                icon: 'warning',
                title: 'oops..',
                text: 'The passwords do not match',
            })

            return false;
        }
    }



    //בדיקת מייל תקין 
    const checkEmail = () => {

        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (pattern.test(email)) {
            return true;
        }

        else if (!(pattern.test(email))) {

            Swal.fire({
                icon: 'warning',
                title: 'oops..',
                text: 'wrong email',
            })

            return false;
        }
    }




    // בדיקת תאריך תקין
    const checkDate = () => {

        if (startDate == null) {

            Swal.fire({
                icon: 'warning',
                title: 'oops..',
                text: 'wrong date',
            })

            return false;
        }
        else if (startDate != null) {
            return true;
        }
    }






    // העלת תמונת פרופיל לדף
    const uploadImage = (input) => {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setProfileImg(e.target.result);
            }
            reader.readAsDataURL(input.files[0]); //convert to base64 string
        }
    }




    //ההרשמה כשלוחצים על כפתור הרשמה
    const signup = (event) => {

        event.preventDefault(); //ביטול ניקוי הטופס באופן דיפולטיבי

        if (checkForm() && checkUserName() && checkEmail() && checkPassword() && checkCorrectPassword() && checkDate()) {

            let users = JSON.parse(localStorage.getItem('users')) || []; // משתנה שמוגדר כמערך ואליו נכנסים כל הנרשמים החדשים

            let user = { userName, password, city, email, startDate, profileImg }

            users.push(user);

            localStorage.setItem('users', JSON.stringify(users)) //הכנסת משתנה כדי שישמר במאגר של נתונים

            Swal.fire({
                icon: 'success',
                title: 'successfully',
                text: 'You have successfully registered to the site',
            })

            history.push('Login'); // פקודה שמעבירה אותנו לדף ספציפי שאליו צריך לעבור - במקרה זה מעבר מהרשמה להתחברות
        }
    }



    //udate the list of cities once the page load
    useEffect(() => {
        getCitiesFromJson();
    }, []);




    //תבנית של הרשמה                         
    return (
        <>

            <div class="register">

                <form className="bagroundToImage" onSubmit={signup} >
                    <h1>Create New Account : </h1>

                    <FormFeild input type="text" name="User name" action={setUserName} />
                    <FormFeild input type="password" name="Password" action={setPassword} />
                    <FormFeild input type="password" name="Confirm password" action={setConfirmPassword} />
                    <FormFeild input type="list" listId="listOfCities" data={cities} name="City" action={setCity} />
                    <FormFeild input type="text" name="Email" action={setEmail} />
                    <FormFeild input type="date" name="Date" action={setStartDate} />
                    <FormFeild input type="file" name="Profile image" targetImg={profileImg} action={uploadImage} />

                    <div class="buttonsRegister">
                        <button type="submit" class="btn btn-success" >submit</button>
                        <button type="reset" class="btn btn-danger">reset</button>
                    </div>
                </form>

            </div>
        </>
    )
}



export default Register;