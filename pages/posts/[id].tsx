import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Article } from "@components/Article";
import type { Post } from "../index"

// changing to BlogPost to avoid conflict with the Post type
export default function BlogPost ({post,
}:InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Article>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </Article>
    )
}

//generate the x possibles paths for our posts, it's very important for us to menage and improve the SEO performance later on...
export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
    const posts: Post[] = await res.json();

    const paths = posts.map((post: Post) => ({
        params: {id: post.id.toString()},
    }));
    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const { params } = context;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);

    const emptyPost: Post = {
        title: "Post not Found",
        body: "",
        id: "0",
        userId: "0",
    };

    if (!params?.id){
        return {
            props: {
                post: emptyPost,
            }
        }
    }

    const post: Post = await res.json();

    return {
        props: {
        post,
        }
    }
}