import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Popup from'reactjs-popup';
import { db, auth } from '../firebase';
import { setDoc} from 'firebase/firestore';
import {
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';



function CodeListItem({ code, user }) {
  const [userIdUsingCode, setUserIdUsingCode] = useState(null);

  const deleteCode = async (id) => {
    const codeDoc = doc(db, 'codes', id);
    
    try {
      await deleteDoc(codeDoc);
      console.log('Code deleted successfully');
    } catch (error) {
      console.error('Error deleting code:', error);
    }
  };
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
  };

  const updateCodeUsage = async (id, isUsed) => {
    const codeDoc = doc(db, 'codes', id);
    const currentUser = auth.currentUser;
    const usedByUserId = isUsed ? currentUser.uid : null;
  
    await updateDoc(codeDoc, { used: isUsed, usedByUserId: usedByUserId });
  };
  

  const updateCodeAvailability = async (id, isAvailable) => {
    const codeDoc = doc(db, 'codes', id);
    await setDoc(codeDoc, { available: isAvailable }, {merge: true});
  };


  return (
    <div className='addCodeBlock'>
      <p><b>CODE:</b> {code.code} 
      
        <CopyToClipboard text={code.code} onCopy={handleCopy}>
          <button className='copyButton'>{copied ? 'Copied!' : 'Copy Code'}</button>
        </CopyToClipboard>
      </p>
      <p> <b >DESCRIPTION:</b> {code.Description}</p>
      <p><b>COMPANY NAME:</b> {code.companyName}</p>
      <p><b>EXPIRATION DATE: </b>{code.expirationDate?.toDate().toLocaleString()}</p>
      <div>
     
          <input
            type="checkbox"
            checked={code.available}
             onChange={() => updateCodeAvailability(code.id, !code.available)}
          />
          <label>Coupon is Available</label>
        </div>
<div>
<button
  className='useCouponButton'
  onClick={() => {
    updateCodeUsage(code.id, !code.used, auth.currentUser?.uid);
    setUserIdUsingCode(auth.currentUser?.uid);
  }}
>
  {code.used && code.usedByUserId === auth.currentUser?.uid ? 'Cancel Usage' : 'Using This Coupon'}
</button>
</div>
      
      

      <button classname ='deleteButton' onClick={() => deleteCode(code.id)}>Delete</button>
      <p>
      <b>Usage Status:</b> {code.used ? (code.usedByUserId === auth.currentUser?.uid ? 'Used by you' : 'Used by someone else') : 'Not used'}
</p>

    </div>
  );
}

export default CodeListItem;
