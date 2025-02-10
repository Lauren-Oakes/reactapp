import { useEffect, useState } from "react"

function PostSection({post}) {
return (
<article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
<div className="flex items-center gap-x-4 text-xs">
  <div key={post.title} className="text-gray-500">
    {post.userId}
  </div>
</div>
<div className="group relative">
  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
    <a href={"#"}>
      <span className="absolute inset-0" />
      {post.title}
    </a>
  </h3>
  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.body}</p>
</div>
<div className="relative mt-8 flex items-center gap-x-4">
  <div className="text-sm/6">
    <p className="font-semibold text-gray-900">
    </p>
  </div>
</div>
</article>
)}
    
    
    export default function PostList() {

        const [posts, setPosts] = useState ([])
        
            function getPosts(){
                fetch ("https://jsonplaceholder.typicode.com/posts")
                .then(res => res.json())
                .then(data => setPosts(data))
            }
            useEffect(() => {
                getPosts()
            }, []) 
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">From the blog</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (<PostSection key={post.id} post={post} />
        ))}
          </div>
        </div>
      </div>
    )
  }
  
  