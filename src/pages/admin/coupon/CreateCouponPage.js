import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import { createCoupon, getCoupons, removeCoupon } from '../../../functions/coupon';

const CreateCouponPage = () => {
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState('');
    const [coupons, setCoupons] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getCoupons().then((res) => setCoupons(res.data));
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        createCoupon({name, expiry, discount}, user.token)
            .then(res => {
                setLoading(false);
                getCoupons().then((res) => setCoupons(res.data));
                setName('');
                setDiscount('');
                setExpiry('');
                toast.success(`"${res.data.name}" está creado`);
            })
            .catch(err => console.log("Error al crear cupón", err));
    }

    const handleRemove = (couponId) => {
        if (window.confirm('Eliminar?')) {
            setLoading(true);
            removeCoupon(couponId, user.token)
                .then(res => {
                    getCoupons().then((res) => setCoupons(res.data));
                    setLoading(false);
                    toast.error(`Cupón "${res.data.name}" eliminado.`);
                })
                .catch(err => console.log(err));
        }
    }   

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {
                        loading ? (
                            <h4 className="text-danger">Espere...</h4>
                        ) : (
                            <h4>Cupón</h4>
                        )
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Nombre</label>
                            <input 
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Descuento %</label>
                            <input 
                                type="text"
                                className="form-control"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Expiracion</label>
                            <br />
                            <DatePicker 
                                className="form-control"
                                selected={expiry ? new Date(expiry) : new Date()}
                                value={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                            />
                        </div>
                        <button className="btn btn-outline-primary">Guardar</button>
                    </form>
                    <br />
                    <h4>{coupons.length} Cupones</h4>
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Expiracion</th>
                                <th scope="col">Descuento</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                coupons.map(c => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>{new Date(c.expiry).toLocaleDateString}</td>
                                        <td>{c.discount}%</td>
                                        <td>
                                            <DeleteOutlined 
                                                className="text-danger pointer"
                                                onClick={() => handleRemove(c._id)} 
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage
