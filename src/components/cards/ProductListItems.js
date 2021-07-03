import React from 'react'
import { Link } from 'react-router-dom';

const ProductListItems = ({product}) => {
    const {price, category, subs, shipping, color, brand, quantity, sold} = product;

    return (
        <ul className="list-group">
            <li className="list-group-item">
                Precio {" "}
                <span className="label label-default label-pill pull-xs-right">
                    $ {price}
                </span>
            </li>
            {
                category && (
                    <li className="list-group-item">
                        Categoria {" "}
                        <Link 
                            to={`/category/${category.slug}`} 
                            className="label label-default label-pill pull-xs-right"
                        >
                            {category.name}
                        </Link>
                    </li>
                )
            }
            {
                subs && (
                    <li className="list-group-item">
                        Sub Categoria
                        {
                            subs.map(s => (
                                <Link 
                                    key={s._id}
                                    to={`/sub/${s.slug}`} 
                                    className="label label-default label-pill pull-xs-right"
                                >
                                    {s.name}
                                </Link>
                            ))
                        }
                    </li>
                )
            }
            <li className="list-group-item">
                Envío {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {shipping}
                </span>
            </li>
            <li className="list-group-item">
                Color {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {color}
                </span>
            </li>
            <li className="list-group-item">
                Marca {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {brand}
                </span>
            </li>
            <li className="list-group-item">
                Disponibles {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {quantity}
                </span>
            </li>
            <li className="list-group-item">
                Vendidos {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {sold}
                </span>
            </li>
        </ul>
    )
}

export default ProductListItems
