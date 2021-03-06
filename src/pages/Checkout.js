import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
    applyCoupon, 
    createCashOrderForUser, 
    emptyUserCart, 
    getUserCart, 
    saveUserAddress 
} from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Checkout({ history }) {
    const dispatch = useDispatch();
    const { user, COD } = useSelector((state) => ({ ...state }));
    const couponTrueOrFalse = useSelector((state) => state.coupon);

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');
    
    useEffect(() => {
        getUserCart(user.token)
            .then(res => {
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveAddressToDb = () => {
        saveUserAddress(user.token, address)
            .then(res => {
                if (res.data.ok) {
                    setAddressSaved(true);
                    toast.success('Direccion Guardada');
                }
            })
    }

    const applyDiscountCoupon = () => {
        applyCoupon(user.token, coupon)
            .then(res => {
                if (res.data) {
                    setTotalAfterDiscount(res.data)
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: true
                    });
                }

                if (res.data.err) {
                    setDiscountError(res.data.err);
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false
                    });
                }
            })
    }

    const emptyCart = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('cart');
        }

        dispatch({
            type: 'ADD_TO_CART',
            payload: []
        });

        emptyUserCart(user.token)
            .then(res => {
                setProducts([])
                setTotal(0)
                setTotalAfterDiscount(0)
                setCoupon('')
                toast.success("El carrito esta vacio.");
            });
    }

    const showAddress = () => (
        <>
            <ReactQuill 
                theme="snow" 
                value={address}
                onChange={setAddress}
            />
            <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
                Guardar
            </button>
        </>
    )

    const showProductSummary = () => 
        products.map((p, i) => (
            <div key={i}>
                <p>{p.product.title} ({p.color}) x {p.count} = {" "} {p.product.price * p.count}</p>
            </div>
        ))

    const showApplyCoupon = () => {
        <>
            <input
                onChange={e => {
                    setCoupon(e.target.value);
                    setDiscountError('');
                }} 
                value={coupon}
                type="text"
                className="form-control"
            />
            <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2"></button>
        </>
    }

    const createCashOrder = () => {
        createCashOrderForUser(user.token, COD, couponTrueOrFalse)
            .then(res => {
                if (res.data.ok) {
                    if (typeof window !== 'undefined') localStorage.removeItem('cart');

                    dispatch({
                        type: "ADD_TO_CART",
                        payload: [],
                    });

                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: false,
                    });

                    dispatch({
                        type: "COD",
                        payload: false,
                    });

                    emptyUserCart(user.token);

                    setTimeout(() => {
                        history.push('/user/history');
                    }, 1000);
                }
            })
    }
    
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Direccion de entrega</h4>
                <br/>
                <br/>
                {showAddress()}
                <hr />
                <h4>Tienes Cup??n?</h4>
                <br/>
                {showApplyCoupon()}
                <br/>
                {discountError && <p className="bg-danger p-2">{discountError}</p>}
            </div>

            <div className="col-md-6">
                <h4>Detalle del pedido</h4>
                <hr />
                <p>Productos {products.length}</p>
                <hr />
                {showProductSummary()}
                <hr />
                <p>Total: ${total}</p>

                {totalAfterDiscount > 0 && (
                    <p className="bg-success p-2">
                        Descuento aplicado: Total a pagar ${totalAfterDiscount}
                    </p>
                )}

                <div className="row">
                    <div className="col-md-6">
                        {
                            COD ? (
                                <button 
                                    className="btn btn-primary" 
                                    disabled={!addressSaved || !products.length}
                                    onClick={createCashOrder}
                                >
                                    Realizar Pedido
                                </button>
                            ) : (
                                <button 
                                    className="btn btn-primary" 
                                    disabled={!addressSaved || !products.length}
                                    onClick={() => history.push('/payment')}
                                >
                                    Realizar Pedido
                                </button>
                            )
                        }
                    </div>

                    <div className="col-md-6">
                        <button 
                            disabled={!products.length} 
                            onClick={emptyCart} 
                            className="btn btn-primary"
                        >
                            Carrito Vacio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
