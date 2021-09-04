import React from 'react'

const Footer = () => {
    return (
    <nav>
        <section className="nav navBar">
            <article className="contact">
                <img className="rrssImg" src="../assets/rrss_icons/pin.png"/>
                <p>Av. Patricio peralta Ramos 2877, Mar del Plata, Buenos Aires</p>
            </article>
            <article className="contact">
                <img className="rrssImg" src="../assets/rrss_icons/telephone.png"/>
                <p>+ 54 223 5391098</p>
            </article>
            <article className="contact">
                <img className="rrssImg" src="../assets/rrss_icons/mail.png"/>
                <p>info@mardelcasas.com</p>
            </article>
            <article className="contact">
                <img className="rrssImg" src="../assets/rrss_icons/facebook.png"/>
                <img className="rrssImg" src="../assets/rrss_icons/instagram.png"/>
                <img className="rrssImg" src="../assets/rrss_icons/twitter.png"/>
            </article>
        </section>
        <div className="copyright">
            <p> Copyright Cohort 21 | MindHub</p>
        </div>
    </nav>
    )
}

export default Footer
