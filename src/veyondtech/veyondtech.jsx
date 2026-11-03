import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

import logo from "./img/veyondtech-logo.png";
import logo1 from "./img/veyondtech.png";
import insta from "./img/insta.png";
import facebook from "./img/facebook.png";
import x from "./img/x.png";
import linkdin from "./img/linkdin.png";
import youtube from "./img/youtube.png";
import phone from "./img/phone.png";
import sms from "./img/sms.png";
import location from "./img/location.png";

export default function Veyondtech() {
  const [blogs, setBlogs] = useState([]);

  // Get blogs from API
  useEffect(() => {
    axios
      .get("https://www.veyondtech.com/demo/wp-json/wp/v2/posts?_embed")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <header className="veyond-header">
        <div className="veyond-navbar">
          <img src={logo} alt="Company Logo" />
          <nav className="veyond-nav">
            <a href="#" data-text="Products">
              <span>Products</span>
            </a>
            <a href="#" data-text="Cart">
              <span>Cart</span>
            </a>
          </nav>
          <a href="#" className="account-icon">
            <span className="profile-circle">A</span>
            <span>Profile</span>
          </a>
        </div>
      </header>

      {/* Blog Section */}
      <div className="blog-section">
        <div className="blog-container">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <img
                src={blog._embedded["wp:featuredmedia"][0].source_url}
                alt="Blog"
                className="blog-image"
              />
              <h2>{blog.title.rendered}</h2>
              <div
                className="blog-description"
                dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered,}}/>
              <a href={blog.link} className="read-more">
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>

     <footer className="veyond-footer">
        <div className="footer-top">
          <div className="footer-company">
            <img src={logo1} alt="Veyondtech Logo" />
            <p>
              A product-led development company building
              AI-powered digital solutions worldwide.
            </p>
            <div className="social-links">
               <a href="#" className="img"><img src={insta} alt="Logo"></img></a>
               <a href="#" className="img"><img src={facebook} alt="Logo"></img></a>
               <a href="#" className="img"><img src={x} alt="Logo"></img></a>
               <a href="#" className="img"><img src={linkdin} alt="Logo"></img></a>
               <a href="#" className="img"><img src={youtube} alt="Logo"></img></a>
            </div>
          </div>
          <div className="footer-links">
            <a href="#" data-text="Returns & Refunds">
              <span>Returns & Refunds</span>
            </a>
            <a href="#" data-text="Cookie Policy">
              <span>Cookie Policy</span>
            </a>
            <a href="#" data-text="Licensing Policy">
              <span>Licensing Policy</span>
            </a>
          </div>
          <div className="footer-links">
            <a href="#" data-text="FAQ">
              <span>FAQ</span>
            </a>

            <a href="#" data-text="Privacy Policy">
              <span>Privacy Policy</span>
            </a>
          </div>
          <div className="footer-contact">
              <a href="mailto:contact@localhost" className="contact-item">
                <img src={sms} alt="Logo" />contact@localhost
              </a>
              <a href="tel:+919328182885" className="contact-item" >
               <img src={phone} alt="Logo" />+919328182885
              </a>            
              <a href="https://maps.app.goo.gl/X7L3pPzEJQSbNtZBA"
									    target="_blank" className="contact-item">
									<img src={location} alt="Logo" />G - 4, Shiv Shakti Luxuria, Bhagwati
                  Circle, Bhavnagar, Gujarat 364002
							</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 <a href="https://www.veyondtech.com/demo/">Veyondtech.</a> All Rights Reserved.
          </p>
          <p>
            Built with ❤️ in India
          </p>
          <p>Building Digital Products & Solutions Worldwide</p>
        </div>
      </footer>
    </>
  );
}




