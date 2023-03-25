import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Image } from 'react-bootstrap'
import { AiOutlineLogin, AiOutlineUser } from 'react-icons/ai'
import Swal from 'sweetalert2'

function LoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    if (Cookies.get('accessToken')) {
      router.push('/')
    }
  })

  function requestLogin() {
    if (email && password) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
          new URLSearchParams({
            email: email,
            password: password,
          })
        )
        .then((data) => {
          if (data.status >= 200 && data.status <= 299) {
            Swal.fire({
              icon: 'success',
              title: 'Login Successfully',
              text: `Welcome Back ${data.data.data.name}`,
            }).then(() => {
              router.push('/')
            })
            Cookies.set('accessToken', data.data.data.email, { expires: 1 })
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
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  <div className="mb-3">
                    <label className="mb-2 text-muted">E-Mail Address</label>
                    <input id="email" type="email" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} required />
                    <div className="invalid-feedback">Email Is Invalid</div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted">Password</label>
                      <Link href="/forgot" className="float-end text-dark">
                        Forgot Password?
                      </Link>
                    </div>
                    <input id="password" type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} required />
                    <div className="invalid-feedback">Password Is Required</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input type="checkbox" name="remember" id="remember" className="form-check-input" />
                      <label className="form-check-label">Remember Me</label>
                    </div>
                    <button className="btn btn-primary ms-auto" onClick={() => requestLogin()}>
                      Login
                    </button>
                  </div>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    {'Do Not Have An Account? '}
                    <Link href="/register" className="text-dark">
                      Create One
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

export default LoginPage
