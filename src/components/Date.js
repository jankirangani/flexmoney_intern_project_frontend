import React, { useState , useEffect } from "react";
import { Link,useLocation } from 'react-router-dom';
import axios from '../axios';

export default function Date() {

    const location = useLocation()
    const [user,setUser] = useState({});
    const [today,setToday] = useState();
    const [issub,setIssub] = useState(null);
    const [loading, setLoading] = useState(true);


    const setUserData = (data) =>{
        setUser(data);
        return true;
    }

    
 
    const getUser = async () => {
        const { id,today } = location.state
        const res = await axios.get("/user/"+id).then(
            (res)=>{
                
                const arr = res.data;
                setLoading(true);
                const con = setUserData(arr);
                if(con){
                    setLoading(false);
                    setToday(today);
                }

            }
        );
        
    }
    useEffect(() => {
        getUser();
    },[]);

    const handle = (e) =>{
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const submit = (e) =>{
        e.preventDefault();

        setUser({ ...user, error: null});
        console.log('first')

        const finalData=JSON.stringify({
            id:user.id,
            firstName:user.firstName,
            lastName: user.lastName,
            age: user.age,
            joiningDate:user.joiningDate,
            batch:user.batch,
            payment:'Not Done'
        });

        axios.put("/user/"+user.id,
        finalData,{headers:{
            "Content-Type": "application/json"
        }}
        ).then((res) => {
            setIssub('True');
            
        })

        
    }


  return (<>
  {loading === false ? (
  <div className="container">
    <br/>
    <h3>Hii..{user.firstName} {user.lastName}</h3>
    <br/>
    <div className="row justify-content-center">
    <form className="Form " onSubmit={submit} > 
        <div className="form-group my-2">
            <label><h5>Enter new date of joining</h5></label>
            <input onChange={handle} id="datefield"type="date" min={today} className="form-control" value={user.joiningDate} name="joiningDate" />
        </div>
        <label><h5>Enter new batch </h5></label>
        <select onChange={handle}
                        className="form-select" id="batch"name="batch">
                        <option defaultValue>Choose the batch</option>
                        <option value="6AM - 7AM">6AM - 7AM</option>
                        <option value="7AM - 8AM">7AM - 8AM</option>
                        <option value="8AM - 9AM">8AM - 9AM</option>
                        <option value="5PM - 6PM">5PM - 6PM</option>
                    </select><br/>
        {issub?<>
        <p style={{ color: "black" }}>Your data is submitted. Please click on the button to proceed with the payment.</p>
        <Link to="/payment"state={{id:user.id}} className="btn btn-dark mx-3">Proceed to pay</Link>
        </>
        : <button type="submit" className="btn btn-dark mx-3">Submit</button>}
       
    </form>
    </div>
  </div>
  )
   : (<></>)}
    </>
  )
}
