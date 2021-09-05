import React from 'react'

const Footer = () => {
    return (
    <footer>
        <div className="contact">
            <div class="contactInfo">
                <div >
                    <img className="rrssImg" src="/assets/rrss_icons/pin.png"/>
                    <p>Alvarado 1560, Mar del Plata, Buenos Aires</p>
                </div>
                <div >
                    <img className="rrssImg" src="/assets/rrss_icons/telephone.png"/>
                    <p>+ 54 223 5391098</p>
                </div>
                <div >
                    <img className="rrssImg" src="/assets/rrss_icons/mail.png"/>
                    <p>info@mardelcasas.com</p>
                </div>
            </div>
            <div className="socialNetworks">
                <a href="">
                    <img className="rrssImg" src="/assets/rrss_icons/facebook.png"/>
                </a>
                <a href="">
                    <img className="rrssImg" src="/assets/rrss_icons/instagram.png"/>
                </a>
                <a href="">
                    <img className="rrssImg" src="/assets/rrss_icons/twitter.png"/>
                </a>
            </div>
        </div>
        <div className="copyright">
            <p> Copyright Cohort 21 | MindHub</p>
        </div>
    </footer>
    )
}

export default Footer
