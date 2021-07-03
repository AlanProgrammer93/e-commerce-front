import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import { auth } from '../../firebase';
import {useDispatch} from 'react-redux';
import {createOrUpdateUser} from '../../functions/auth';


const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    //const {user} = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Email y contraseña son requeridos');
            return;
        }

        if (password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            
            if (result.user.emailVerified) {
                window.localStorage.removeItem('emailForRegistration');

                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                
                createOrUpdateUser(idTokenResult.token)
                .then(
                    res => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id
                            }
                        });
                    }
                )
                .catch(err => console.log(err));

                history.push('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                className="form-control"
                value={email}
                disabled
            />

            <input 
                type="password" 
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder="Contraseña"
            />
            <br />
            <button type="submit" className="btn btn-raised">Confirmar</button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Completar Registro</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
