import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
	const navigate = useNavigate();
	useEffect(() => {
	    // Checking if user is not loggedIn
		document.title = 'Admin - Home';
	    navigate("/featured");
	  }, [navigate]);	
}

export default AdminHome;