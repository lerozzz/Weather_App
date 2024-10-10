import CloseIcon from "./CloseIcon";

const ButtonClose = ({ removeWidget }) => {
    return (
        <button className="button-close"
            onClick={removeWidget}>
            <CloseIcon />
        </button>
    );
};
export default ButtonClose;