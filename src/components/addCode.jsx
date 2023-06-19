import { collection } from 'firebase/firestore';
import React,{useEffect,useState} from 'react';
import{db, auth} from '../firebase';
import {getDocs,  addDoc, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CodeListItem from './CodeListItem';

function AddCode() {
      //variables for taking new inputs
      const[newDescription, setNewDescription] = useState("");
      const[newCode, setNewCode]= useState("");
      const[newCompanyName, setNewCompanyName]= useState("");
      const[newExpirationDate, setNewExpirationDate] = useState(null);
      const[newIsUsed, setNewIsUsed]= useState(false);
      const[newIsAvailable, setNewIsAvailable] = useState(true);
      const [newAddedByUserId, setNewAddedByUserId] = useState(null);
      const [submissionStatus, setSubmissionStatus] = useState('');
      const codesCollectionRef = collection(db,"codes");
      
      const handleExpirationDateChange = (date) =>{
        setNewExpirationDate(date);
    };
    


    const onSubmitCode = async () => {
      try {
        const currentUser = auth.currentUser;
        const addedByUserId = currentUser ? currentUser.uid : null;
        const usedByUserId = newIsUsed ? currentUser.uid : null;
    
        await addDoc(codesCollectionRef, {
          Description: newDescription,
          code: newCode,
          companyName: newCompanyName,
          expirationDate: newExpirationDate,
          used: newIsUsed,
          availaible: newIsAvailable,
          addedByUserId: addedByUserId,
          usedByUserId: usedByUserId,
        });
    
        setNewDescription('');
        setNewCode('');
        setNewCompanyName('');
        setNewExpirationDate(null);
        setNewIsUsed(false);
        setNewIsAvailable(true);
        setNewAddedByUserId(null);
        setSubmissionStatus('Thank you for submitting the code!');

      } catch (err) {
        console.log(err);
      }

    };
    
  return (
    <div>
      <h2>Add your extra coupons here</h2>
      <input placeholder='coupon code...' value = {newCode} onChange={(e) =>setNewCode(e.target.value)}/>
      <input placeholder='description of coupon...' value = {newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
      <input placeholder = 'name of company...' value ={newCompanyName} onChange={(e) =>setNewCompanyName(e.target.value)} />
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
        <div><input type="hidden" value={newAddedByUserId} onChange={(e) => setNewAddedByUserId(e.target.value)} />
</div>
        <div>
          <input type="checkbox" id="isAvailableCheckbox" 
          checked = {newIsAvailable}
          onChange = {(e) => setNewIsAvailable(e.target.checked)}/>
          <label htmlFor="isUsedCheckbox">Coupon is Available
          </label>
        </div>
        <button onClick={onSubmitCode}> Submit coupon code</button>
        {submissionStatus && <p>{submissionStatus}</p>}

    </div>
  )
}

export default AddCode
