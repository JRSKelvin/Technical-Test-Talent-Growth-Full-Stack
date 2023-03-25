import React from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

function IndexPage() {
  const router = useRouter()

  function requestLogout() {
    Swal.fire({
      icon: 'warning',
      title: 'Are You Sure?',
      text: 'Are You Sure Want To Logout?',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('accessToken')
        Swal.fire({
          icon: 'success',
          title: 'Logout Successfully',
          text: 'Account Logout Successfully',
        }).then(() => {
          router.push('/login')
        })
      }
    })
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
          <Link className="navbar-brand" href="/">
            Kelvin Talent Growth
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Contact</a>
              </li>
              {Cookies.get('accessToken') ? (
                <React.Fragment>
                  <li className="nav-item">
                    <a className="nav-link">Welcome Back ({Cookies.get('accessToken')})</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => requestLogout()}>
                      Logout
                    </a>
                  </li>
                </React.Fragment>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <header className="bg-dark py-5">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">A Place To Find Your Dream Job</h1>
                <p className="lead text-white-50 mb-4">Be Prepared To Apply For More Than 1,000 Positions Being Offered By More Than 60 Start Up Partners On A National And Worldwide Scale!</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <a className="btn btn-primary btn-lg px-4 me-sm-3">Get Started</a>
                  <a className="btn btn-outline-light btn-lg px-4">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="py-5 border-bottom" id="features">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h2 className="h4 fw-bolder">Featured Title</h2>
              <p>Paragraph Of Text Beneath The Heading To Explain The Heading. Well Add Onto It With Another Sentence And Probably Just Keep Going Until We Run Out Of Words.</p>
              <a className="text-decoration-none">Call To Action</a>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h2 className="h4 fw-bolder">Featured Title</h2>
              <p>Paragraph Of Text Beneath The Heading To Explain The Heading. Well Add Onto It With Another Sentence And Probably Just Keep Going Until We Run Out Of Words.</p>
              <a className="text-decoration-none">Call To Action</a>
            </div>
            <div className="col-lg-4">
              <h2 className="h4 fw-bolder">Featured Title</h2>
              <p>Paragraph Of Text Beneath The Heading To Explain The Heading. Well Add Onto It With Another Sentence And Probably Just Keep Going Until We Run Out Of Words.</p>
              <a className="text-decoration-none">Call To Action</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <div className="container px-5 my-5 px-5">
          <div className="text-center mb-5">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
            <h2 className="fw-bolder">Get In Touch</h2>
            <p className="lead mb-0">We Did Love To Hear From You</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div className="form-floating mb-3">
                  <input className="form-control" id="name" type="text" placeholder="Enter Your Name..." />
                  <label>Full Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="email" type="email" placeholder="name@example.com" />
                  <label>Email Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" />
                  <label>Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control" id="message" placeholder="Enter Your Message Here..." style={{ height: '10rem' }}></textarea>
                  <label>Message</label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-3 bg-dark">
        <div className="container px-5">
          <p className="m-0 text-center text-white">Copyright &copy; 2023 &mdash; Kelvin</p>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default IndexPage
