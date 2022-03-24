export function errorMessage(error){
    if(error)
        return error[0]
    return undefined
}