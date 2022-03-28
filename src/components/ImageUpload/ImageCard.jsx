import { Button, Card } from "react-bootstrap";
import { imageUrl } from "../../services/api";


export default function ImageCard({imageId, onRemove}){
    return(
        <Card className="mb-3">
            <Card.Img src={imageUrl+imageId}/>
            <Card.Footer>
                <Button variant="danger" onClick={()=>onRemove(imageId)}>Delete</Button>
            </Card.Footer>
        </Card>
    )
}