import React, { Component } from "react";
// import DatePickerInput from "../Utils/DatePickerInput";
import { Container } from "@material-ui/core";
 import Avatar, { ConfigProvider } from 'react-avatar';
 import yarinImg from '../../../Resources/Images/Team/Yarin.jpg';
 import eilonImg from '../../../Resources/Images/Team/Eilon.jpg';
 import assafImg from '../../../Resources/Images/Team/Assaf.jpg';
 import itamarImg from '../../../Resources/Images/Team/Itamar.jpg';



const AboutUs = () => {
    return (

        <Container className='mt-3' maxWidth='sm'>
            <div className='text-center rtl'>
                <h1>המטרה שלנו</h1>
                {/*{/<DatePickerInput/>/}*/}
                <p>
                    לספק לכל שוכר פוטנציאלי את היכולת לקבל את התמונה המלאה על הדירה אותה הוא מעוניין לשכור.
                    לצערנו הרב, בעלי דירות רבים אינם מספקים את כל המידע לגבי נזקי רכוש ותקלות בדירה בכדי לנסות לייקר את ערכה.
                    זוהי בעיקר בעיה של צעירים שהינם חסרי ניסיון בשכירת דירה ושאינם גרים במגורי קבע.

                </p>
                <h1> איך זה עובד?</h1>
                <p> באתר שלנו תמצאו מגוון ביקורות על דירות להשכרה ברחבי הארץ
                    באפשרותך לחפש דירה בעמוד החיפוש ולראות ביקורות מדיירים קודמים ואף להוסיף ביקורת על דירות בהן התגוררת.</p>
                <h1> מי אנחנו? </h1>
                <p> ארבעה סטודנטים מאקדמית ת"א המתגוררים במרכז ומכירים מקרוב את בעיית השכרת הדירה.</p>
            </div>
            <div className='text-center'>
                {<Avatar name="Yarin" round={true} src={yarinImg} />}
                {<Avatar name="Assaf" round={true} src={assafImg}/>}
                {<Avatar name="Eilon" round={true} src={eilonImg}/>}
                {<Avatar name="Itamar" round={true} src={itamarImg}/>}
            </div>
        </Container>


    );
}
export default AboutUs;