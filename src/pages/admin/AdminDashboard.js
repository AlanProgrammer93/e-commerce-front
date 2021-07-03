import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changeStatus, getOrders } from '../../functions/admin';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadOrders = () => 
        getOrders(user.token).then(res => {
            setOrders(res.data);
        })

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token)
            .then(res => {
                toast.success('Estado Actualizado!');
                loadOrders();
            })
    }
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                
                <div className="col-md-10">
                    <h4>Dashboard</h4>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
