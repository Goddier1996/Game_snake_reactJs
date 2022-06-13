
import { useState, useEffect } from "react";
import FormFeild from "../components/formField";
import { useHistory } from 'react-router-dom';
import './pages.css';


const UpdateDetails = (props) => {
    //הגדרת משתנים עבור טופס הרשמה
    const history = useHistory()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [startDate, setStartDate] = useState('');
    const [Street, setStreet] = useState('')
    const [NumStreet, setNumStreet] = useState('')
    const [profileImg, setProfileImg] = useState('')



    //משתנה הצגת ערים
    const [cities, setCities] = useState([])

    //udate the list of cities once the page load
    useEffect(() => {
        getCitiesFromJson();
    }, []);


    //פונקציה מוציאה את כל הנתונים(ערים) שקיימים במערך
    const getCitiesFromJson = async () => {
        let response = await fetch('./data/israel-cities.json');
        let data = await response.json(); //the values
        setCities(data);
    }





    //בדיקה אם כל נתונים מלאים
    const checkForm = () => {

        if (userName === '' || password === '' || confirmPassword === '' || city === '') {
            alert('יש למלא את כל השדות')
            return false;
        }

        else{
         return true;
        }
    }




    // בדיקת שם משתמש
    const checkUserName=()=>{
     
        let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,60}$/;
        if(userName.match(decimal)) 
        { 
        // alert('good user name')
        return true;
        }
        else {
        alert('wrong user name')
        return false; 
       }
    }
    



    // בדיקת סיסמא
    const checkPassword=()=>{
  
    let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,12}$/;
    if(password.match(decimal)) 
    { 
    // alert('good password')
    return true;
    }
    
    else {
    alert('wrong password')
    return false; 
    }
}



    // אימות סיסמאות
    const checkCorrectPassword=()=>{

        if (password === confirmPassword)
        return true;

        else {
        alert(`הסיסמאות לא תואמות`)
        return false;
        }
    }



    //בדיקת מייל תקין 
    const checkEmail = () => {
       
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          
        if (pattern.test(email)) {
        // alert('good email')
        return true;
        }

        else if (!(pattern.test(email))){
        alert('wrong email')
        return false; 
       }
    }
    
    
    // בדיקת תאריך תקין
    const checkDate = () => {

        if (startDate == null){
           alert('wrong date')
           return false;
        }
        else if (startDate != null){
            return true;
        }
    }
    


    // בדיקת רחוב-כתובת תקינה
    const checkStreet = () => {
        if (!(Street > 'A' && Street < 'Z' || Street > 'a' && Street < 'z'))
        {
        return true;
        }
        else 
        {
            alert('wrong street');
            return false;
        }
    }

    // בדיקת תקינות מספר רחוב
    const checkNumStreet = () => {
        if (NumStreet > 0 && NumStreet < 1000)
        {
        // alert('good street number');
        return true;
        }
        else 
        {
        alert('wrong street number');
        return false;
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

        if (checkForm() && checkUserName() && checkEmail() && checkPassword() && checkCorrectPassword() && checkDate() && checkStreet() && checkNumStreet()) {

            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            let userDetails = JSON.parse(sessionStorage.getItem('usersArray')) // קבלת משתמש ספציפי כדי לעדכן את הפרטים שלו
            
           
            
            for (let i = 0; i < users.length; i++){
                if (users[i].name == userDetails["name"]){ // בדיקה אם השם במאגר הנתונים שווה ל-שם של המשתמש הספציפי
                // עדכון פרטים חדשים למשתמש ספציפי
                    users[i].userName = userName;
                    users[i].password = password;
                    users[i].confirmPassword = confirmPassword;
                    users[i].city = city;
                    users[i].name = name;
                    users[i].lastName = lastName;
                    users[i].email = email;
                    users[i].startDate = startDate;
                    users[i].Street = Street;
                    users[i].NumStreet = NumStreet;
                    users[i].profileImg = profileImg;
                }
            }

            // השמה של הפרטים העדכניים בתוך משתמש ספציפי
            userDetails["userName"] = userName;
            userDetails["password"] = password;
            userDetails["confirmPassword"] = confirmPassword;
            userDetails["city"] = city;
            userDetails["name"] = name;
            userDetails["lastName"] = lastName;
            userDetails["email"] = email;
            userDetails["startDate"] = startDate;
            userDetails["Street"] = Street;
            userDetails["NumStreet"] = NumStreet;
            userDetails["profileImg"] = profileImg;


            sessionStorage.setItem('usersArray' ,JSON.stringify(userDetails)); // כעת עודכנו במאגר פרטים חדשים
            localStorage.setItem('users', JSON.stringify(users)); 
             

     
            alert(`עודכנו פרטי המשתמש!`)
            history.push('Login'); 
        }
    }





    


    //תבנית של הרשמה                         
    return (
      <div class="container">

      <div class="dolly"></div> 

      <div class="register">  

      <h1 class="register-heading">Update your details : </h1>
    
  <form onSubmit={signup}>
    
      <FormFeild input type="text" name="User name" action={setUserName} /> 
      <FormFeild input type="password" name="Password" action={setPassword} />
      <FormFeild input type="password" name="Confirm password" action={setConfirmPassword} />
      <FormFeild input type="list" listId="listOfCities" data={cities} name="City" action={setCity} />
      <FormFeild input type="text" name="First name" action={setName} />
      <FormFeild input type="text" name="Last name" action={setLastName} />
      <FormFeild input type="text" name="Email" action={setEmail} />
      <FormFeild input type="date" name="Date" action={setStartDate}/>
      <FormFeild input type="text" name="Street" action={setStreet} />
      <FormFeild input type="number" name="Street number" action={setNumStreet} />          
      <FormFeild input type="file" name="Profile image" targetImg={profileImg} action={uploadImage} />  

      <div class= "buttons">
      
      <button type="submit">submit</button>
      <button type="reset">reset</button>
      </div>
  </form>

</div>
</div>
         
    )
}



export default UpdateDetails;