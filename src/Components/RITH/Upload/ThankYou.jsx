import React, {Component} from "react";
import {Container} from "@material-ui/core";

const ThankYou = () =>{
    return(
        <Container className='w-75 rtl text-center mt-5'>
            <h1>הביקורת נקלטה במערכת!</h1>
            <h6>אנו מודים לך על זמנך ועל השירות לבאים אחריך, זה לא מובן מאליו.
                הצוות שלנו יוודא שהביקורת תקינה והיא תעלה באתר בהקדם האפשרי
            </h6>
        </Container>

    );
}
export default ThankYou;