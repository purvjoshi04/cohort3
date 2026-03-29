import axios from "axios"

async function getBlogs() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/");
    return response.data;
}

export default async function Blogs() {

    const blogs = await getBlogs()

    return (
        <div>
            Learn NextJs
            {JSON.stringify(blogs)}
        </div>
    )
}