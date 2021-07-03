import React from 'react'
import {Select} from 'antd';

const {Option} = Select;

const ProductUpdateForm = ({
    handleChange, 
    handleSubmit, 
    setValues,
    values, 
    handleCategoryChange,
    categories,
    subOptions,
    arrayOfSubIds,
    setArrayOfSubIds,
    selectedCategory
}) => {
    const {
        title, 
        description, 
        price, 
        category, 
        shipping, 
        quantity,
        colors, 
        brands, 
        color, 
        brand
    } = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Titulo</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange} 
                />
            </div>
            <div className="form-group">
                <label>Descripcion</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange} 
                />
            </div>
            <div className="form-group">
                <label>Precio</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange} 
                />
            </div>
            <div className="form-group">
                <label>Envio</label>
                <select 
                    name="shipping" 
                    className="form-control"
                    onChange={handleChange}
                    value={shipping === "Yes" ? 'Si' : 'No'}
                >
                    <option value="No">No</option>
                    <option value="Yes">Si</option>
                </select>
            </div>
            <div className="form-group">
                <label>Cantidad</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange} 
                />
            </div>
            <div className="form-group">
                <label>Color</label>
                <select 
                    name="color" 
                    className="form-control"
                    onChange={handleChange}
                    value={color}
                >
                    {colors.map(c => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Marca</label>
                <select 
                    name="brand" 
                    className="form-control"
                    onChange={handleChange}
                    value={brand}
                >
                    {brands.map(b => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Categoria</label>
                <select 
                    name="category" 
                    className="form-control"
                    onChange={handleCategoryChange} 
                    value={selectedCategory ? selectedCategory : category._id}
                >
                    {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}>
                        {c.name}
                    </option>))}
                </select>
            </div>
            <div>
                <label>Subcategoria</label>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Selecciona las opciones"
                    value={arrayOfSubIds}
                    onChange={(value) => setArrayOfSubIds(value)} 
                >
                    {subOptions.length && subOptions.map((s) => (
                        <Option key={s._id} value={s._id}>
                            {s.name}
                        </Option>
                    ))}
                </Select>
            </div>
            
            <br />
            <button className="btn btn-outline-info">Guardar</button>
        </form>
    )
}
    
export default ProductUpdateForm
