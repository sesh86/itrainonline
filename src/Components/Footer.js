import React, { Component } from 'react';

class Footer extends Component {

    render() {

        return (<footer className="ftco-footer ftco-bg-dark ftco-section text-white ">
            <div >
                <div className="container">

                    <div className="row">
                        <div className="col-md-3">
                            <h1 className="ftco-heading-2" >Reach Us</h1>
                            <div className="block">
                                <ul className="list-unstyled">
                                    <li><span className="icon icon-map-marker"></span><span className="text"><span><span>13, Outer Ring Rd, Old Madiwala</span>,<br /> Jay Bheema Nagar, 1st Stage BTM Layout, Bengaluru, Karnataka 560068</span></span></li>
                                        <li><a href="#"><span className="icon icon-phone"></span><span className="text">+91 99003 10223</span></a></li>
                                        <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@itraintechnologies.com</span></a></li>
	              </ul>
	            </div>

                            </div>
                            <div className="col-md-3 d-block">
                                <h1 className="ftco-heading-2" >Courses</h1>
                                <ul className="list-unstyled">
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Machine Learning</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Node js</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>React js</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Meteor js</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Jquery</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3 d-block">
                                <h1 className="ftco-heading-2" >Company</h1>
                                <ul className="list-unstyled">
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>About</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Terms</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Privacy Policy</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Sitemap</a></li>

                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h1 className="ftco-heading-2" >Useful Links</h1>
                                <ul className="list-unstyled">
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Careers</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Partners</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Media Kit</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Competitive Programming</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Contact</a></li>
                                </ul>
                            </div>

                        </div>





                    </div>
                    <hr />
                    <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                        <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                        <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                        <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
                    </ul>
                </div>
    </footer>)
                }
        }
        
export default Footer;