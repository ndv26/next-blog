import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
// import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
// import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import PostHeader from "./PostHeader";
import classes from "./PostContent.module.css";

// SyntaxHighlighter.registerLanguage("js", js);
// SyntaxHighlighter.registerLanguage("css", css);

export default function PostContent({ post }) {
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customComponents = {
        p(paragraph) {
            const { node } = paragraph;

            if (node.children[0].tagName === "img") {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={image.properties.src}
                            alt={image.alt}
                            width={700}
                            height={350}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },
        code(code) {
            const { language, children } = code;

            return (
                <SyntaxHighlighter style={atomDark} language={language}>
                    {children}
                </SyntaxHighlighter>
            );
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customComponents}>
                {post.content}
            </ReactMarkdown>
        </article>
    );
}
