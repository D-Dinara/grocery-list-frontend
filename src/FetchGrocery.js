import axios from 'axios';

const URL="https://grocery-list-node-project.onrender.com"

const getAllGroceries = (setGrocery) => {
    axios.get(`${URL}`)
    .then(({data}) => {
        setGrocery(data)
    })
}

const addGrocery = (title, quantity, measure, setTitle, setQuantity, setMeasure, setGrocery, setIsOtherMeasure) => {
    axios.post(`${URL}/saveGrocery`, { title, quantity, unitOfMeasurement: measure })
    .then((data) => {
        setTitle("");
        setQuantity("");
        setMeasure("");
        getAllGroceries(setGrocery);
        setIsOtherMeasure(false);
    })
}

const editGrocery = (groceryId, title, quantity, measure, setTitle, setQuantity, setMeasure, setEditing, setGrocery, setIsOtherMeasure ) => {
    axios.post(`${URL}/editGrocery`, {_id: groceryId, title, quantity, unitOfMeasurement: measure })
    .then((data) => {
        setTitle("");
        setQuantity("");
        setMeasure("");
        setEditing(false);
        getAllGroceries(setGrocery);
        setIsOtherMeasure(false)
    })
}

const deleteGrocery = (groceryId, setGrocery) => {
    axios.post(`${URL}/deleteGrocery`, {_id: groceryId })
    .then((data) => {
        getAllGroceries(setGrocery)
    })
}

export { getAllGroceries, addGrocery, editGrocery, deleteGrocery };