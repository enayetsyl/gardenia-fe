import CustomContainer from "../Shared/CustomContainer";


const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="mb-6">
    <h3 className="text-h3 lg:text-h3-lg font-semibold text-primary mb-2">{question}</h3>
    <p className="text-text-secondary">{answer}</p>
  </div>
);

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What counts as a verified account?",
      answer: "A verified account is one that has at least one upvoted post and has completed the one-time verification process. Verified accounts get a badge and access to premium content."
    },
    {
      question: "How many posts can I create?",
      answer: "There's no limit to the number of posts you can create. You can share as much gardening knowledge as you like, whether you're verified or not."
    },
    {
      question: "What happens to my existing posts after verification?",
      answer: "All your existing posts remain unchanged. Verification allows you to create premium content and access other premium features going forward."
    },
    {
      question: "What if I haven't created any posts yet?",
      answer: "You can still browse and interact with the community. To get verified, you'll need to create at least one post that receives an upvote from another user."
    }
  ];

  return (
    <section className="bg-background-dark mx-auto px-4 py-12 rounded-lg shadow-2xl mt-8">
      <CustomContainer>
        <h2 className="text-h2 lg:text-h2-lg font-bold text-primary mb-8 text-center">Pricing FAQs</h2>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 gap-10">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </CustomContainer>
    </section>
  );
};

export default FAQSection;