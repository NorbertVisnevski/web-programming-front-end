import { useState } from "react";
import { useEffect } from "react";
import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import useFetch from "use-http";
import Select from 'react-select';
import { useCallback } from "react";



export default function ProductFilter({onFilter, onClear}){

    const {response, get} = useFetch()
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    useEffect(async()=>{
        await get("/category")
        if(response.ok){
            setCategories(response.data)
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const params = new URLSearchParams()
        const max = form.max.value
        const min = form.min.value
        const order = form.order.value
        const stock = form.stock.checked
        if(max != "" && max != 0)
        {
            params.append("maxPrice",max)
        }
        if(min != "" && min != 0)
        {
            params.append("minPrice",min)
        }
        params.append("order",order)
        params.append("inStock",stock)
        selectedCategories.forEach(category=>params.append("category",category.value))
        onFilter(params)
    }

    const handleClear = () => {
        const inputs = document.querySelectorAll('#min, #max');
        setSelectedCategories([])
        inputs.forEach(input => {
          input.value = '';
        });
        document.querySelector('#order').value = "ascending"
        document.querySelector('#stock').checked = false
        onClear()
    }

    const options = categories.map(category=>{return{label:category.name,value:category.name}})

    return(
        <Accordion>
            <Accordion.Item eventKey={1}>
                <Accordion.Header>
                    Search filters
                </Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3" xs={1} sm={2} md={3} lg={3} xl={4}>
                        <Form.Group as={Col}  controlId="min">
                            <Form.Label>Min Price</Form.Label>
                            <Form.Control
                                name="min"
                                type="number"
                                min={0}
                            />
                        </Form.Group>
                        <Form.Group as={Col}  controlId="max">
                            <Form.Label>Max Price</Form.Label>
                            <Form.Control
                                name="max"
                                type="number"
                                min={0}
                            />
                        </Form.Group>
                        <Form.Group as={Col}  controlId="order">
                            <Form.Label>Order by</Form.Label>
                            <Form.Select
                                name="order"
                            >
                                <option value="ascending">Price ascending</option>
                                <option value="descending">Price descending</option>
                            </Form.Select>
                        </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group as={Col}  controlId="categories">
                            <Form.Label>Categories</Form.Label>
                            <Select 
                                closeMenuOnSelect={false}
                                isMulti
                                name="categories"
                                value={selectedCategories}
                                onChange={(selected)=>setSelectedCategories(selected)}
                                options={options}/>
                        </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="4" className="mt-3 d-inline" controlId="stock" >
                                <Form.Check type="checkbox" name="stock" label="Show only in stock" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col md="3" className="mt-2">
                                <Button type="submit" className="btn-block">
                                    Search
                                </Button>
                            </Col>
                            <Col md="3" className="mt-2">
                                <Button variant="secondary" onClick={handleClear} className="btn-block">
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}