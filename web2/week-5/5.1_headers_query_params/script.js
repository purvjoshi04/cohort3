async function getData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    document.getElementById("posts").innerHTML = `<pre>${JSON.stringify(data, null, 2 )}</pre>`;
}
getData();