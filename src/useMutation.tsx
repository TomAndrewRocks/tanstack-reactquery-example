import { useMutation } from '@tanstack/react-query'
import React from 'react'

const POSTS = [
    { id: ``, title: '', email: '' },
]

type PostProps = {
    id: string;
    title: string;
    email: string;
}

export const UseMutationExample = () => {
    const [data, setData] = React.useState<PostProps[]>(POSTS)
    const [title, setTitle] = React.useState('')
    const [email, setEmail] = React.useState('')


    const createPost = (e: React.FormEvent) => {
        e.preventDefault()
        POSTS.push({
            id: crypto.randomUUID(),
            title: title,
            email: email
        })
        setData(POSTS)
        setEmail('')
        setTitle('')
        console.log(POSTS)
        return POSTS
    };

    const createPostMutation = useMutation({
        mutationFn: () => {
            return wait(1000)
                .then(() => createPost)
        },
        onError: () => {
            ``
        },
        onSuccess: () => {
            ``
        }
    })

    return (
        <div>
            {createPostMutation.isError && JSON.stringify(createPostMutation.error)}

            {data.length > 1 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {data.map((post) => (
                        <div key={post.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>title: {post.title}</span>
                            <span>email: {post.email}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <form onSubmit={createPost} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h1>CreatePost</h1>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Title</label>
                        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Email</label>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type='submit' style={{ marginTop: 20 }}>
                        Submit
                    </button>
                </form>
            )}
        </div>
    )
}

function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}