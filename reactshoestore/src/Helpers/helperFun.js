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
  
    return `${month}-${day}-${year}, ${hours}:${minutes}:${seconds}`;
  }


  export default {
    getCurrentFormattedDate,
    genCustomUuid
  }