import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import BlogsForm from './components/BlogsForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

import './App.css'

const Notification = (props) => {
  if (!props.err.status) {
    return <p style={{ border: 'red solid 2px' }}>{props.err.errorMssg}</p>
  } else {
    return <p style={{ border: 'green solid 2px' }}>{props.err.errorMssg}</p>
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [err, setError] = useState('')
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log(blogs)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const object = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
    }
    event.target[0].value = ''
    event.target[1].value = ''
    event.target[2].value = ''
    try {
      let res = await blogService.create(object)
      console.log(res);
      setBlogs(blogs.concat(res))

      setError({ errorMssg: `blog ${res.title} was saved`, status: 1 })
      setTimeout(() => {
        setError(null)
      }, 5000)
    } catch (err) {
      setError({ errorMssg: 'Blog could not be saved', status: 0 })
      setTimeout(() => {
        setError(null)
      }, 5000)
      console.log(err)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with ', username, password)
    if (username && password) {
      try {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setError({
          errorMssg: 'You have been succesfully logged in',
          status: 1,
        })
        setTimeout(() => {
          setError(null)
        }, 5000)
      } catch (err) {
        setError({ errorMssg: 'Wrong username/password', status: 0 })
        setTimeout(() => {
          setError(null)
        }, 5000)
        console.log(err.message)
      }
    }
  }
  const handleRemove=async(event) => {

    const id = event.target.id.toString()
    let oldblog=blogs.find(el => el.id===id)
    let check=window.confirm('Are you sure you want to delete '+oldblog.title)
    console.log(check)
    if(check){  try{
      await blogService.removeBlog(oldblog.id)
      let newbloglist= blogs.filter(el => el.id!==id)
      setBlogs(newbloglist)
    }catch(err){
      setError({ errorMssg: 'You are not authorized to delete this blog', status: 0 })
      setTimeout(() => {
        setError(null)
      }, 5000)
      console.log(err.message)
    }}
  }
  const handleLike =async(event) => {

    const id = event.target.id.toString()

    let oldblog=blogs.find(el => el.id===id)

    let newBlog={ ...oldblog,likes:oldblog.likes+1 }

    try{
      let req = await blogService.incLike(newBlog)
      let newbloglist = blogs.map(el => el.id===id?req:el)
      setBlogs(newbloglist)
    }catch(err){
      console.log(err.message)
    }

  }
  const onChange = ({ target }) => {
    target.name === 'Password'
      ? setPassword(target.value)
      : setUsername(target.value)
  }
  const Forms = () => {
    return (
      <Togglable buttonLabel="login">
        <Form
          username={username}
          password={password}
          onsubmit={handleLogin}
          onchange={onChange}
        />
      </Togglable>
    )
  }
  const Notifications = () => {
    if (err) return <Notification err={err} />

    return null
  }
  const Blogs = () => {
    return (
      <BlogsForm
        user={user}
        setUser={setUser}
        setUsername={setUsername}
        setPassword={setPassword}
        handleNewBlog={handleNewBlog}
        blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} username={user.username}
      />
    )
  }

  return (
    <div>
      {Notifications()}

      {user === null ? Forms() : Blogs()}
    </div>
  )
}

export default App
