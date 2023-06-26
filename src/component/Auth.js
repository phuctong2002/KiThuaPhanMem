const { Outlet, Navigate } = require("react-router-dom")

const Auth = ()=>{
    const username = sessionStorage.getItem("username");
    if( username ){
        return <Outlet/>
    }
    return <Navigate to="/login"/>
}

export default Auth;