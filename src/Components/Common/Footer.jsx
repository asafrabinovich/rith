import React, {Component} from "react";


const Footer = () =>{
    const style = {
        color:"white",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
        marginTop: "60px"
    };

    const position = {
        display: 'block',
        height: '60px',
        width: '100%',
      }
    return(

        <footer style={position} className="page-footer font-small">

            <div style={style} class="footer-copyright text-center bg-dark py-3">© 2020 Copyright:
                <a href="http://localhost:3000/home"> WeRent</a>
            </div>

        </footer>
    )
}
export default Footer;