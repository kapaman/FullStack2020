import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
const BlogsForm =(props) => {
  return (
    <div>
      <h1>blogs</h1>
      <p> logged in as <b>{props.user.username} </b></p><button
        onClick={() => {
          window.localStorage.clear()
          props.setUser(null)
          props.setUsername('')
          props.setPassword('')
        }}>logout</button>
      <div>
        <Togglable buttonLabel="create new blog entry">
          <div>
            <form onSubmit={props.handleNewBlog} className="formasd">
              <h3>create new blog entry</h3>
              <div>title
                <input name ="title" className="title"></input>
              </div>
              <div>author
                <input name="author" className="author"></input>
              </div>

              <div>url
                <input name ="url" className="url"></input>
              </div>

              <button id="create-blog">create</button>
            </form>
          </div>

        </Togglable>
      </div>

      <div className="allBlogs">
        <h2>blogs</h2>
        {props.blogs.sort((a,b) => (b.likes-a.likes)).map(blog => <Blog key={blog.id} blog={blog} username={props.username} handleLike={props.handleLike} handleRemove={props.handleRemove}/>)}
      </div>


    </div>
  )
}

export default BlogsForm