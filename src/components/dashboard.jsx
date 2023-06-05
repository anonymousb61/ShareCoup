import { collection } from 'firebase/firestore';
import React,{useEffect,useState} from 'react';
import{db, auth} from '../firebase';
import {getDocs,  addDoc, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Dashboard() {
    const[codeList, setCodeList] = useState([]);


    //variables for taking new inputs
    const[newDescription, setNewDescription] = useState("");
    const[newCode, setNewCode]= useState("");
    const[newCompanyName, setNewCompanyName]= useState("");
    const[newExpirationDate, setNewExpirationDate] = useState(null);
    const[newIsUsed, setNewIsUsed]= useState(false);
    const[newIsAvailable, setNewIsAvailable] = useState(true);

    



    const codesCollectionRef = collection(db,"codes");

    // to get data from firestore database
    const getCodesList = async () => {
        try{
            const data = await getDocs(codesCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
            setCodeList(filteredData);
        }catch(err){
            console.error(err);
        }
    };
useEffect(() => {
    const unsubscribe = onSnapshot(codesCollectionRef,(snapshot) =>{
        const updatedCodeList = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setCodeList(updatedCodeList);
    }); getCodesList();
},[])

// to delete entry
// to do: only the user who created that entry should be able to delete    
    const deleteCode = async(id) =>{
        const codeDoc = doc(db, "codes", id)
        await deleteDoc(codeDoc);
    }
// update the 'used' button
const updateCodeUsage = async (id, isUsed) => {
    const codeDoc = doc(db, 'codes', id);
    await updateDoc(codeDoc, { used: isUsed });
  };

  const updateCodeAvailability = async (id, isAvailable) => {
    const codeDoc = doc(db, 'codes', id);
    await updateDoc(codeDoc, { availaible: isAvailable });
  };  

const handleExpirationDateChange = (date) =>{
    setNewExpirationDate(date);
};

const onSubmitCode = async() => {
    try{
        await addDoc(codesCollectionRef,
            {Description: newDescription,
            code: newCode,
            companyName: newCompanyName,
            expirationDate: newExpirationDate,
            used: newIsUsed,
            availaible: newIsAvailable,
            userId: auth?.currentUser?.uid,
        });
        getCodesList();
        setNewDescription("");
        setNewCode("");
        setNewCompanyName("");
        setNewExpirationDate(null);
        setNewIsUsed(false);
        setNewIsAvailable(true);

    } catch(err){
        console.log(err);
    }
}

  return (
    <div>
      <input placeholder='code...' value = {newCode} onChange={(e) =>setNewCode(e.target.value)}/>
      <input placeholder='description...' value = {newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
      <input placeholder = 'company name...' value ={newCompanyName} onChange={(e) =>setNewCompanyName(e.target.value)} />
      <div>
        <DatePicker
            selected={newExpirationDate}
            onChange={handleExpirationDateChange}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText='Select the expiration date and time of the coupon'
        />
      </div>
      <div>
          <input type="checkbox" id="isUsedCheckbox" 
          checked = {newIsUsed}
          onChange = {(e) => setNewIsUsed(e.target.checked)}/>
          <label htmlFor="isUsedCheckbox">Using Coupon
          </label>
        </div>
        <div>
          <input type="checkbox" id="isAvailableCheckbox" 
          checked = {newIsAvailable}
          onChange = {(e) => setNewIsAvailable(e.target.checked)}/>
          <label htmlFor="isUsedCheckbox">Coupon is Available
          </label>
        </div>
        <button onClick={onSubmitCode}> Submit coupon code</button>
        <h2>Code List</h2>
    {codeList.map((code) => (
      <div key={code.id}>
        <p>Code: {code.code}</p>
        <p>Description: {code.Description}</p>
        <p>Company Name: {code.companyName}</p>
        <p>Expiration Date: {code.expirationDate?.toDate().toLocaleString()}</p>
        <div>
          <input
            type="checkbox"
            checked={code.used}
            onChange={() => updateCodeUsage(code.id, !code.used)}
          />
          <label>Is Used</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={code.availaible}
            onChange={() => updateCodeAvailability(code.id, !code.availaible)}
          />
          <label>Coupon is Available</label>
        </div>
        <button onClick={() => deleteCode(code.id)}>Delete</button>
        <button onClick={() => updateCodeUsage(code.id, !code.used)}>
          {code.used ? 'Mark as Not Used' : 'Mark as Used'}
        </button>
        <button onClick={() => updateCodeAvailability(code.id, !code.availaible)}>
          {code.availaible ? 'Mark as Not Available' : 'Mark as Available'}
        </button>
      </div>
    ))}
    </div>
    
  )
}

export default Dashboard
