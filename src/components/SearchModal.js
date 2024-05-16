import "../styles/searchModal.css";
import Spinner from "./logos/Spinner";
export default function SearchModal({ isVisible }) {

    if (isVisible) {
        return (
            <div className="search-modal-container">
                <div className="search-modal">
                    <div>Searching streams...</div>
                    <div className="spinner-container">
                        <Spinner />
                    </div>
                </div>
            </div>
        )
    }
    else
        return null;

}