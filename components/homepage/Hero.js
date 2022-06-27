import Image from "next/image";

import classes from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/ndv.jpg"
                    alt="An image showing Vuong"
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I'm Vuong</h1>
            <p>Dummy paragraph lorem ispum dolor sit amet lorem dolor ispum.</p>
        </section>
    );
}
