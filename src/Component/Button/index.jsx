import React from 'react';
import './style.scss';

const Button = ({ title, onClick }) => {
  return (
    <button
      className='w-full rounded-lg text-white text-center block font-bold cursor-pointer btn p-4 xl:p-2 md:p-2'
      onClick={() => {
        if (onClick) return onClick()
      }}
      type='submit'
    >
      {title}
    </button>
  )
}

export default Button