import Head from 'next/head'
import Link from 'next/link'
import styled from "@emotion/styled"
import { InferGetStaticPropsType } from "next"; 

const Container = styled.div`
  padding: 0 2rem;  
`;
const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BlogTitle = styled.h1`
  color: #0070f3;
  text-decoration: none;
`;
const List = styled.ul`
  list-style: square;
`
const ListItem = styled.li`
  padding: 10px;
  text-transform: capitalize;
  margin: 40px 0;
  cursor: pointer;
  color: #FAFAFA;
  &:hover {
    background-color: #383838;
  }
`
const PostTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`
 
const title: string = "PAV Blog" 

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <Head>
        <title>PAV blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <BlogTitle>{title}</BlogTitle>
        <List>
          {posts.map((post : Post) => (
            // eslint-disable-next-line react/jsx-key
            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
              <ListItem key={post.id}>
                <PostTitle>{post.title}</PostTitle>
              </ListItem>
            </Link>
          ))}
        </List>
      </Main>
    </Container>
  )
}

export type Post = {
  [x: string]: any;
  userId: string;
  id: string;
  title: string;
  body: string;
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const posts: Post = await res.json();

  return {
    props: {
      posts,
    }
  }
}