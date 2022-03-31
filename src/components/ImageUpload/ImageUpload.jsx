import { Col, Form, Row } from "react-bootstrap"
import useFetch from "use-http";
import { useState } from 'react';
import { imageUrl } from '../../services/api';
import ImageCard from "./ImageCard";


export default function ImageUpload({product}){

    const { response, post, del} = useFetch()
    const [ error, setError] = useState()
    const [ images, setImages] = useState(product.images)

    const handleUpload = async (event) => {
        const files = event.target.files;
        if(files.lenght === 0){
            return;
        }
        const formData = new FormData();
        for(let i = 0; i < files.length; ++i){
            formData.append('files', files[i]);
        }
        const data = await post("/image?productId="+product.id,formData)
        if(response.ok){
            setImages(data)
            setError()
        }
        else{
            setError(data)
        }
    }

    const handleDelete = async (imageId) => {
        await del("/image/"+imageId)
        if(response.ok){
            setImages(images.filter(image => image !== imageId))
        }
    }

    return(
        <>
        <Form className="mt-3">
            <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Product images</Form.Label>
            <Form.Control isInvalid={error} accept="image/*" name="files[]" onChange={handleUpload} type="file" multiple />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
        </Form>
        <Row>
            {images.map(image=>{
                return(
                    <Col md="4" key={image}>
                        <ImageCard imageId={image} onRemove={handleDelete}/>
                    </Col>
                )
            })}
        </Row>
        </>
    )
}