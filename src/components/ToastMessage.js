import "../styles/toastMessage.css";

export default function ToastMessage({ message, isVisible }) {

    return <div className={`toast-message-container ${isVisible ? "visible" : ""}`}>
        <div className="message">{message}</div>
    </div>

}