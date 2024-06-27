import "../styles/searchModal.css";
import ModalContainer from "./ModalContainer";
import Spinner from "./logos/Spinner";
export default function SearchModal({ isVisible }) {

    const searchModal =
        <div className="search-modal">
            <div>Searching streams...</div>
            <div className="spinner-container">
                <Spinner />
            </div>
        </div>

    return isVisible ? <ModalContainer content={searchModal} /> : null;

}