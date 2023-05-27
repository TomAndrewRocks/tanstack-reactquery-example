import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'

const POSTS = [
    { id: `1`, title: 'AAAAAA' },
    { id: `2`, title: 'BBBBBB' }
]

type PostProps = {
    id: string;
    title: string;
}

export const UseQueryExample = () => {
    const [data, setData] = React.useState<PostProps[]>(POSTS)
    const postsQuery = useQuery({
        queryKey: ['posts'],
        queryFn: () => wait(1000)
            .then(() => [...POSTS])
    })

    const newPost = useMutation({
        mutationFn: (title: string) => {
            return wait(1000)
                .then(() => {
                    POSTS.push({ id: crypto.randomUUID(), title })
                    setData(POSTS)
                }
                )
        },
        onError: () => {
            ``
        },
        onSuccess: () => {
            ``
        }
    })

    if (postsQuery.isLoading) return <h1>Loading...</h1>

    return (
        <div style={{ display: `flex`, flexDirection: `column`, gap: 12, textAlign: `center`, width: 100 }}>
            {data.slice(0, 5).map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
            <button
                disabled={newPost.isLoading || data.length > 4}
                onClick={() => newPost.mutate(`New Title`)}>
                {data.length > 4 ? 'Full' : (
                    newPost.isLoading ? 'Loading...' : 'Add'
                )}
            </button>
        </div>
    )
}

function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}
