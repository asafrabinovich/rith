import React, {Component} from "react";


const Footer = () =>{
    const style = {
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        height: "60px",
        width: "100%",
        marginTop: "60px"
    };

    return(

        <footer className="page-footer font-small">

            <div style={style} class="footer-copyright text-center bg-light py-3">© 2020 Copyright:
                <a href="http://localhost:3000/home"> RobInMyHood</a>
            </div>

        </footer>
    )
}
export default Footer;