import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './pages.css';


const Profile = (props) => {


    const history = useHistory()

    let userProfile = JSON.parse(sessionStorage.getItem('usersArray')); // קבלת נתוני משתמש מהמאגר הראשי הכולל את כלל המשתמשים  
                                                                        // מכיוון שהנתונים נשמרו קודם לכן בדף ההתחברות באותו המאגר 

    

//////////////////////////////// כפתורים בפרופיל 

    // כפתור התנתק המנקה את זכרון המאגר הראשי ומחזיר לדף ההתחברות --> (Session Storage)
    const clearAll = (event) => {
        event.preventDefault(); //ביטול ניקוי הטופס באופן דיפולטיבי
        sessionStorage.clear();
 
        history.push('Login');
    }
    


    // לחיצה על הכפתור ומעבר למשחק
    const ToTheGame = (event) => {
        event.preventDefault(); 

        history.push('game');
    }



    // עדכון פרטי משתמש - מעבר לטופס הרשמה
    const UpdateDetails = (event) => {
        event.preventDefault(); 
        history.push('UpdateDetails');
    }

    
    //  כאשר המשתמש לא התחבר - בדף פרופיל יוצג לו כפתור חזרה לדף ההתחברות
    const BackToLogin = (event) => {
        event.preventDefault(); 
        history.push('Login');
    }


/////////////////////////////////////


    
     // ברגע שאין משתמש שמחובר למערכת תוצג לו הודעה מתאימה וכפתור חזרה לדף ההתחברות
     if ( userProfile == null) {
        return (
            <div class="userProfile">
               <p>You must be logged in to view this profile</p>
               <form onSubmit={BackToLogin}>
               <button type="BackToLogin">Back to login</button>
               </form>
            </div>
               )
     }
  
       
     else {
        return (


      // תבנית דף הפרופיל למשתמש ספציפי
 <div class="card-container">
     <h1>Profile User</h1>
    <img
        class="round"
        src={userProfile.profileImg}
        alt="user"
    />
    <h3>Hi {userProfile.name}</h3>
    <h5>User Name : {userProfile.userName}</h5>
    <p>Address : {userProfile.Street},{userProfile.city}</p>
    <p>Email :  {userProfile.email}</p> 
    <p>Birthday : {userProfile.startDate}</p>
       

    <div class="buttons">
    <form onSubmit={clearAll}>
       <button type="submit">התנתק</button>
       </form>
       <form onSubmit={ToTheGame}>
       <button type="submit">למשחק</button>
       </form>
       <form onSubmit={UpdateDetails}>
       <button type="submit">עדכון הפרטים</button>
       </form>
    </div>
</div>
    )
}
}


export default Profile;