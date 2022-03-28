

export default function hasRole(user, role="Admin"){
    if(!user){
        return false
    }
    return user.roles.includes(role)
}