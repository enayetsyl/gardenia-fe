import './VerifiedButton.css';

const VerifiedButton = () => {
  return (
    /* From Uiverse.io by satyamchaudharydev */ 
<button className="button" data-text="Awesome">
    <span className="actual-text">&nbsp;verified&nbsp;</span>
    <span aria-hidden="true" className="hover-text">&nbsp;verified&nbsp;</span>
</button>
  )
}

export default VerifiedButton
