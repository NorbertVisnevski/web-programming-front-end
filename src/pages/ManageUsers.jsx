import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import ManageUsersList from "../components/ManageUsersList/ManageUsersList";
import { selectUser } from "../redux/user";


export default function ManageUsers(){

    const [users, setUsers] = useState([])
    const {response,get,del} = useFetch()
    const user = useSelector(selectUser)
    useEffect(async()=>{
        const data = await get("/user")
        if(response.ok){
            setUsers(data)
        }
    },[])

    const handleOnRemove = async (user) => {
        const data = await del("/user/"+user.id)
        if(response.ok){
            setUsers(users.filter(x => x.id !== user.id))
        }
    }

    return(
        <ManageUsersList users={users} onRemove={handleOnRemove}/>
    )
}