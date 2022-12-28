import React, { useState , useEffect } from "react";
import { Link,useLocation } from 'react-router-dom';
import axios from '../axios';

export const Payment = () => {

    const location = useLocation()
    const [id1,setid1] = useState();
    const [users,setUsers] = useState({});
    const [msg,setMsg] = useState('');
    const [err,setErr] = useState('');
    const getUsers = async () => {
        
        const { id } = location.state;
        setid1(id);


        const res = await axios.get("/user");
        const arr = res.data;

        setUsers(arr[id-1]); 

        const last = new Date(arr[id-1].lastDate);
        const today = new Date();
        if(last.getTime()<today.getTime()){
            setErr('Your enrollment is completed, please select new date.');
            
        }
        else{
            if(arr[id-1].payment == 'Done'){
                setMsg('Your payment is successful')
                
            }
            else{
                setMsg('your payment is due, you can pay before'+ users.lastDate);
            }
        }
        
    }
    useEffect(() => {
        getUsers();
    }, []);
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd
    }
    if (mm < 10) {
    mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    const handle = (e) => {

        setMsg('Your payment is successful');
        const finalData=JSON.stringify({
            mobileNumber:users.mobileNumber,
            firstName:users.firstName,
            lastName:users.lastName,
            age:users.age,
            joiningDate:users.joiningDate,
            batch:users.batch,
            payment: "Done"
        });
        axios.put("/user/"+id1,
        finalData,{headers:{
            "Content-Type": "application/json"
        }}
        ).then((res) => {
            setMsg('Your payment is successful')
            
        })

    }

    return (
        <div className='container'>
            <br /><br />
            <h1> Payment Window</h1><br/>
            <div className="row  justify-content-center">
                <div className="Form ">
                <h5>{users.firstName}  {users.lastName}</h5>
            </div>
            <h5>JoiningDate: {users.joiningDate} </h5>
            <h5>LastDate: {users.lastDate} </h5>
            </div>
            {err?<>
            <p color="black">{err}</p>
            <Link to = "/date"state = {{id:id1,today:today}}className="btn btn-dark mx-3 my-2">Click to select</Link>
            </>:
            msg !== 'Your payment is successful' ?
            <>
            <p>You can pay till {users.lastDate}.</p>
            <button onClick={handle} className="btn btn-dark mx-3"> Pay Now </button>
            </>:
            <p>Your payment is successful</p>}
            

            <br /><br />
            <Link className="text-dark" to="/">Click here to go to main page</Link>

        </div>
    );
}
