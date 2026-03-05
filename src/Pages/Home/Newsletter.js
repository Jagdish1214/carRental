import React from 'react'

const Newsletter = () => {
    return(
    <div className="d-flex flex-column align-items-center justify-content-center text-center gap-2" >
            <h1 className="fw-bold display-6 display-md-4" style={{fontSize:"35px"}}>Never Miss a Deal!</h1>
            <p className=" text-secondary pb-4" style={{fontSize:"17px"}}>
            Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="d-flex align-items-center justify-content-between w-100" style={{maxWidth: '650px', height: '52px'}}>
            <input
                className="form-control h-100 rounded-0 rounded-start"
                type="email"
                placeholder="Enter your email id"
                required
                style={{borderRight: 0}}
            />
            <button
                type="submit"
                className="btn btn-primary h-100 px-4 px-md-5 rounded-0 rounded-end"
                style={{whiteSpace: 'nowrap'}}
            >
                Subscribe
            </button>
            </form>
        </div>
    );
}

export default Newsletter
