import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog,handleLike,handleRemove,username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const remButton=(blog1) => {
    if(blog1.user[0].username===username){
      return <button id={blog1.id} onClick={handleRemove}>remove</button>
    }

    return null
  }

  return (
    <div style={blogStyle} className="blogDiv">
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view" removeButton="hide">
        <div>
          <p>{blog.url}</p>
          <p ><b className="likeCounter">{blog.likes}</b> likes<button id={blog.id} onClick={handleLike} className="like">like</button></p>
          <p>{blog.user[0].name}</p>
        </div>
        {remButton(blog)}
      </Togglable>
    </div>
  )
}
export default Blog
