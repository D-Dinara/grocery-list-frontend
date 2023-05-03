import { useEffect, useState } from 'react';
import './App.css';
import MyGrocery from './MyGrocery';
import { addGrocery, getAllGroceries, editGrocery, deleteGrocery } from './FetchGrocery';

function App() {
  const [myGrocery,setGrocery] = useState([]);
  const [title,setTitle] = useState("");
  const [quantity,setQuantity] = useState("");
  const [measure,setMeasure] = useState("");
  const [editing,setEditing] = useState(false);
  const [groceryId,setGroceryId] = useState("")
  const [isOtherMeasure, setIsOtherMeasure] = useState(false)

  useEffect(() => {
    getAllGroceries(setGrocery)
  },[])

  const updatingInInput = (_id, title, quantity, measure) => {
    setEditing(true);
    setTitle(title);
    setQuantity(quantity);
    setMeasure(measure);
    setGroceryId(_id);
    setIsOtherMeasure(false);
  }

  const measurementOptions = ['g', 'kg', 'lb', 'items', 'L', 'mL', 'dozens'];

  const handleMeasureChange = (e) => {
    const selectedMeasure = e.target.value;
    if (selectedMeasure === 'other') {
      setMeasure('');
      setIsOtherMeasure(true);
    } else {
      setMeasure(selectedMeasure);
      setIsOtherMeasure(false);
    }
  };

  const handleOtherMeasureChange = (e) => {
    setMeasure(e.target.value);
  };

  return (
    <div className="App">
      <h1>Grocery List</h1>
      <input 
      type="text"
      placeholder="Enter an item"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />
      <input 
      type="number"
      placeholder="Quantity"
      value={quantity >= 1 ? quantity : ""}
      onChange={(e) => setQuantity(e.target.value)}
      />
    
    {isOtherMeasure ? (
        <div>
          <select value={measure} onChange={handleMeasureChange}>
            {measurementOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Enter a unit of measurement"
            value={measure}
            onChange={handleOtherMeasureChange}
          />
        </div>
      ) : (
        <select value={measure} onChange={handleMeasureChange}>
          <option value="" disabled defaultValue>
            Select a unit of measurement
          </option>
          {measurementOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      )}

      <button 
      disabled={!title || !quantity || quantity < 1} 
      onClick=
      {editing ? () => 
        editGrocery(groceryId, title, quantity, measure, setTitle, setQuantity, setMeasure, setEditing, setGrocery, setIsOtherMeasure) : 
        () => addGrocery(title, quantity, measure, setTitle, setQuantity, setMeasure, setGrocery, setIsOtherMeasure)
      }>
        {editing ? "Edit" : "Add"}
      </button>

      {myGrocery.map((item) => 
      <MyGrocery 
      text={item.title} 
      quantity={item.quantity} 
      measure={item.unitOfMeasurement} 
      key={item._id}
      updatingInInput = {() => updatingInInput(item._id, item.title, item.quantity, item.unitOfMeasurement)}
      deleteGrocery = {() => deleteGrocery(item._id, setGrocery)}
      />)}
    </div>
  );
}

export default App;
