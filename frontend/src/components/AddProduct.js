import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

function AddProduct() {
    const [SKU, setSKU] = useState("");
    const [Name, setName] = useState("");
    const [Price, setPrice] = useState("");
    const [Size, setSize] = useState(null);
    const [Type, setType] = useState("");
    const [Dimensions, setDimensions] = useState(null);
    const [Weight, setWeight] = useState(null);
    const [Width, setWidth] = useState("");
    const [Height, setHeight] = useState("");
    const [Length, setLength] = useState("");
    const [Types, setTypes] = useState([]);
    const action = "add";

    useEffect(() => {
        if (Types.length !== 0) return;

        (async () => {
            const response = await fetch('http://localhost/junior-web-test/productAPIs.php?action=get_types');
            const types = await response.json();

            setTypes(types);
        })();
    }, [Types]);

    useEffect(() => {
        setDimensions(`${Height}X${Length}X${Width}`);
    }, [Height, Length, Width]);

    const onSubmit = (e) => {
        e.preventDefault();



        const formdata = new FormData();
        let data = {
            name: Name,
            price: Price,
            size: Size,
            dimensions: Dimensions,
            weight: Weight,
            type: Type,
            action: 'add'
        }
        for (let key in data) {
            formdata.append(key, data[key])
        }

        axios({
            method: "post",
            url: "http://localhost/junior-web-test/productAPIs.php",
            data: formdata
        }).then(function (response) {
            console.log(data);
            console.log(response);
            window.location = '/';
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <form action='' className='addProductForm' onSubmit={onSubmit}>
            <div className='addProductContainer'>
                <label htmlFor="Name">Name: </label>
                <input type="text" name="Name" id="Name" className='inp'
                    placeholder='Product Name'
                    onChange={e => setName(e.target.value)} />
            </div>
            <div className='addProductContainer'>
                <label htmlFor="Price">Price: </label>
                <input type="text" name="Price" id="Price" className='inp'
                    placeholder='Product Name'
                    onChange={e => setPrice(e.target.value + 'usd')} />
            </div>
            <div className='productType'>
                <label htmlFor="type">Type: </label>
                <select
                    name="Type"
                    id="type"
                    className="type"
                    value={Type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="" disabled>Select Type</option>
                    {Types.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {Type === "Book" ?
                    <div>
                        <label htmlFor="">Weight: </label>
                        <input type="number" className='inp'
                            onChange={e => setWeight(e.target.value + 'Kg')}
                        />
                    </div>
                    : Type === "DVD" ?
                        <div>
                            <label htmlFor="">ٍSize: </label>
                            <input type="number" className='inp'
                                onChange={e => setSize(e.target.value + 'mb')}
                            />
                        </div>
                        : Type === "Furniture" ?
                            <div>
                                <label htmlFor="">Height: </label>
                                <input type="number" className='inp'
                                    onChange={e => setHeight(e.target.value)}
                                />
                                <label htmlFor="">Length: </label>
                                <input type="number" className='inp'
                                    onChange={e => setLength(e.target.value)}
                                />
                                <label htmlFor="">Width: </label>
                                <input type="number" className='inp'
                                    onChange={e => setWidth(e.target.value)}
                                />
                            </div>
                            : null}
            </div>
            <input type="submit" value=" +Add+" className="btn btn-block" />
        </form>
    )
}

export default AddProduct;
