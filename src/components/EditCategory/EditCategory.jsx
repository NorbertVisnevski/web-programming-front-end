import { useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import useFetch from "use-http";
import { errorMessage } from "../../helpers/errorObjectParser";


export default function EditCategory({title = "", category, onAction = () => {}}){
    
    const [errors, setErrors] = useState()
    const [name, setName] = useState(category?.name)

    const {response, del, put, post} = useFetch()

    const handleDelete = async () => {
        await del("/category/"+category.id)
        if(response.ok){
            onAction()
        }
    }

    const handleUpdate = async () => {
        let data
        if(category){
            data = await put("/category",{id:category.id,name:name})
        }
        else{
            data = await post("/category",{name})
        }
        if(response.ok){
            onAction()
        }else{
            setErrors(data?.errors)
        }
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }

    return(
        <Card>
            <Card.Title className="p-2 text-center">{title}</Card.Title>
            <Card.Body>
            <Form onSubmit={(e)=>{e.preventDefault()}}>
                <Form.Group controlId="cat">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    isInvalid={errors?.name || errors?.Name}
                    name="name"
                    type="text"
                    value={name}
                />
                <Form.Control.Feedback type="invalid">{errorMessage(errors?.Name) ? errorMessage(errors?.Name) : errorMessage(errors?.name)}</Form.Control.Feedback>
                </Form.Group>
            </Form>
            </Card.Body>
            <Card.Footer className="hstack gap-1">
                <Button disabled={name===category?.name} onClick={handleUpdate}>Save changes</Button>
                {category && <Button variant="danger" onClick={handleDelete}>Delete</Button>}
            </Card.Footer>
        </Card>
    )
}