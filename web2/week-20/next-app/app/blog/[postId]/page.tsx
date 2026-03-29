import axios from "axios";

export default async function BlogPage({params}: {
    params: {
        postId: string
    }
}) {
    const postId = (await params).postId;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${postId}`)
    const data = response.data;
    return (
        <div>
            hello dyanamic content {postId}
            <br />
            id - {data.id} <br />
            title - {data.title} 
        </div>
    )
}