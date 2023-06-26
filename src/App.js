import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import { PublicRoute, PrivateRoute } from "./router";
import Auth from "./component/Auth";

function App() {
  return <Router>
    <Routes>
      {
        PublicRoute.map( (item, index)=>{
          const Page = item.component;
          const Layout = item.layout;
          return <Route key={index} path={item.path} element={<Layout><Page/></Layout>}/>
        })
      }
      <Route element={<Auth/>}>
        {
          PrivateRoute.map( (item, index)=>{
            const Layout = item.layout;
            const Page = item.component;
            return <Route key={index} path={item.path} element={<Layout><Page/></Layout>}></Route>
          })
        }
      </Route>
    </Routes>
  </Router>
}

export default App;
