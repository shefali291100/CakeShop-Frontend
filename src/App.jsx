import { Outlet } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";


function App(){
return (
    <>
    <Navbar/>
    
    <Outlet/>
    {/* TODO : Footer */}

    </>
);

}

export default App;