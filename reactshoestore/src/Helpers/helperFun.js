import {v4 as uuidv4 }from 'uuid'

function genCustomUuid(){
    return uuidv4().split('-')[0].toUpperCase()
}

function getCurrentFormattedDate() {
    const now = new Date();
  
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function formattingFoneNumbers(input){
      
    input = input.replace(/\D/g, "");

    // Format the input as (XXX)-XXX-XXXX
    if (input.length > 6) {
      input = `(${input.slice(0, 3)})-${input.slice(3, 6)}-${input.slice(6, 10)}`;
    } else if (input.length > 3) {
      input = `(${input.slice(0, 3)})-${input.slice(3, 6)}`;
    } else if (input.length > 0) {
      input = `(${input}`;
    }
    return input
  }


  export default  {
    getCurrentFormattedDate,
    genCustomUuid,
    formattingFoneNumbers

  }