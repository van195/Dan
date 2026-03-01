import "./droopdown.scss";
import EditProfile from "../editProfile/editProfile";
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const Dropdown = ()=>{
   
const [openDrop, setDrop] = useState(false);

   return(
    <>
        <div className="dropdown">
            <ul className="the-list-of-dropdown">
            <button  onClick={() => setDrop(prev => !prev)}>Upload Profile</button>
                <button>Liked Posts</button>
                <button>Chat Setting</button>
            <button>Log out</button>
               
            </ul>
        </div>
        <div className="display-the-item-center">
            
              {
                        openDrop && <EditProfile setDrop={setDrop}/> 
                        }
        </div>
   </>
  
   )
}
export default Dropdown;