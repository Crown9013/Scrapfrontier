import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import { Table, Row, Col     } from "react-bootstrap";
import LoginImg from '@monorepo/shared/assets/img/login.jpg';
import Loginbar1 from '@monorepo/shared/assets/img/loginbar1.svg';
import Loginbar3 from '@monorepo/shared/assets/img/Group 3.svg';

const Login  = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/user/dashboard', { replace: true });
    }, [navigate])

    return(
        <div >
            <main className="content">  
                <div className="main main2">
                    <div className="main__video">
                        <img src={LoginImg} alt=""/>
                    </div>
                </div>
            </main>  
            <div className="login">                
                <img src={Loginbar1} alt="" className="login_bar1"/>
                <img src={Loginbar3} alt="" className="login_bar3"/>
            </div>
        </div>
    );
}
export default Login