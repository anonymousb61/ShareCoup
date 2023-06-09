import { collection } from 'firebase/firestore';
import React,{useEffect,useState} from 'react';
import{db, auth} from '../firebase';
import {getDocs,  addDoc, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CodeListItem from './CodeListItem';
import SearchBar from './searchbar';
import TitleBar from './titlebar';
import AddCode from './addCode';
import { Navigate, useNavigate } from 'react-router-dom';


function Dashboard() {
    const[codeList, setCodeList] = useState([]);
    const navigate = useNavigate();


    //variables for taking new inputs
    // const[newDescription, setNewDescription] = useState("");
    // const[newCode, setNewCode]= useState("");
    // const[newCompanyName, setNewCompanyName]= useState("");
    // const[newExpirationDate, setNewExpirationDate] = useState(null);
    // const[newIsUsed, setNewIsUsed]= useState(false);
    // const[newIsAvailable, setNewIsAvailable] = useState(true);

    



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
const addCode =() =>{
navigate('/addCode');
}
// const handleExpirationDateChange = (date) =>{
//     setNewExpirationDate(date);
// };

// const onSubmitCode = async() => {
//     try{
//         const userId = auth.currentUser?.uid; // getting the userId of the person who submitted the code

//         await addDoc(codesCollectionRef,
//             {Description: newDescription,
//             code: newCode,
//             companyName: newCompanyName,
//             expirationDate: newExpirationDate,
//             used: newIsUsed,
//             availaible: newIsAvailable,
//             userId: userId,
//         });
//         getCodesList();
//         setNewDescription("");
//         setNewCode("");
//         setNewCompanyName("");
//         setNewExpirationDate(null);
//         setNewIsUsed(false);
//         setNewIsAvailable(true);

//     } catch(err){
//         console.log(err);
//     }
// }
// add search bar after fixing
  return (

    <div>
       
      {/* <input placeholder='code...' value = {newCode} onChange={(e) =>setNewCode(e.target.value)}/>
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
        <button onClick={onSubmitCode}> Submit coupon code</button> */}
        <h2 className='codeListHeading '>Code List</h2>
        {codeList.map((code) => (
        <CodeListItem key={code.id} code={code}
         /> // Use the CodeListItem component
    
    ))} 
    <button className='AddButton' onClick={addCode}>Add a new Coupon</button>
    </div>
    
  )
}

export default Dashboard
