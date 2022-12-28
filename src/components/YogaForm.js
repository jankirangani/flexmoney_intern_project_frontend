import React, { useState , useEffect } from "react";
import axios from '../axios';
import { Link } from 'react-router-dom';


export const YogaForm = () => {

    const [users,setUsers] = useState({});
    const [nums,setNums] = useState();
    
    const getUsers = async () => {

        const res = await axios.get("/user");
        setUsers(res.data);
    }
    useEffect(() => {
        getUsers();
    }, []);

    const len = users.length;
    const uid = len+1;

    const validName = new RegExp('^[a-zA-Z]+$');
    const validNum = new RegExp('^[6-9]?[0-9]{9}$');

    const [error1, seterror1] = useState('');
    const [error2, seterror2] = useState('')
    const initialState = {
        id:null,
        mobilenumber:'',
        firstname: '',
        lastname: '',
        age: '',
        joiningdate:'',
        batch:'',
        payment:null,
        error: null,
        issub:null
    };
    const [data, setData] = useState(initialState);

    const { lastname, firstname, age, joiningdate,batch,error,mobilenumber } = data;

    const handle = (e) => {

        const { name, value } = e.target;
        setData({ ...data, [name]: value });

    }
    const handleNum = (e) => {

        const number = e.target.value;
        setNums(number);
    }

    const submit = (e) => {
        e.preventDefault();

        setData({ ...data, error: null,payment:'Not Done'});
        const num = users.filter((user)=> user.mobileNumber.includes(data.mobilenumber));
        
        if(num.length>0){
            seterror2('mobile number is already used.');
        }else{
            
            seterror2('');
            if (!firstname || !lastname || !age || !joiningdate || !batch ) {
            setData({ ...data, error: "All Fields are required" });
            } 
            else{
                setData({ ...data, error: "" });
                if(!validName.test(data.firstname)|| !validName.test(data.firstname)||(age > 65 || age < 18) || !validNum.test(data.mobilenumber)){
                    seterror1('Enter valid info ( Name should be in the alphabets,mobile number should be valid and age within the given limit.)');
                }else{
                    seterror1('');
                    setData({ ...data,issub:true });
        
                    const finalData=JSON.stringify({
                        id:uid,
                        mobileNumber:data.mobilenumber,
                        firstName:data.firstname,
                        lastName: data.lastname,
                        age: data.age,
                        joiningDate:data.joiningdate,
                        batch:data.batch,
                        payment:'NOT DONE'
                    });
                    axios.post("/user",
                    finalData,{headers:{
                        "Content-Type": "application/json"
                    }}
                    )
                }
            }
            
        } 
    }

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

    return (
        <div className="container">
            <div className="row justify-content-center">
                
                <form className="Form " onSubmit={submit}>
                    <br/>
                    {/* <h6>To check your payment status use payment id: {uid}</h6> */}
                    <div className="form-group my-2">
                        <label><h5>Enter Mobile number</h5><p color="gray">*This will be your identity*</p></label>
                        <input onChange={handle} type="number" className="form-control" value={data.mobilenumber} name="mobilenumber"  />
                    </div>
                    <div className="form-group my-2">
                        <label><h5>Enter Firstname</h5></label>
                        <input onChange={handle} type="text" className="form-control" value={data.firstname} name="firstname"  />
                    </div>
                    <div className="form-group">
                        <label><h5>Enter Lastname</h5></label>
                        <input onChange={handle} type="text" className="form-control" value={data.lastname} name="lastname"/>
                    </div>
                    <div className="form-group">
                        <label><h5>Enter Age</h5></label>
                        <input onChange={handle} type="number" className="form-control" value={data.age} name="age" />
                    </div>
                    <div className="form-group">
                        <label><h5>Enter Joining Date</h5></label>
                        <input onChange={handle} id="datefield"type="date" min={today} className="form-control" value={data.joiningdate} name="joiningdate" />
                    </div>
                    <div className="form-group">
                    <label><h5>Select batch</h5></label>
                    <select onChange={handle}
                        className="form-select" id="batch"name="batch">
                        <option defaultValue>Choose the batch</option>
                        <option value="6AM - 7AM">6AM - 7AM</option>
                        <option value="7AM - 8AM">7AM - 8AM</option>
                        <option value="8AM - 9AM">8AM - 9AM</option>
                        <option value="5PM - 6PM">5PM - 6PM</option>
                    </select>
                    </div>
                    <p><h6>Note:</h6>**Age should be between 18 to 65.**</p>
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    {error1 ? <p style={{ color: "red" }}>{error1}</p> : null}
                    {error2 ? <p style={{ color: "red" }}>{error2}</p> : null}
                    {data.issub?<>
                    <p style={{ color: "black" }}>Your data is submitted. Please click on the button to proceed with the payment.</p>
                    <Link to="/payment"state={{id:uid}} className="btn btn-dark mx-3">Proceed to pay</Link>
                    </>
                    :<button type="submit" className="btn btn-dark">Submit</button>}
                </form>
            </div>
        </div>
    );
}
