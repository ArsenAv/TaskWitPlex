import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { sendRegistrDataThunk ,sendLoginDataThunk } from '../redux/userSlice'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'



export const AuthPage = () =>{
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: "", password: ""
    });

     const formHandler = event =>{
         setForm({...form, [event.target.name]: event.target.value})
     }

     const registerHandler = () =>{
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
         if(!{...form}.email.length < 0 || !{...form}.email.match(mailformat)){
             alert("mail is incorrect")
         }
         else if({...form}.password.length < 5){
             alert("It must contain not less than 5 symbols")
         }
            dispatch(sendRegistrDataThunk({...form}.email, {...form}.password))
     }
     const loginHandler = () =>{
        dispatch(sendLoginDataThunk({...form}.email, {...form}.password))
     }

    return(
    <div  className = "auth" > 
    <div>
    <Form className = "form-inline" >  
        <Form.Group className="mb-3 " >
            <Form.Label htmlFor ="email">Email</Form.Label>
            <Form.Control className = "forminput"value={form.email} placeholder ="" name = "email" type="text" onChange = {formHandler}  />
    
         </Form.Group>
        <Form.Group className="mb-3">
             <Form.Label htmlFor="email">Password</Form.Label>
             <Form.Control placeholder ="" className = "forminput " type="password" value={form.password} name = "password" onChange = {formHandler} />
         <Button variant="outline-secondary" className = "btnout2" onClick = {loginHandler}>
                 Login 
         </Button>
         <Button variant="outline-secondary"  className = "btnout1" onClick = {registerHandler}>
              
                 Register
         </Button>
        </Form.Group>
    </Form>
    </div>
    </div>
    )
}