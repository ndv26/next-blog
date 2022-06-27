import { Fragment } from "react";
import Head from "next/head";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../lib/posts-util";

export default function AllPostsPage(props) {
    return (
        <Fragment>
            <Head>
                <title>All Blog Posts</title>
                <meta
                    name="description"
                    content="A list of all programming and development blog posts."
                />
            </Head>
            <AllPosts posts={props.posts} />
        </Fragment>
    );
}

export async function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
        revalidate: 3600,
    };
}
