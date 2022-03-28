import {Card,Button,Badge, Stack, Col, InputGroup, FormControl} from 'react-bootstrap'
import './ProductCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart'
import toCurrency from '../../helpers/currencyFromater'
import { useNavigate } from 'react-router-dom'
import { emptyImageUrl, imageUrl } from '../../services/api'

export default function ProductCard({product}) {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const drawCategories = () => {
        const cutOffIndex = 3;
        return product.categories.map((category, index)=>{
            if(index < cutOffIndex)
                return <Badge className="category-badge" key={category.id} pill >{category.name}</Badge>
            if(index === cutOffIndex)
                return <Badge className="category-badge" key={category.id} pill>...</Badge>
        })
    }

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const handleProductDetails = () => {
        navigate("/product/" + product.id)
    }

    return(
        <Card className='product-card'>
        <Card.Img className="card-image" variant="top" src={product.images.length > 0 ? imageUrl+product.images[0] : emptyImageUrl} role='button' onClick={handleProductDetails}/>
        <Card.Body onClick={handleProductDetails} role='button'>
            <Card.Title className="card-title-box">{product.caption}</Card.Title>
            <Card.Subtitle className="card-title-box">
                {drawCategories()}
            </Card.Subtitle>
            <Card.Text className="description-area">
                {product.description}
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            <div className="vstack  align-items-flex-end">
                <div direction="horizontal" gap={2} className="hstack gap-2 card-actions">
                <Button variant="outline-dark active disabled">{toCurrency(product.price)}</Button>
                <Button disabled={product.stock <= 0} onClick={() => handleAddToCart(product)}>Add to cart  <FontAwesomeIcon icon="cart-shopping"/></Button>
                </div>
            </div>
        </Card.Footer>
        </Card>
    )
}