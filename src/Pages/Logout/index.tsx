import { useCookies } from "react-cookie"

const Logout = () =>{
    const [,,removeCookies] = useCookies()
    removeCookies('auth')
    return <div></div>
}

export default Logout