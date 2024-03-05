<nav className="navbar navbar-expand-lg bg-secondary  fixed-top" data-bs-theme="black">
        <div className="container-fluid">
          <Link className="nav-brand" to="/">
            Sashakt
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
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
  