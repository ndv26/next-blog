import { Fragment } from "react";
import Head from "next/head";
import Hero from "../components/homepage/Hero";
import FeaturedPosts from "../components/homepage/FeaturedPosts";
import { getFeaturedPosts } from "../lib/posts-util";

export default function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>NextJS Blog</title>
                <meta
                    name="description"
                    content="Blogs about programming and web development."
                />
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts} />
        </Fragment>
    );
}

export async function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts,
        },
        revalidate: 3600,
    };
}
