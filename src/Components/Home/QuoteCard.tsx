const QuotesCard = ({ quote, by }: { quote: string; by: string }) => {
  return (
    <div className="relative rounded-lg -skew-x-6 -translate-x-2 -translate-y-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 duration-500 min-w-full !w-full h-44 p-2 bg-background-dark card-compact hover:bg-base-200 transition-all [box-shadow:12px_12px_#66bb6a] hover:[box-shadow:4px_4px_#66bb6a] cursor-pointer">
      <figure className="w-full h-full">
        <div className="bg-background-light text-primary-light min-h-full rounded-lg border border-opacity-5"></div>
      </figure>
      <div className="absolute text-primary bottom-4 left-0 px-4">
        <span className="font-bold">{by}</span>
        <p className="text-sm opacity-60 line-clamp-2">{quote}</p>
      </div>
    </div>
  );
};

export default QuotesCard;
