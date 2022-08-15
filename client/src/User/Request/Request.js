import React from 'react'
import "./Request.css"
import { useState } from 'react';
import { Input,Textarea, Button, Radio } from "@nextui-org/react";

const Request = () => {

    const [costPerProduct, setcostPerProduct] = useState(0)
    const [totalCost, settotalCost] = useState(0)
    const [date, setDate] = useState()
    const [product, setProduct] = useState(" ")
    const [material, setMaterial] = useState(" ")
    const [size, setSize] = useState(" ")
    const [quantity, setQuantity] = useState(" ")
    const [color, setColor] = useState()
    const [description, setDescription] = useState()
    const [title, setTitle] = useState(" ")
    const [helperText, setHelperText] = useState(" ")
    const [disabled, setDisabled] = useState(true)
    const [pIndex, setpIndex] = useState()
    const [mIndex, setmIndex] = useState()


    const quantityHandler = (e) => {
        let q = e.target.value
        if( q < 100){
            setHelperText("Minimum quantity is 100")
            setDisabled(true)
        }
        else{
            setQuantity(q)
            setHelperText(" ")
            setDisabled(false)
        }
    }

    // const productPrices = [{"T-shirt":100}, {"Hoodie":200}, {"Sweater":250}, {"Cardigan":400}]
    // const materialPrices = [10, 50, 30, 40]

    const productPrices = [{name: "T-shirt", price:100}, {name: "Hoodie", price:200}, {name: "Sweater", price:250}, {name: "Cardigan", price:400}]
    const materialPrices = [{material: "Cotton", price: 10}, {material: "Denim", price: 50}, {material: "Polyester", price:30}, {material: "Nylon", price: 40}]

    const priceCalculator = () => {
        // console.log(product)
        // console.log(material)
        // console.log(quantity)
        // let a = product
        // console.log(productPrices.)
        // switch(product){
        //     case "T-Shirt": console.log("T-shirt"); break;
        //     case "Hoodie": console.log("Hoodie"); break;
        //     default: console.log("here")
        // }
       let tempProduct =  productPrices.filter( item => {
            if(item.name === product) {return item.price}
        })
        let tempMat =  materialPrices.filter( item => {
            if(item.material === material) {return item.price}
        })
       setcostPerProduct(tempProduct[0].price + tempMat[0].price)
    //    console.log(costPerProduct)
    //    console.log(quantity)
    // //    settotalCost(costPerProduct)
        
    }


  return (
    <main className='reqContainer'>
        <h1>Order Request Form</h1>
        <div className="reqForm">
            <div className="deptLeft">
                <Input required label="Title" width="100%" onChange={(e) => setTitle(e.target.value)}/>
                <Input required label="Due" type="date" width="100%" onChange={(e) => setDate(e.target.value)}/>
                <Input required label="Hex Color Code" width="100%" onChange={(e) => setColor(e.target.value)}/>
                <Textarea required label="Description" width="100%" height="50%" rows={4} onChange={(e) => setDescription(e.target.value)}/>

            </div>
            <div className="deptRight">
                <Radio.Group label="Product Type" onChange={setProduct} required orientation="horizontal" size="sm">
                    <Radio value="T-shirt">T-shirt</Radio>
                    <Radio value="Hoodie">Hoodie</Radio>
                    <Radio value="Sweater">Sweater</Radio>
                    <Radio value="Cardigan">Cardigan</Radio>
                </Radio.Group>
                <Radio.Group label="Size" onChange={setSize} required orientation="horizontal" size="sm">
                    <Radio value="XS">XS</Radio>
                    <Radio value="S">S</Radio>
                    <Radio value="M">M</Radio>
                    <Radio value="L">L</Radio>
                    <Radio value="XL">XL</Radio>
                    <Radio value="XXL">XXL</Radio>
                </Radio.Group>
                <Radio.Group label="Material" onChange={setMaterial} required orientation="horizontal" size="sm">
                    <Radio value="Cotton">Cotton </Radio>
                    <Radio value="Denim">Denim </Radio>
                    <Radio value="Polyester">Polyester</Radio>
                    <Radio value="Nylon">Nylon </Radio>
                </Radio.Group>
                <Input required label="Quantity" helperText={helperText} onChange={(e) => quantityHandler(e)} width="100%" type="Number"/>
                <Button shadow color="primary" onClick={priceCalculator} disabled={disabled}>Calculate Price</Button>
                <p>Cost Per Product is <b>{costPerProduct} BDT</b> & Total Cost is <b>{costPerProduct * quantity} BDT</b></p>
            </div>
        </div>
        <Button shadow color="primary" disabled={disabled}>Submit</Button>
    </main>
  )
}

export default Request