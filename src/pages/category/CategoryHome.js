import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/cards/ProductCard';
import { getCategory } from '../../functions/category';

const CategoryHome = ({match}) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug)
            .then(res => {
                setCategory(res.data.category);
                setProducts(res.data.products);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {
                        loading ? (
                            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                                Espere...
                            </h4>
                        ) : (
                            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                                {products.length} productos en la categoria {category.name}
                            </h4>
                        )
                    }
                </div>
            </div>
            <div className="row">
                {
                    products.map((p) => (
                        <div className="col" key={p._id}>
                            <ProductCard product={p} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryHome
