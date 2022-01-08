import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/solid';


interface IErrorMessage {
  message?: string;
}
 
const ErrorMessage: React.FC<IErrorMessage> = ({ message }) => {
  return ( 
    <small className="text-sm flex items-center mt-1">
      <InformationCircleIcon className="h-4 w-4 text-red-500 mr-1" /> {message}
    </small>
   );
}
 
export default ErrorMessage;