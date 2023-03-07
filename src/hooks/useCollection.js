import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config"


export const useCollection = (c, queryOptions) => {
  const [documents, setDocuments] = useState(null);

  const q = useRef(queryOptions).current;
  
    useEffect(()=>{
      let ref = collection(db, c );
      if(q){
        ref = query(ref, where(...q))
      }
      const unsub = onSnapshot(ref, (snapshot)=>{
        let results = [];
        snapshot.docs.forEach((doc)=>{
          results.push({id: doc.id, ...doc.data()});
        })
        setDocuments(results);
      })
      return () => unsub();
    },[c,q])


  const addDocu = async (docu) => {
    let ref = collection(db, c);
    await addDoc(ref, docu)
  }

  const delDocu = async (id) => {
    let docRef = doc(db, c, id);
    await deleteDoc(docRef);
  }

  return {documents, addDocu, delDocu}
}