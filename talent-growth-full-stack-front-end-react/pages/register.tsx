import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Image } from 'react-bootstrap'
import { AiOutlineLogin, AiOutlineUser } from 'react-icons/ai'
import Swal from 'sweetalert2'

function RegisterPage() {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const router = useRouter()

  function requestRegister() {
    if (fullName && email && password && confirmPassword) {
      if (password == confirmPassword) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
            new URLSearchParams({
              name: fullName,
              email: email,
              password: password,
            })
          )
          .then((data) => {
            if (data.status >= 200 && data.status <= 299) {
              Swal.fire({
                icon: 'success',
                title: 'Registered Successfully',
                text: 'Account Registered Successfully',
              }).then(() => {
                router.push('/login')
              })
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Something Is Wrong',
              text: error,
            })
          })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Password Mismatch',
          text: 'Password And Confirm Password Not Matching',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Fill All Blanks',
        text: 'Please Fill All Required Blanks',
      })
    }
  }

  return (
    <React.Fragment>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
                <AiOutlineLogin size={70} />
                <Image src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" className="mx-4" alt="logo" width="100" />
                <AiOutlineUser size={70} />
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                  <div className="mb-3">
                    <label className="mb-2 text-muted">Full Name</label>
                    <input id="name" type="text" className="form-control" name="name" onChange={(e) => setFullName(e.target.value)} required />
                    <div className="invalid-feedback">Name Is Required</div>
                  </div>
                  <div className="mb-3">
                    <label className="mb-2 text-muted">E-Mail Address</label>
                    <input id="email" type="email" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} required />
                    <div className="invalid-feedback">Email Is Invalid</div>
                  </div>
                  <div className="mb-3">
                    <label className="mb-2 text-muted">Password</label>
                    <input id="password" type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} required />
                    <div className="invalid-feedback">Password Is Required</div>
                  </div>
                  <div className="mb-3">
                    <label className="mb-2 text-muted">Confirm Password</label>
                    <input id="confirm-password" type="password" className="form-control" name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <div className="invalid-feedback">Password Is Required</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-primary ms-auto" onClick={() => requestRegister()}>
                      Register
                    </button>
                  </div>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    {'Do Have An Account? '}
                    <Link href="/login" className="text-dark">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5 text-muted">Copyright &copy; 2023 &mdash; Kelvin</div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default RegisterPage
