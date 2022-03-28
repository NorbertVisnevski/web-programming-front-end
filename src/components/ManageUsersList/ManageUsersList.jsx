import { Button, Container, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { selectUser } from "../../redux/user"


export default function ManageUsersList({users, onRemove}){

    const loggedInUser = useSelector(selectUser)
    const navigate = useNavigate()

    return(
        <>
        <Container className="p-0">
        <div className="card">
        <Table bordered className="mb-0">
        <thead>
            <tr>
            <th>#</th>
            <th>User id</th>
            <th>Email</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody className="align-items-center">
            {users.map((user,index)=>{return(
                <tr key={user.id}>
                <td style={{maxWidth:"1rem"}}>{index}</td>
                <td style={{maxWidth:"1rem"}}>{user.id}</td>
                <td style={{maxWidth:"10rem"}}>{user.email}</td>
                <td style={{maxWidth:"10rem"}}>
                    <Button className="m-1" onClick={()=>navigate("/user-orders/"+user.id)}>Orders</Button>
                    <Button className="m-1" variant="danger" onClick={()=>onRemove(user)} disabled={user.id === 1 || loggedInUser.id === user.id}>Remove</Button>
                </td>
                </tr>
            )})}
        </tbody>
        </Table>
        </div>
        </Container>
        </>
    )
}