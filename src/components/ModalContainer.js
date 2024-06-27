export default function ModalContainer({ content, onOutsideClick }) {

    const modalContainerStyle = {
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.486)",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    const handleOutsideClick = (e) => {
        if (e.target.className === "modal-container" && onOutsideClick) {
            e.preventDefault();
            onOutsideClick();
        }
    }

    return <div style={modalContainerStyle} className="modal-container" onClick={(e) => handleOutsideClick(e)}>
        {content}
    </div>
}