import {Card,Button,Badge, Stack, Col, InputGroup, FormControl} from 'react-bootstrap'
import './ProductCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart'
import toCurrency from '../../helpers/currencyFromater'

export default function ProductCard({product}) {

    const dispatch = useDispatch()

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

    return(
        <Card className='product-card'>
        <Card.Img variant="top" src="https://thumbs.dreamstime.com/b/pizza-slice-1268733.jpg" />
        <Card.Body>
            <Card.Title>{product.caption}</Card.Title>
            <Card.Subtitle>
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
                <Button disabled={product.stock <= 0} onClick={() => handleAddToCart(product)}>Add to cart  <FontAwesomeIcon icon={faCartShopping}/></Button>
                </div>
            </div>
        </Card.Footer>
        </Card>
    )
}