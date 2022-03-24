import { useEffect, useState, useCallback } from "react"
import { Form, Row, Col, InputGroup, Button, Container, Stack } from "react-bootstrap"
import { useFetch } from "use-http";
import { errorMessage } from "../../helpers/errorObjectParser";
import Select from 'react-select';

export default function EditProductFields({product, setProduct}){
    const [errors, setErrors] = useState()
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [newCategory, setNewCategory] = useState("")
    const {post, del, get, put, response} = useFetch();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(async()=>{
        const data = await get("category")
        if(response.ok)
        {
            setCategories(data.map(category=>{return{label:category.name, value:category.name}}))
        }
    },[])

    useEffect(()=>{
        if(product)
        {
            setSelectedCategories(product.categories.map(category=>{return{label:category.name, value:category.name}}))
        }
    },[product])

    const handleAddNewCategory = () => {
        const newC = newCategory.trim()
        if(newC !== "")
        {
            const category = {label:newC, value:newC}
            setSelectedCategories([...selectedCategories,category])
            setCategories([...categories,category])
        }
        setNewCategory("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const body = {
            id: product?.id,
            caption: form.caption.value.trim(),
            price: Number(form.price.value),
            stock: Number(form.stock.value),
            description: form.description.value.trim(),
            categories: selectedCategories.map(category=>{return{name:category.value}}),

        }
        let data = [];
        if(product){
            data = await put("product", body)
        }
        else{
            data = await post("product", body)
        }
        if(response.ok)
        {
            setErrors()
            console.log(data)
            setProduct(data)
        }
        else
        {
            console.log(data?.errors)
            setErrors(data?.errors)
        }
    }

    const handleDelete = async () => {
        await del("product/"+product.id)
        if(response.ok)
        {
            setProduct(undefined)
            setSelectedCategories([])
            forceUpdate()
        }
    }

    return(
        <Container>
            <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="caption">
                <Form.Label>Caption</Form.Label>
                <Form.Control
                    defaultValue={product?.caption}
                    isInvalid={errors?.Caption}
                    name="caption"
                    type="text"
                />
                <Form.Control.Feedback type="invalid">{errorMessage(errors?.Caption)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    defaultValue={product?.price}
                    isInvalid={errors?.Price}
                    name="price"
                    type="number"
                />
                <Form.Control.Feedback type="invalid">{errorMessage(errors?.Price)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                    defaultValue={product?.stock}
                    isInvalid={errors?.Stock}
                    name="stock"
                    type="number"
                />
                <Form.Control.Feedback type="invalid">{errorMessage(errors?.Stock)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    defaultValue={product?.description}
                    isInvalid={errors?.Description}
                    name="description"
                    as="textarea"
                    rows="5"
                    type="text"
                />
                <Form.Control.Feedback type="invalid">{errorMessage(errors?.Description)}</Form.Control.Feedback>
                </Form.Group>

            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="4">
                <Form.Label>Categories</Form.Label>
                <Select 
                    isMulti
                    placeholder=""
                    name="categories"
                    value={selectedCategories}
                    onChange={(selected)=>setSelectedCategories(selected)}
                    options={categories}/>
                <Form.Control isInvalid={errors?.Categories} style={{display:"none"}}/>
                <Form.Control.Feedback type="invalid">{errorMessage(errors?.Categories)}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
                <Form.Label>New Category</Form.Label>
                <Form.Control value={newCategory} onChange={(e)=>setNewCategory(e.target.value)}/>
                <Form.Control.Feedback type="invalid">{errorMessage(errors?.Categories)}</Form.Control.Feedback>
            </Form.Group>

            <Col md="4">
            <Button className="mb-2" style={{marginTop:32}} onClick={handleAddNewCategory}>
                Add new category
            </Button>
            </Col>

            </Row>
            <div className="hstack gap-3">
                <Button type="submit">Save product</Button>
                {product && <Button variant="danger" onClick={handleDelete}>Delete product</Button>}
            </div>
            </Form>
        </Container>
    )
}