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
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [singlePost, setSinglePost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [commentStatus, setCommentStatus] = useState("open");
  const [imageId, setImageId] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          API_URL,
          {
            title: title,
            content: content,
            status: status,
            excerpt: excerpt,
            slug: slug,
            comment_status: commentStatus,
            featured_media: imageId
          },
          {
            auth: {
              username: "admin",
              password: "bgjT Dh1i 822c gLJM CapM NM1Q"
            }
          }
        );
        alert("Blog Added Successfully!");
        setTitle("");
        setContent("");
        setStatus("draft");
        setExcerpt("");
        setSlug("");
        setCommentStatus("open");
        const response = await axios.get(`${API_URL}?per_page=100&_embed`);
        setBlogs(response.data);
      } 
      catch (error) {
        console.log(error);
        alert("Blog Not Added!");
      }
    };

  const API_URL = "https://www.veyondtech.com/demo/wp-json/wp/v2/posts";

    useEffect(() => {
      axios.get(`${API_URL}?per_page=100&_embed`).then((response) => {
        setBlogs(response.data);
      });
    }, []);

  useEffect(() => {
    if (selectedPostId) {
      axios.get(`${API_URL}/${selectedPostId}?_embed`).then((response) => {
        setSinglePost(response.data);
      });
    } else {
      setSinglePost(null);
    }
  }, [selectedPostId]);
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

      <div className="blog-section">
     <div className="add-blog-form">
          <h2>Add New Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>Title :</label>
            <input
              type="text"
              placeholder="Enter Blog Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Content :</label>
            <textarea
              placeholder="Enter Blog Content"
              name="content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <label>Status :</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>
            <label>Excerpt :</label>
            <textarea
              placeholder="Enter Blog Excerpt"
              name="excerpt"
              rows="3"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            ></textarea>
            <label>Slug :</label>
            <input
              type="text"
              placeholder="Enter Blog Slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <label>Comment Status :</label>
            <select
              name="comment_status"
              value={commentStatus}
              onChange={(e) => setCommentStatus(e.target.value)}
            >
              <option value="">Select Comment Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <label>Image ID :</label>
              <input
                type="number"
                value={imageId}
                onChange={(e) => setImageId(e.target.value)}
                placeholder="Enter Image ID"
                required
              />
            <button type="submit">Add Blog</button>
          </form>
        </div>

        {selectedPostId ? (
          <div className="single-post-container">
            {singlePost && (
              <>
                {singlePost._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <img
                    src={singlePost._embedded["wp:featuredmedia"][0].source_url}
                    alt="Blog Feature"
                    className="blog-image-large"
                  />
                )}
                <h1>{singlePost.title.rendered}</h1>
                <div
                  className="blog-full-content"
                  dangerouslySetInnerHTML={{
                    __html: singlePost.content.rendered
                  }}
                />
              </>
            )}
             <button
              className="back-button"
              onClick={() => setSelectedPostId(null)}
            >
              ← Back to Blogs
            </button>
          </div>

        ) : (

          <div className="blog-container">
            {blogs.map((blog) => (
              <div className="blog-card" key={blog.id}>
                {blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <img
                    src={blog._embedded["wp:featuredmedia"][0].source_url}
                    alt="Blog"
                    className="blog-image"
                  />
                )}
                <h2>{blog.title.rendered}</h2>
                <div
                  className="blog-description"
                  dangerouslySetInnerHTML={{
                    __html: blog.excerpt.rendered
                  }}
                />
                <button
                  className="read-more"
                  onClick={() => setSelectedPostId(blog.id)}
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>
        )}
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
