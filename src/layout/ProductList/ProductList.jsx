import { Col, Row } from "react-bootstrap";
import ProductCard from "../../components/ProductCard/ProductCard";


export default function ProductList({products}){
 return(
    <Row>
      {products.map(product=><Col xs="12" sm="6" lg="3" key={product.id}><ProductCard product={product}/></Col>)}
   </Row>
 )
}