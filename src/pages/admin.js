import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './pages.css';




const Admin = (props) => {


    let users = JSON.parse(localStorage.getItem('users'))
    const [list, setUser] = useState(users) 
    const history = useHistory()





    // מחיקת משתמש ממאגר הנתונים
    const DeleteUser = (userName) => {

      const newList = list.filter((item) => item.userName !== userName); // מעבר על הרשימה של המשתמשים ובדיקה על איזה משתמש מדובר לפי שמו 
 
      setUser(newList); 

      let devicesArray = JSON.parse(localStorage.getItem('users'))
    
      for (let i = 0; i < devicesArray.length; i++)
      {
          if (devicesArray[i].userName == userName){
          localStorage.removeItem(devicesArray[i]); // מחיקת משתמש ספציפי מממאגר הנתונים
          devicesArray.splice(devicesArray.indexOf(devicesArray[i]), 1) // השיטה משנה את התוכן של מערך על ידי הסרה במיקום ספציפי
          localStorage.setItem('users', JSON.stringify(devicesArray)); // השמה של המערך החדש ללא אותו משתמש במאגר
        
          return;
          }
      }
      
      window.location.reload(false); // רענון דף
     
    }
    
         
        
        
    
    //  עדכון פרטי משתמש - מעביר את המשתמש לטופס עדכון פרטים ושמירתם
    const UpdateDetails = (userName) => {

      const newList = list.filter((item) => item.userName !== userName);
 
      setUser(newList);
      
      
      let usersArray = JSON.parse(localStorage.getItem('users'));
    
      for (let i = 0; i < usersArray.length; i++)
      {
          if (usersArray[i].userName == userName){
          sessionStorage.setItem('usersArray', JSON.stringify(usersArray[i]));
          history.push('updateDetails');
          return;
          }
      }
    }

  



    if (list == null) 
    {
        return <h1>Please Login</h1>
    }
    
    else
    {       
      const allUsers = list.map((item) =>
  
      <div className="navigation">
<table>
<caption></caption>
<thead>
  <tr>
    <th scope="col">Image user</th>
    <th scope="col">User name</th>
    <th scope="col">Full name</th>
    <th scope="col">Birthday</th>
    <th scope="col">Adress</th>
    <th scope="col">Email</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td data-label="Due Date"><img src={item.profileImg}></img></td>
    <td data-label="Due Date">{item.userName}</td>
    <td data-label="Account">{item.name} {item.lastName}</td>
    <td data-label="Due Date">{item.startDate}</td>
    <td data-label="Amount">{item.Street},{item.city}</td>
    <td data-label="Period">{item.email}</td>
    <td data-label="Period"><button type="button" onClick={() => DeleteUser(item.userName)}>
          Remove User
          </button></td>
    <td data-label="Period"><button type="button" onClick={() => UpdateDetails(item.userName)}>
          Update details
          </button></td>
  </tr>

</tbody>
</table>
       
      </div>      
      );
      
      return (           
          <ul className="title"> 
          <p>Admin Page :</p>
          {allUsers}
          </ul>
      );
  }
}


export default Admin;
