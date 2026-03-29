import { useState } from "react";
import Post from "./post.jsx";
import ProfileCard from "./profileCard.jsx";



function App() {
  const [posts, setPosts] = useState([])

  const postComponets = posts.map(post => <Post
    name={post.name}
    subtitle={post.subtitle}
    time={post.time}
    image={post.image}
    description={post.description}
  />)

  function addPost() {
    setPosts([...posts, {
      name: "Purv Joshi",
      subtitle: "1000 followers",
      time: "12m",
      image: "https://imgs.search.brave.com/XmWo89rrDH7sV2NOJzKw5vMt4FrPmtc6_nK7g0VHrMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzYwLzI2LzA4/LzM2MF9GXzU2MDI2/MDg4MF9PMVYzUW0y/Y05PNUhXak42Nm1C/aDJOcmxQSE5IT1V4/Vy5qcGc",
      description: "Do everyday coding!!"

    }])
  }

  return (
    <div>
      <div style={{ background: "#dfe6e9", height: "100vh", fontFamily: "monospace" }}>
        <button onClick={addPost}>Add Post</button>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px", paddingTop: "20px" }}>
          <div style={{ width: 660, fontWeight: "bold", fontFamily: "monospace", }}>
            <ProfileCard />
          </div>
          {postComponets}
        </div>
      </div>
    </div>
  )
}

export default App