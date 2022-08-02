import { useState } from "react";
import { useHistory } from 'react-router-dom';
import './pages.css';



const Login = (props) => {


    // הגדרת משתנים עבור טופס התחברות
    const history = useHistory()
    const [userName1, setUserName] = useState('')
    const [password1, setPassword] = useState('')



    //ההרשמה כשלוחצים על כפתור הרשמה
    const signUp = (event) => {

        if (userName1 === '' || password1 === '') {
            alert('יש למלא את כל השדות')
            return
        }

        event.preventDefault(); //ביטול ניקוי הטופס באופן דיפולטיבי


        let usersArray = JSON.parse(localStorage.getItem('users')); // קבלת המשתמשים ממאגר הנתונים והשמתם בתוך משתנה

        for (let i = 0; i < usersArray.length; i++) // מעבר על כמות המשתמשים 
        {
            if (usersArray[i].userName == userName1 && usersArray[i].password == password1) { // בדיקה אם השם משתמש והסיסמא שהמשתמש הזין, זהים לנתונים שקבלנו ממאגר הנתונים
                sessionStorage.setItem('usersArray', JSON.stringify(usersArray[i])); // שמירת אובייקט המשתמש בתוך המאגר -> Session Storage 
                history.push('Profile'); // לאחר התחברות המשתמש יועבר לדף הפרופיל
                return;
            }
        }



        if ('admin' == userName1 && 'admin1234admin' == password1) { // בדיקה האם המנהל הוא המשתמש שמתחבר 
            alert('Admin Login succes');

            history.push('Admin'); // לאחר התחברות המנהל יועבר לדף מנהל
        }

        else { // אם אין משתמש כזה במאגר הנתונים אז מציג הודעה מתאימה
            alert('Login unsucces, please try again');
        }
    }







    //תבנית של התחברות   
    return (



        <div class="sign-box">
            <h1>Welcome To Snake Game<p></p></h1>

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
                    <button class="btn" onClick={signUp} >Go</button>
                </div>
            </form>
        </div>
    )

}


export default Login;