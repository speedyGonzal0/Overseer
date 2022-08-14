import React from 'react'
import "./Request.css"
import { useState } from 'react';
import { Input,Textarea, Button, Radio } from "@nextui-org/react";

const Request = () => {

    const [costPerProduct, setcostPerProduct] = useState(0)
    const [totalCost, settotalCost] = useState(0)

  return (
    <main className='reqContainer'>
        <h1>Request Form</h1>
        <div className="reqForm">
            <div className="deptLeft">
                <Input required label="Title" width="100%"/>
                <Input required label="Due" type="date" width="100%"/>
                <Input required label="Color Code" width="100%"/>
                <Textarea required label="Description" width="100%" height="50%" rows={4}/>
            </div>
            <div className="deptRight">
                <Radio.Group label="Product Type" required orientation="horizontal" size="sm">
                    <Radio value="T-shirt">T-shirt</Radio>
                    <Radio value="Hoodie">Hoodie</Radio>
                    <Radio value="Sweater">Sweater</Radio>
                    <Radio value="Cardigan">Cardigan</Radio>
                </Radio.Group>
                <Radio.Group label="Size" required orientation="horizontal" size="sm">
                    <Radio value="XS">XS</Radio>
                    <Radio value="S">S</Radio>
                    <Radio value="M">M</Radio>
                    <Radio value="L">L</Radio>
                    <Radio value="XL">XL</Radio>
                    <Radio value="XXL">XXL</Radio>
                </Radio.Group>
                <Radio.Group label="Material" required orientation="horizontal" size="sm">
                    <Radio value="Cotton ">Cotton </Radio>
                    <Radio value="Denim ">Denim </Radio>
                    <Radio value="Polyester">Polyester</Radio>
                    <Radio value="Nylons ">Nylons </Radio>
                </Radio.Group>
                <Input required label="Quantity" width="100%" type="Number"/>
                <Button shadow color="primary">Calculate Price</Button>
                <p>Cost Per Product is <b>{costPerProduct} BDT</b> & Total Cost is <b>{totalCost} BDT</b></p>
            </div>
        </div>
        <Button shadow color="primary">Submit</Button>
    </main>
  )
}

export default Request