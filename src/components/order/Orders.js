import React from 'react'
import { CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';

const Orders = ({orders, handleStatusChange}) => {
    const showOrderInTable = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Color</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Envio</th>
                </tr>
            </thead>
            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i}>
                        <td><b>{p.product.title}</b></td>
                        <td>{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>{p.product.shipping === "Yes" ? (
                                <CheckCircleOutlined style={{ color: "green" }} />
                            ) : (
                                <CloseCircleOutlined style={{ color: "red" }} />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

    return (
        orders.map((order) => (
            <div key={order._id} className="row pb-5">
                <div className="btn btn-block bg-light">
                    <ShowPaymentInfo order={order} showStatus={false} />
                    <div className="row">
                        <div className="col-md-4">
                            Estado De Entrega
                        </div>
                        <div className="col-md-8">
                            <select 
                                onChange={e => handleStatusChange(order._id, e.target.value)}
                                className="form-control"
                                defaultValue={order.orderStatus}
                                name="status"
                            >
                                <option value="Not Processed">No Procesado</option>
                                <option value="Cash On Delivery">Pagar Al Delivery</option>
                                <option value="Processing">Procesando</option>
                                <option value="Dispatched">Despachado</option>
                                <option value="Cancelled">Cancelado</option>
                                <option value="Completed">Completado</option>
                            </select>
                        </div>
                    </div>

                </div>
                {showOrderInTable(order)}
            </div>
        ))
    )
}

export default Orders
