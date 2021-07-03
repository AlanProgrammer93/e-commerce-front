import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import { auth } from '../../firebase';
import {useSelector} from 'react-redux';

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) 
            history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('');
                setLoading(false);
                toast.success('Revisa tu email para restaurar tu contraseña');
                
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log('ERROR en recuperar contraseña');
            })
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (
                <h4 className="text-danger">Espere...</h4>
            ) : (
                <h4>Recuperar Contraseña</h4>
            )}

            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Escribe tu correo"
                    autoFocus 
                />
                <br />
                <button className="btn btn-raised" disabled={!email}>
                    Enviar
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword;
