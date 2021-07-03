import React, { useState } from 'react'
import {Card, Tabs, Tooltip} from 'antd';
import {useHistory} from 'react-router-dom';
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';

const {TabPane} = Tabs;

const SingleProduct = ({product, onStarClick, star}) => {
    const [tooltip, setTooltip] = useState('Click to add');

    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    let history = useHistory();

    const {title, images, description, _id} = product;

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

    const handleAddToWishlist = e => {
        e.preventDefault();
        addToWishlist(product._id, user.token)
            .then(res => {
                toast.success('Agregado A Deseados');
                history.push('/user/wishlist');
            })
    }

    return (
        <>
            <div className="col-md-7">
                {
                    images && images.length ? (
                        <Carousel showArrows={true} autoPlay infiniteLoop>
                            {
                                images && images.map((i) => <img src={i.url} key={i.public_id} alt="" />)
                            }
                        </Carousel>
                    ) : (
                        <Card
                            cover={
                                <img 
                                    src={Laptop}
                                    className="mb-3 card-image"
                                    alt=""
                                />
                            }
                        >
                        </Card>
                    )
                }
                <Tabs type="card">
                    <TabPane tab="Descripcion" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="Mas" key="2">
                        Contactar a xxxxx xxxxx para mas informacion del producto.
                    </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                {
                    product && product.ratings && product.ratings.length > 0
                        ? showAverage(product)
                        : (<div className="text-center pt-1 pb-3">No Puntuado Todavia</div>)
                }
                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" /> <br /> Agregar al Carrito
                            </a>
                        </Tooltip>,
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info" />
                            <br />
                            Agregar A La Lista
                        </a>,
                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct
