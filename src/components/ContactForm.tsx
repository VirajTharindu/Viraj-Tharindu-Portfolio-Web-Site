import { useState, FormEvent } from "react";

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mjyvewjw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-surface p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted hover:text-primary"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-border rounded p-2"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="border border-border rounded p-2"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-primary text-primary-foreground rounded py-2 px-4 hover:bg-primary/90"
          >
            {status === "sending" ? "Sending..." : "Send"}
          </button>
        </form>
        {status === "sent" && (
          <p className="text-success mt-2">Message sent! Thank you.</p>
        )}
        {status === "error" && (
          <p className="text-danger mt-2">Failed to send. Please try again.</p>
        )}
      </div>
    </div>
  );
}
