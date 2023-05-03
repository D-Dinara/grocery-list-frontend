import { AiFillEdit, AiFillDelete } from "react-icons/ai"

const MyGrocery = ({ text, quantity, measure, updatingInInput, deleteGrocery }) => {
    return (
        <div className="my-grocery">
            <div>
                <p>{text}</p>
                <p>{quantity} {measure}</p>
            </div>
            <div>
                <AiFillEdit onClick={updatingInInput} />
                <AiFillDelete onClick={deleteGrocery} />
            </div>
        </div>
    )
}

export default MyGrocery;