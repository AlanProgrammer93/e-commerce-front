import React, { useState } from 'react'
import {Card, Tooltip} from 'antd';
import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

const {Meta} = Card;

const ProductCard = ({product}) => {
    const [tooltip, setTooltip] = useState('Click to add');

    const {title, description, images, slug, price} = product;

    //const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            // agregar producto a cart
            cart.push({
                ...product,
                count: 1,
            });
            // eliminar duplicados
            let unique = _.uniqWith(cart, _.isEqual);
            // guardar en local storage
            localStorage.setItem('cart', JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");

            // add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // mostrar side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    }

    return (
        <>
            {
                product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                ) : (
                    <div className="text-center pt-1 pb-3">No Puntuado Todavia</div>
                )
            }
            <Card
                cover={
                    <img 
                        src={images && images.length ? images[0].url : laptop}
                        style={{ height: "150px", objectFit: "cover" }}
                        className="p-1"
                        alt=""
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> Ver Producto
                    </Link>, 
                    <>
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger" /> <br />
                            {product.quantity < 1 ? "No Hay Stock" : "Agregar Al Carrito"}
                        </a>
                    </Tooltip>
                    </>
                ]}
            >
                <Meta 
                    title={`${title} - $${price}`} 
                    description={`${description && description.substring(0, 40)} ...`} 
                />
            </Card>
        </>
    )
}

export default ProductCard
