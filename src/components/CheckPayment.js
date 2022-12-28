import React, { useState,useEffect }  from "react";
import { Link } from 'react-router-dom';
import axios from '../axios';


export const CheckPayment = () => {

    const [data,setData] = useState({
        mobileNumber:''
    });

    const [arr,setarr] = useState({});
    const [us,setUs] = useState({});
    const [error,setError] = useState('');
    const [msg,setMsg] = useState('');
    const [id,setId] = useState();

    const getUsers = async () => {


        const res = await axios.get("/user");
        const arr = res.data; 
        setarr(arr);
        
    }

    useEffect(() => {
        getUsers();
    }, []);

    const len = arr.length;

    const handle = (e) => {

        const { name, value } = e.target;
        setData({ ...data, [name]: value });

    }

    const submit = (e) =>{
        e.preventDefault();
        setData({...data})
        const num = arr.filter((user)=> user.mobileNumber.includes(data.mobileNumber));


        if(num.length >0){
            setUs(num);
            setError('');
            setMsg('Done');
        }
        else{
            setError('Enter valid ID');
            setMsg('');
        }

    }

    return(
        <>
                    <br/>
                    <div className="row justify-content-center">
                    <form className="Form" onSubmit={submit}>
                    <div className="form-group my-2">
                        <label><h5>Enter Your Id</h5></label>
                        <input onChange={handle} type="number" className="form-control" value={data.mobileNumber} name="mobileNumber"  />
                    </div>
                    {error?
                    <>
                    <p color="red">{error}</p>
                    <button type="submit" className="btn btn-dark mx-3 my-1">Check ID</button>
                    </>: 
                    msg?
                    <>
                    <p color="black">Your id is valid. Click to proceed.</p>
                    <Link to = "/payment" state = {{id:us[0].id}} className="btn btn-dark mx-3 my-1">PROCEED</Link>
                    </>:
                    <button type="submit" className="btn btn-dark mx-3">Check ID</button>}
                    </form>
                    </div>
            </>
    );

}