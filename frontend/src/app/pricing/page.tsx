import PriceFAQ from '@/Components/Pricing/PriceFAQ';
import PricingSection from '@/Components/Pricing/PricingSection';

const Pricing = () => {
  return (
    <div>
       <header className="bg-gradient-to-r from-primary via-primary-light to-secondary px-12 py-20 lg:py-32 text-center rounded-lg mb-5 shadow-2xl">
      <h1 className="text-h1 lg:text-h1-lg font-bold text-text-light mb-4">
        Pricing
      </h1>
      <p className="text-p lg:text-p-lg text-text-light max-w-2xl mx-auto">
        Maybe the simplest thing about Polymer. Our per-job pricing
        is perfect for companies small and large.
      </p>
    </header>
   <PricingSection />
   <PriceFAQ />
    </div>
  )
}




export default Pricing
