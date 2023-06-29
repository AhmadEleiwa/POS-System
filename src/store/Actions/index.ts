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
export const addCategory = (name:string )=>{
    return {
        type:'ADD',
        data:name
    }
}

export const updateCategory = (name:string, newName:string )=>{
    return {
        type:'UPDATE',
        data:{name:name,newName:newName         }
    }
}
export const removeCategory = (name:string )=>{
    return {
        type:'REMOVE',
        data:name
    }
}