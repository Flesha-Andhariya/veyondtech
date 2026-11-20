import { useState, useEffect } from "react";
import axios from "axios";

import {
  Link,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate
} from "react-router-dom";

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
import view from "./img/view.png";
import edit from "./img/edit.png";
import deleteIcon from "./img/delete.png";


const API_URL =
  "https://www.veyondtech.com/demo/wp-json/wp/v2/posts";


const authConfig = {
   auth: {
      username: "admin",
      password: "bgjT Dh1i 822c gLJM CapM NM1Q"
   }
};

export default function VeyondTech() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const getBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}?per_page=100&_embed`,
        authConfig
      );
      setBlogs(response.data);
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Blogs Not Found!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (

    <>
      <header className="veyond-header">
        <div className="veyond-navbar">
          <Link
            to="/"
            className="logo-link"
            aria-label="View All Blogs"
          >
            <img src={logo} alt="Veyondtech Logo" />
          </Link>

          <nav className="veyond-nav">
            <Link
              to="/"
              className="nav-menu-button"
              data-text="Home"
            >
              <span>Home</span>
            </Link>

            <Link
              to="/add-blog"
              className="nav-menu-button"
              data-text="Add Blog"
            >
              <span>Add Blog</span>
            </Link>

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
        <Routes>
          <Route
            path="/"
            element={
              <Home
                blogs={blogs}
                loading={loading}
              />
            }
          />

          <Route
            path="/add-blog"
            element={
              <BlogForm
                getBlogs={getBlogs}
                blogs={blogs}
                loading={loading}
              />
            }
          />

          <Route
            path="/blog/:id"
            element={
              <SingleBlog getBlogs={getBlogs} />
            }
          />

          <Route
            path="/edit-blog/:id"
            element={
              <BlogForm
                getBlogs={getBlogs}
                blogs={blogs}
                loading={loading}
              />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
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

      <div className="footer-graphic">
        <div className="footer-graphic-logo">
          <img src={logo} alt="Veyondtech Logo" />
        </div>
      </div>

    </>

  );
}

function Home({ blogs, loading }) {

  return (

    <div className="blog-container">
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Blogs...</p>
        </div>

      ) : blogs.length > 0 ? (

        blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            {blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <img
                src={
                  blog._embedded["wp:featuredmedia"][0].source_url
                }
                alt="Blog"
                className="blog-image"
              />
            )}

            <h2>
              {blog.title.rendered}
            </h2>
            <div
              className="blog-description"
              dangerouslySetInnerHTML={{
                __html: blog.excerpt.rendered
              }}
            />

            <Link
              to={`/blog/${blog.id}`}
              className="read-more"
            >
              Read More →
            </Link>
          </div>
        ))

      ) : (

        <p>No Blogs Found!</p>
      )}
    </div>
  );
}

function BlogForm({ getBlogs, blogs, loading }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // FORM STATES

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("publish");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [commentStatus, setCommentStatus] = useState("open");
  const [imageId, setImageId] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {

    const getEditBlog = async () => {

      if (!id) {
        setTitle("");
        setContent("");
        setStatus("publish");
        setExcerpt("");
        setSlug("");
        setCommentStatus("open");
        setImageId("");
        return;
      }

      try {
        setFormLoading(true);
        const response = await axios.get(
          `${API_URL}/${id}?context=edit`,
          authConfig
        );

        const post = response.data;
        setTitle(post.title.raw || "");
        setContent(post.content.raw || "");
        setStatus(post.status);
        setExcerpt(post.excerpt.raw || "");
        setSlug(post.slug);
        setCommentStatus(post.comment_status);
        setImageId(post.featured_media || "");
      } catch (error) {
        console.log(error.response?.data || error);
        alert("Unable to Edit Blog!");
        navigate("/");
      } finally {
        setFormLoading(false);
      }
    };
    getEditBlog();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      title: title,
      content: content,
      status: status,
      excerpt: excerpt,
      slug: slug,
      comment_status: commentStatus,
      featured_media: Number(imageId)
    };

    try {
      setFormLoading(true);
      if (id) {
        await axios.put(
          `${API_URL}/${id}`,
          blogData,
          authConfig
        );
        alert("Blog Updated Successfully!");

      } else {
        await axios.post(
          API_URL,
          blogData,
          authConfig
        );
        alert("Blog Added Successfully!");
      }
      await getBlogs();
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Something Went Wrong!");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(blogId);
      await axios.delete(
        `${API_URL}/${blogId}?force=true`,
        authConfig
      );
      alert("Blog Deleted Successfully!");
      await getBlogs();
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Unable to Delete Blog!");
    } finally {
      setDeletingId(null);
    }
  };

  if (formLoading && id) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading Blog...</p>
      </div>
    );
  }

  return (

    <div className="add-blog-form">
      <div className="form-heading">
        <h2>
          {id ? "Edit Blog" : "Add New Blog"}
        </h2>
        <p>
          Create and manage your blog content.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              Blog Title <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input
              type="text"
              placeholder="enter-blog-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Publication Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>
          </div>


          <div className="form-group">
            <label>Comment Status</label>
            <select
              value={commentStatus}
              onChange={(e) => setCommentStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>
              Blog Content <span>*</span>
            </label>
            <textarea
              placeholder="Write your blog content here..."
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Excerpt</label>
            <textarea
              placeholder="Write a short blog summary..."
              rows="3"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>
              Featured Image ID <span>*</span>
            </label>

            <input
              type="number"
              placeholder="Enter image ID"
              value={imageId}
              onChange={(e) => setImageId(e.target.value)}
              required
            />
            <small>
              Enter the WordPress media attachment ID.
            </small>
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="submit-blog-btn"
            disabled={formLoading}
          >
            {formLoading
              ? "Please Wait..."
              : id
                ? "Update Blog"
                : "+ Add Blog"}

          </button>
          <Link
            to="/"
            className="back-to-blogs-btn"
          >
            ← Back to Blogs
          </Link>
        </div>
      </form>

      <div className="admin-blog-list">
        <h2>All Blogs</h2>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading Blogs...</p>
          </div>

        ) : blogs.length > 0 ? (

          <div className="blog-list-table">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Blog Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>
                      {index + 1}
                    </td>

                    <td className="table-blog-title">
                      {blog.title.rendered}
                    </td>

                    <td>
                      <span
                        className={`blog-status ${
                          blog.status === "publish"
                            ? "published"
                            : blog.status === "draft"
                              ? "draft-status"
                              : "other-status"
                        }`}
                      >
                        {blog.status.charAt(0).toUpperCase() +
                          blog.status.slice(1)}

                      </span>
                    </td>

                    <td>
                      <div className="blog-actions">
                        <Link
                          to={`/blog/${blog.id}`}
                          className="action-icon view-icon"
                          title="View Blog"
                          aria-label="View Blog"
                        >
                           <img src={view} alt="view" />
                        </Link>

                        <Link
                          to={`/edit-blog/${blog.id}`}
                          className="action-icon edit-icon"
                          title="Edit Blog"
                          aria-label="Edit Blog"
                        >
                           <img src={edit} alt="edit" />
                        </Link>

                        <button
                          type="button"
                          className="action-icon delete-icon"
                          title="Delete Blog"
                          aria-label="Delete Blog"
                          onClick={() => handleDelete(blog.id)}
                          disabled={deletingId === blog.id}
                        >
                          {deletingId === blog.id ? (
                            "..."
                          ) : (
                            <img src={deleteIcon} alt="Delete" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        ) : (

          <p>No Blogs Found!</p>
        )}
      </div>
    </div>
  );
}

function SingleBlog({ getBlogs }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singlePost, setSinglePost] = useState(null);
  const [singleLoading, setSingleLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        setSingleLoading(true);
        setSinglePost(null);
        const response = await axios.get(
          `${API_URL}/${id}?_embed`,
          authConfig
        );
        setSinglePost(response.data);
      } catch (error) {
        console.log(error.response?.data || error);
        alert("Blog Not Found!");
        navigate("/");
      } finally {
        setSingleLoading(false);
      }
    };
    getSingleBlog();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this blog?"
    );

    if (!confirmDelete) return;
    try {
      setDeleting(true);
      await axios.delete(
        `${API_URL}/${id}?force=true`,
        authConfig
      );
      alert("Blog Deleted Successfully!");
      await getBlogs();
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Unable to Delete Blog!");
    } finally {
      setDeleting(false);
    }
  };

  return (

    <div className="single-post-container">
      {singleLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Blog...</p>
        </div>

      ) : singlePost && (

        <>
          {singlePost._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={
                singlePost._embedded["wp:featuredmedia"][0].source_url
              }
              alt="Blog"
              className="blog-image-large"
            />
          )}

          <h1>
            {singlePost.title.rendered}
          </h1>
          <div
            className="blog-full-content"
            dangerouslySetInnerHTML={{
              __html: singlePost.content.rendered
            }}
          />

          <div className="single-post-actions">
            <Link
              to={`/edit-blog/${singlePost.id}`}
              className="edit-button"
            >
              Edit Blog
            </Link>

            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Blog"}
            </button>

            <Link
              to="/"
              className="back-button"
            >
              ← Back to Blogs
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
