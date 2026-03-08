import React from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="text-secondary pt-4 px-3 px-md-5 px-lg-6 px-xl-7" style={{marginTop:"100px"}}>

      <div className="d-flex flex-wrap justify-content-between gap-4 gap-md-3">

        <div className="flex-grow-1" style={{ maxWidth: '320px', marginLeft:"90px"}}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <img
              src={assets.brandlogo}
              alt="logo"
              className="mb-3"
              style={{ height: '50px', maxHeight: '58px',marginTop:"5px"}}
            />
            <span style={{fontSize:"25px", fontWeight:"500", color:"black",marginLeft:"2px"}}>
              UrbanRentals
            </span>
          </Link>

          <p className="small">
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </p>

          <div className="d-flex gap-3 mt-3">
            <a href="https://facebook.com"><img src={assets.facebook_logo} className='w-5 h-5' alt="facebook"/></a>
            <a href="https://instagram.com"><img src={assets.instagram_logo} className='w-5 h-5' alt="instagram"/></a>
            <a href="https://twitter.com"><img src={assets.twitter_logo} className='w-5 h-5' alt="twitter"/></a>
            <a href="mailto:urbanrentals@gmail.com"><img src={assets.gmail_logo} className='w-5 h-5' alt="gmail"/></a>
          </div>
        </div>

        <div style={{marginLeft:"100px"}}>
          <p className="h5 text-dark mt-4">QUICK LINKS</p>
          <ul className="list-unstyled mt-3 small">
            <li><Link to="/" style={{textDecoration:"none",color:"grey"}}>Home</Link></li>
            <li className='mt-1'><Link to="/cars" style={{textDecoration:"none",color:"grey"}}>Browse Your Car</Link></li>
            <li className='mt-1'><Link to="/owner/add-car" style={{textDecoration:"none",color:"grey"}}>List Your Car</Link></li>
            <li className='mt-1'><Link to="/about" style={{textDecoration:"none",color:"grey"}}>About Us</Link></li>
          </ul>
        </div>

        <div>
          <p className="h5 text-dark mt-4">RESOURCES</p>
          <ul className="list-unstyled mt-3 small">
            <li><a href="/help" style={{textDecoration:"none",color:"grey"}}>Help Center</a></li>
            <li className='mt-1'><a href="/terms" style={{textDecoration:"none",color:"grey"}}>Terms Of Service</a></li>
            <li className='mt-1'><a href="/privacy" style={{textDecoration:"none",color:"grey"}}>Privacy Policy</a></li>
            <li className='mt-1'><a href="/insurance" style={{textDecoration:"none",color:"grey"}}>Insurance</a></li>
          </ul>
        </div>

        <div style={{marginRight:"100px"}}>
          <p className="h5 text-dark mt-4">CONTACT</p>
          <ul className="list-unstyled mt-3 small">
            <li>UrbanRentals</li>
            <li className='mt-1'>Pune,412105</li>
            <li className='mt-1'>+1 234 567890</li>
            <li className='mt-1'>urbanrentals@gmail.com</li>
          </ul>
        </div>

      </div>

      <hr className="border-secondary mt-4" style={{width:"1000px", margin:"0 auto"}} />

      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between py-3 small text-secondary">
        <p className="mb-2 mb-md-0" style={{marginLeft:"82px"}}>
          © {new Date().getFullYear()} 
          <Link to="/" className="text-decoration-none text-secondary"> UrbanRentals</Link>. 
          All rights reserved.
        </p>

        <ul className="list-unstyled d-flex gap-3 mb-0" style={{marginRight:"80px"}}>
          <li><a href="/privacy" className="text-secondary text-decoration-none">| Privacy</a></li>
          <li><a href="/terms" className="text-secondary text-decoration-none">| Terms</a></li>
          <li><a href="/cookies" className="text-secondary text-decoration-none">| Cookies</a></li>
        </ul>
      </div>

    </div>
  );
}

export default Footer