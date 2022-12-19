import { useState, useEffect } from "react";

const Api = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addPosts = async (title, body) => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.random().toString(36).slice(2),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts((posts) => [data, ...posts]);
        setTitle("");
        setBody("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPosts(title, body);
  };

  const deletePost = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setPosts(posts.filter((post) => post.id !== id));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const postsRender = posts.map((post) => (
    <div key={post.id} className="space-y-4 border rounded-lg p-2">
      <p className="font-bold">{post.title}</p>
      <p className="text-green-600">{post.body}</p>
      <button
        className="border p-2 rounded-full bg-red-500 text-white font-bold hover:scale-105"
        onClick={() => deletePost(post.id)}
      >
        Delete post
      </button>
    </div>
  ));

  const handleChange = (event) => {
    event.target.name === "title" && setTitle(event.target.value);
    event.target.name === "body" && setBody(event.target.value);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-8 text-center p-8">
        {postsRender}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-1/4 mx-auto">
        <div className="flex flex-col">
          <label className="text-center font-bold">Title</label>
          <input
            className="border"
            value={title}
            placeholder="Write anything"
            onChange={handleChange}
            name="title"
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-center font-bold">Body</label>
          <input
            className="border"
            value={body}
            placeholder="Write anything"
            onChange={handleChange}
            name="body"
          ></input>
        </div>
        <button
          className="border mt-4 p-3 rounded-full bg-green-600 font-bold hover:scale-105"
          type="submit"
        >
          Add post
        </button>
      </form>
    </div>
  );
};

export default Api;
