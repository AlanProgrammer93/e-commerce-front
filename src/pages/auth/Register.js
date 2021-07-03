import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { auth } from '../../firebase';

const Register = ({history}) => {
    const [email, setEmail] = useState("");

    const {user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) 
            history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Te enviamos un email a ${email} para completar tu registro.`);

        window.localStorage.setItem('emailForRegistration', email);

        setEmail("");
    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)} 
                placeholder="Tu Email"
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-raised">Registrar</button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Registrarse</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register
