import Head from "next/head";
import Link from "next/link";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const Account = () => {

    const {user, logoutUser} = useContext(AuthContext)
    
    if (!user){
        return (
            <div>
                <p>Please login or register</p>
                <Link href={'/'}><a>Go Back</a></Link>
            </div> 
        )
    }

    return (
        <div>
            <Head><title>Account</title></Head>
            <h2>Account Page</h2>
            <p>Logged in as: {user.email}</p>
            <a href="#" onClick={logoutUser}>Logout</a>

        </div>
    );
};

export default Account;
