import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/solid';


interface IErrorMessage {
  message?: string;
}
 
const ErrorMessage: React.FC<IErrorMessage> = ({ message }) => {
  return ( 
    <small className="text-sm flex items-center mt-2">
      <InformationCircleIcon className="h-4 w-4 text-red-500 mr-1" /> 
      <span className="text-gray-600">{message}</span>
    </small>
   );
}
 
export default ErrorMessage;