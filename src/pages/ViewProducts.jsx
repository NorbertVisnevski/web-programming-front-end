import { useEffect, useState } from "react"
import { Container, Pagination } from "react-bootstrap";
import useFetch from "use-http";
import ProductFilter from "../components/ProductFilter/ProductFilter";
import ProductList from "../layout/ProductList/ProductList";

export default function ViewProducts() {

    const [products, setProducts] = useState([])
    const {get, response, cache } = useFetch()
    const [pagination, setPagination] = useState({currentPage: 1, itemsPerPage: 0, totalItems: 0, totalPages: 0})
    const [params, setParams] = useState(new URLSearchParams())

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async (index = 1, searchParams = params) => {
        cache.clear()
        const data = await get(`/product?pageNumber=${index}&pageSize=${24}&${searchParams.toString()}`)
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

    const handleOnFilter = async (params) => {
        await fetchData(1,params)
        setParams(params)
    }

    const handelOnClear = async () => {
        const newParams = new URLSearchParams()
        await fetchData(1,newParams)
        setParams(newParams)
    }

    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(<Pagination.Item key={i} active={pagination.currentPage === i} onClick={()=>handlePagination(i)}>{i}</Pagination.Item>);
    }
    return(
        <Container>
            <ProductFilter onFilter={handleOnFilter} onClear={handelOnClear}/>
            <ProductList products={products}/>
            <div className="d-flex justify-content-center mt-3">
                <Pagination className="align-center">
                    {pages}
                </Pagination>
            </div>
        </Container>
        
    )
}