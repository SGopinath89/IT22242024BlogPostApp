import { useContext, useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import {UserContext} from "../App"

const userAuthForm = ({ type }) =>{
    
    const authForm = useRef();
    let {userAuth: {acess_token},setUserAuth}=useContext(UserContext)
    
    console.log(acess_token);
     const userAuthThroughServer = (serverRoute,formData)=>{
        
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute,formData)
        .then(({ data }) =>{
            storeInSession("user",JSON.stringify(data))
            setUserAuth(data)
        })
        .catch(({response}) => {
            toast.error(response.data.error)
        })
        
    }

    
    const handleSubmit = (e)=> {
        e.preventDefault();

        let serverRoute = type == "sign-in" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        
        let form = new FormData(authForm.current);
        let formData = {};

        for(let [key,value] of form.entries()){
            formData[key] = value;
        }
        let { fullname, email, password} = formData;


        if(fullname){
            if(fullname.length <3){
                return toast.error("Fullname must be at least 3 letters long")
            }
        }
       
    
        if(!email.length){
            return toast.error("Enter email")
        }
    
        if(!emailRegex.test(email)){
            return toast.error("Email is invalid")
        }
    
        if(!passwordRegex.test(password)){
            return toast.error("Password should be 6 to 20 characters long with a nummeric, 1 lowercase and 1 uppercase")
        }

        userAuthThroughServer(serverRoute,formData);
    }
    return( 
        <AnimationWrapper keyValue={type}>
            <section className="h-cover flex items-center justify-center">
            <Toaster />
            <form  className="w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasion capitalize text-center
                mb-24">
                {type =="sign-in" ? "Welcome back":"Join us today"}
                </h1>

                {
                    type != "sign-in" ? 
                    <InputBox 
                        name="fullname"
                        type="text"
                        placeholder="Full name"
                        icon ="fi-rr-circle-user"
                    />
                    :""
  
                }

                    <InputBox 
                        name="email"
                        type="email"
                        placeholder="Email"
                        icon ="fi-rr-envelopes"
                    />

                    <InputBox 
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon ="fi-rr-key"
                    />

                    <button
                        className="btn-dark center mt-14"
                        type ="submit"
                        onClick={handleSubmit}
                    >
                        {type.replace("-"," ")}
                    </button>

                    <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black"/>
                        <hr className="w-1/2 border-black"/>
                    </div>

                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                        <img src={googleIcon} className="w-5"/>
                        Continue with google
                    </button>

                    {
                        type == "sign-in" ? 
                        <p className="mt-6 text-darj-grey txlt-xl text-center">
                            Don't have an account ?
                            < Link to="/signup"  className="underline text-black text-xl ml-1">
                                Join Us today
                            </Link>
                        </p>

                        :
                        <p className="mt-6 text-darj-grey txlt-xl text-center">
                            Alreadya memeber ?
                            < Link to="/signin"  className="underline text-black text-xl ml-1">
                                Sign in here
                            </Link>
                        </p>

                    }
            </form>   
            </section>
        </AnimationWrapper>
    )
}

export default userAuthForm;
