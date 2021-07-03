import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout';
import { userCart } from '../functions/user';

const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const saveOrderToDB = () => {
        userCart(cart, user.token)
            .then(res => {
                if (res.data.ok) history.push('/checkout');
            })
            .catch(err => console.log(err));
    }

    const saveCashOrderToDB = () => {
        dispatch({
            type: "COD",
            payload: true
        });
        userCart(cart, user.token)
            .then(res => {
                if (res.data.ok) history.push('/checkout');
            })
            .catch(err => console.log(err));
    }

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Imagen</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Color</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Envío</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            {
                cart.map(p => (
                    <ProductCartInCheckout key={p._id} p={p} />
                ))
            }
        </table>
    )

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h4>Carrito / {cart.length} productos</h4>

                    {
                        !cart.length ? (
                            <p>
                                No hay productos en el carrito. <Link to="/shop">Ir a ver productos.</Link>
                            </p>
                        ) : (
                            showCartItems()
                        )
                    }
                </div>
                <div className="col-md-4">
                    <h4>Ordenes</h4>
                    <hr />
                    <p>Productos</p>
                    {
                        cart.map((c, i) => (
                            <div key={i}>
                                <p>{c.title} x {c.count} = ${c.price * c.count}</p>
                            </div>
                        ))
                    }
                    <hr />
                    Total: <b>${getTotal()}</b>
                    <hr />
                    {
                        user ? (
                            <>
                                <button 
                                    onClick={saveOrderToDB} 
                                    className="btn btn-sm btn-primary mt-2"
                                    disabled={!cart.length}
                                >
                                    Pasar Por Caja
                                </button>
                                <br />
                                <button 
                                    onClick={saveCashOrderToDB} 
                                    className="btn btn-sm btn-warning mt-2"
                                    disabled={!cart.length}
                                >
                                    Pagar Contra Reembolso
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-sm btn-primary mt-2">
                                <Link
                                    to={{
                                        pathname: "/login",
                                        state: { from: "cart" }
                                    }}
                                >
                                    Iniciar Sesion Para Pagar
                                </Link>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart
