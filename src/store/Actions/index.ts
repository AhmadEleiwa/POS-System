export const addProduct = () =>{
    return {
        type:'ADD'
    }
}
export const removeProduct = (id:string) =>{
    return {
        type:'REMOVE',
        data:id
    }
}