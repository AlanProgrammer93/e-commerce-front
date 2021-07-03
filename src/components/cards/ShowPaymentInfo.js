import React from 'react'

const ShowPaymentInfo = ({order, showStatus = true}) => {
    return (
        <div>
            <p>
                {/* <span>ID de Orden: {order.paymentIntent.id}</span>{" "}
                <span>
                    Monto: {" / "}
                    {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </span>{" / "}
                <span>Tipo De Moneda: {order.paymentIntent.currency.toUpperCase()}</span>{" / "}
                <span>Metodo: {order.paymentIntent.payment_method_types[0]}</span>{" / "}
                <span>Pago: {order.paymentIntent.status.toUpperCase()}</span>{" / "}
                <span>
                    Ordenado el: {" / "}
                    {new Date(order.paymentIntent.created * 1000).toLocaleString()}
                </span>{" / "}
                <br /> */}

                <span>ID de Orden: {order._id}</span>{" "}
                <span>
                    Monto: {" / "}
                    2000 (Dato Falso)
                </span>{" / "}
                <span>Tipo De Moneda: Dolar</span>{" / "}
                <span>Metodo: Tipo De Pago</span>{" / "}
                <span>Pago: Correcto</span>{" / "}
                <span>
                    Ordenado el: {" / "}
                    Fecha De Pago
                </span>{" / "}
                <br /> 
                {
                    showStatus && (
                        <span className="badge bg-primary text-white">
                            Estado: {order.orderStatus}
                        </span>
                    )
                }
            </p>
        </div>
    )
}

export default ShowPaymentInfo
