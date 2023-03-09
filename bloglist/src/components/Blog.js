import { useEffect, useState } from "react"
import blogsService from "../services/blogs"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = {display: showDetails ? '' : 'none'}

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const like = async () => {
    try {
      const newBlog = {
        id: blog.id,
        user: blog.user.id,
        likes: blog.likes + 1
      }
      const res = await blogsService.update(newBlog)
      blog.likes = res.likes
      setLikes(blog.likes)
    } catch (ex) {
      console.error(ex)
    }
  }

  return (
    <div style={blogStyle}>
      { blog.title } 
      { blog.author }
      <button onClick={toggleDetails}>{ showDetails ? 'hide' : 'show' }</button>
      <div style={details}>
        <div>
          { blog.url }
        </div>
        <div>
          { likes }
          <button onClick={like}>like</button>
        </div>
        <div>
          { blog.user.username }
        </div>
      </div>
    </div>
  )
}

export default Blog