import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary fixed-top" data-bs-theme="black">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Sashakt
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/games">
                  Games
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/videos">
                  Videos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedback">
                  Feedback
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chat">
                  Chatbot
                </Link>
              </li>
          </ul>
          <form className="Sign">  
            <Link className="btn btn-primary mx-1" to="/signin" role="button">Signin</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
