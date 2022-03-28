import { useEffect } from "react"
import { useState } from "react"
import { Col, Row } from "react-bootstrap"
import useFetch from "use-http"
import EditCategory from "../components/EditCategory/EditCategory"


export default function EditCategories(){

    const [categories, setCategories] = useState([])
    const {response,get} = useFetch()

    const getCategories = async () => {
        const data = await get("/category")
        if(response.ok){
            setCategories(data)
        }
    }

    useEffect(async()=>{
        getCategories()
    },[])

    return(
        <>
            <Row>
                <Col md="3 mb-5">
                 <EditCategory title="Add new Category" onAction={getCategories}/>
                </Col>
            </Row>
            <Row>
                {categories.map(category=><Col key={Math.random()} md="3"><EditCategory onAction={getCategories} category={category}/></Col>)}
            </Row>
        </>
    )
}