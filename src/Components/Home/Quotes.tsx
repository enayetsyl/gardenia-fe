import React from 'react'
import CustomContainer from '../Shared/CustomContainer'
import QuotesCard from './QuoteCard'
import { gardeningQuotes } from '@/constant'

const Quotes = () => {
  return (
    <div className="bg-white">
      <CustomContainer>
      <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10 ">
        Quotes
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10 justify-items-center'>
    
        {gardeningQuotes.map((quote, index) => (
          <QuotesCard key={index} quote={quote.quote} by={quote.by} />
        ))}


      </div>


      </CustomContainer>
    </div>
  )
}

export default Quotes
