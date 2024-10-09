import './VerifiedButton.css';

const VerifiedButton = () => {
  return (
<button className="button" data-text="Verified">
    <span className="actual-text">&nbsp;verified&nbsp;</span>
    <span aria-hidden="true" className="hover-text">&nbsp;verified&nbsp;</span>
</button>
  )
}

export default VerifiedButton
