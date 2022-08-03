import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './pages.css';
import React from 'react'
import { Table } from 'react-bootstrap'




const Admin = () => {


  let users = JSON.parse(localStorage.getItem('users'))

  let countUsers = 1;


  const [list, setUser] = useState(users);
  const history = useHistory();





  // מחיקת משתמש ממאגר הנתונים
  const DeleteUser = (userName) => {

    const newList = list.filter((item) => item.userName !== userName); // מעבר על הרשימה של המשתמשים ובדיקה על איזה משתמש מדובר לפי שמו 

    setUser(newList);

    let devicesArray = JSON.parse(localStorage.getItem('users'))

    for (let i = 0; i < devicesArray.length; i++) {
      if (devicesArray[i].userName == userName) {
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

    for (let i = 0; i < usersArray.length; i++) {
      if (usersArray[i].userName == userName) {
        sessionStorage.setItem('usersArray', JSON.stringify(usersArray[i]));
        history.push('updateDetails');
        return;
      }
    }
  }






  if (list == null) {


    return (

      <div className="navigation">

        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "2%", textAlign: "center" }}>#</th>
              <th>Image user</th>
              <th>User name</th>
              <th>Birthday</th>
              <th>Email</th>
              <th style={{ width: "9%", textAlign: "center" }}></th>
              <th style={{ width: "10%", textAlign: "center" }}></th>
            </tr>
          </thead>
        )}
        </Table>

      </div>
    )
  }




  if (list != null) {

    return (
      <div className="navigation">

        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "2%", textAlign: "center" }}>#</th>
              <th>Image user</th>
              <th>User name</th>
              <th>Birthday</th>
              <th>Email</th>
              <th style={{ width: "9%", textAlign: "center" }}></th>
              <th style={{ width: "10%", textAlign: "center" }}></th>
            </tr>
          </thead>


          {list.map((item) =>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>{countUsers++}</td>
                <td><img src={item.profileImg}></img></td>
                <td>{item.userName}</td>
                <td>{item.startDate}</td>
                <td>{item.email}</td>

                <td><button type="button" onClick={() => DeleteUser(item.userName)}>
                  Remove User
                </button></td>

                <td><button type="button" onClick={() => UpdateDetails(item.userName)}>
                  Update details
                </button></td>

              </tr>
            </tbody>
          )}
        </Table>

      </div>
    )
  }


}


export default Admin;