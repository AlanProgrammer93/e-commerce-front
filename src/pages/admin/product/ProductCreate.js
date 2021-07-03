import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { createProduct } from '../../../functions/product';
import AdminNav from '../../../components/nav/AdminNav';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import {LoadingOutlined} from '@ant-design/icons';

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
    color: '',
    brand: '',
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    // redux
    const {user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadCategories = () => 
        getCategories().then((c) => setValues({...values, categories: c.data}));
    

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();

        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
            .then(res => {
                setSubOptions(res.data);
            });
        setShowSub(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }
   
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                   {loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Crear Producto</h4>}
                   <hr />
                   <div className="p-3">
                        <FileUpload 
                            values={values} 
                            setValues={setValues}
                            setLoading={setLoading} 
                        />
                   </div>
                   <ProductCreateForm 
                        handleChange={handleChange} 
                        handleSubmit={handleSubmit}
                        setValues={setValues}
                        values={values} 
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate
