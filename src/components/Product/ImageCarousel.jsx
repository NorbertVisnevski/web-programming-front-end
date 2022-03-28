import { Carousel } from "react-bootstrap";
import { emptyImageUrl, imageUrl } from "../../services/api";
import './Carousel.css'

export default function ImageCarousel({images = []}){

    if(images.length > 1){
        return(
            <Carousel variant="dark" className="carousel-product-controls">
                {images.map(image=><Carousel.Item key={image}><img className="carousel-product-image" src={imageUrl+image} /></Carousel.Item>)}
            </Carousel>
        )
    }
    else if(images.length === 1) {
        return(
            <img className="carousel-product-image" src={imageUrl+images[0]} />
        )
    }
    else{
        return(
            <img className="carousel-product-image" src={emptyImageUrl} />
        )
    }
}