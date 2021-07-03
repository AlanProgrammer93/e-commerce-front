import React from 'react'
import {Drawer} from 'antd';
import laptop from '../../images/laptop.png';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const SideDrawer = () => {
    const dispatch = useDispatch();
    const {drawer, cart} = useSelector((state) => ({ ...state }));

    const imageStyle = {
        width: '100%',
        height: '50px',
        objectFit: 'cover'
    }

    return (
        <Drawer 
            className="text-center"
            title={`Carrito / ${cart.length} Producto`}
            placement="right"
            closable={false}
            onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                })
            }} 
            visible={drawer}
        >
            {
                cart.map(p => {
                    <div key={p._id} className="row">
                        <div className="col">
                            {
                                p.images[0] ? (
                                    <>
                                        <img src={p.images[0].url} style={imageStyle} alt="" />
                                        <p className="text-center bg-secondary text-light">
                                            {p.title} x {p.count}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <img src={laptop} style={imageStyle} alt="" />
                                        <p className="text-center bg-secondary text-light">
                                            {p.title} x {p.count}
                                        </p>
                                    </>
                                )
                            }
                        </div>
                    </div>
                })
            }
            <Link to="/cart">
                <button 
                    className="text-center btn btn-primary btn-raised btn-block"
                    onClick={() =>
                        dispatch({
                            type: "SET_VISIBLE",
                            payload: false,
                        })
                    }    
                >
                    Ir al Carrito
                </button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer
