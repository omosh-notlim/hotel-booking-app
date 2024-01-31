import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up to get the best deals</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
