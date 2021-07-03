import React from 'react'
import {Select} from 'antd';

const {Option} = Select;

const ProductCreateForm = ({
    handleChange, 
    handleSubmit, 
    setValues,
    values, 
    handleCategoryChange,
    subOptions,
    showSub
}) => {
    const {
        title, 
        description, 
        price, 
        categories, 
        subs, 
        quantity, 
        colors, 
        brands, 
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
                >
                    <option>Selecciona una opcion</option>
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
                >
                    <option>Selecciona una opcion</option>
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
                >
                    <option>Selecciona una opcion</option>
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
                >
                    <option>Seleccione una opcion</option>
                    {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}>
                        {c.name}
                    </option>))}
                </select>
            </div>
            
            {
                showSub && (
                    <div>
                        <label>Subcategoria</label>
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Selecciona las opciones"
                            value={subs}
                            onChange={(value) => setValues({ ...values, subs: value })} 
                        >
                            {subOptions.length && subOptions.map((s) => (
                                <Option key={s._id} value={s._id}>
                                    {s.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )
            }
            <br />
            <button className="btn btn-outline-info">Guardar</button>
        </form>
    )
}
    
export default ProductCreateForm
