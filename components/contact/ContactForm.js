import { useState, useEffect } from "react";
import Notification from "../ui/notification";
import classes from "./ContactForm.module.css";

export default function ContactForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (requestStatus === "success" || requestStatus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestStatus(null);
            }, 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();

        // add client side validation
        setRequestStatus("pending");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    name,
                    message,
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = response.json();
            if (!response.ok) {
                throw new Error(data.message || "Something went wrong!");
            }
            setRequestStatus("success");
            setEmail("");
            setName("");
            setMessage("");
        } catch (error) {
            setRequestStatus("error");
            setError(error.message);
        }
    }

    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on its way!",
        };
    }

    if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message sent successfully",
        };
    }

    if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Error!",
            message: error,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                    />
                </div>
                <div className={classes.actions}>
                    <button>Send message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}
