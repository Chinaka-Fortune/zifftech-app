import React from "react";
import ziffofficeLogo from "./ziffHome/homeImages/ziffofficeLogo.jpg"

const FooterComp = () => {
    return (
    
            <div class="container-fluid bg-dark text-start">
                <div class="row align-items-center text-white mx-3">
                    <div class="col">
                        <figure className="mt-5">
                            <img src={ziffofficeLogo} alt="ziffofficeLogo" className="
                            footerLogo" />
                        </figure>
                        <p className="text-lighter">Suit 49, 26 Ikotun-Idimu Road, Kasam Plaza,</p>
                        <p className="">College B/Stop, IKotun, Lagos</p>
                        <p>+2348032682945</p>
                        <p>09121838990</p>
                        <p className="mb-3"> wwww.ziffcode.com.ng</p>
                        <p className="border-bottom border-danger border-2 mt-2"></p>


                    </div>
                    <div class="col">
                        <p>Office Hours</p>
                        <p className="border-bottom border-primary mt-2"></p>
                        <p>Working days: </p>
                            <p>Mon – Fri, 9AM – 6PM</p>
                        <p>Sat, 10AM - 5PM</p>
                    </div>
                    <div class="col">
                        <p>Our Services</p>
                        <p className="border-bottom border-primary mt-2"></p>
                        <p>Training</p>
                        <p>IT Services</p>
                        <p>Hands-on coding</p>
                        <p>Programming languages</p>
                        <p>Kids coding</p>
                    </div>
                    <div class="col">
                        <p>Portals</p>
                        <p className="border-bottom border-primary mt-2"></p>
                    </div>
                </div>
            </div>
        
    )
}

export default FooterComp;