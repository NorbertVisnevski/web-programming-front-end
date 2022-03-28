import { useEffect, useState } from "react"
import { Container, Pagination } from "react-bootstrap";
import useFetch from "use-http";
import ProductList from "../layout/ProductList/ProductList";

export default function ViewProducts() {

    const [products, setProducts] = useState([])
    const {get, response, cache } = useFetch()
    const [pagination, setPagination] = useState({currentPage: 1, itemsPerPage: 0, totalItems: 0, totalPages: 0})

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async (index = 1) => {
        cache.clear()
        const data = await get(`/product?pageNumber=${index}&pageSize=${30}`)
        if(response.ok)
        {
            setPagination(JSON.parse(response.headers.get("pagination")))
            setProducts(data)
        }
    }
    const handlePagination = (index) => {
        fetchData(index)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(<Pagination.Item key={i} active={pagination.currentPage === i} onClick={()=>handlePagination(i)}>{i}</Pagination.Item>);
    }
    return(
        <Container>
            <ProductList products={products}/>
            <div className="d-flex justify-content-center mt-3">
                <Pagination className="align-center">
                    {pages}
                </Pagination>
            </div>
        </Container>
        
    )
}