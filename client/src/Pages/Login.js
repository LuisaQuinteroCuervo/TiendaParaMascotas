import React, { useState } from 'react';
import '../styles/Login&Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login'); // Estado para controlar las pestañas

  const handleTabClick = (tab) => {
    console.log('Tab seleccionada:', tab); // Verificar la pestaña activa
    setActiveTab(tab);
  };

  return (
    <div className="containerLogin">
      <div className="card">
        <div className="card-body py-5 px-md-5">
          {/* Pills navs */}
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => handleTabClick('login')}
                role="tab"
                aria-controls="pills-login"
                aria-selected={activeTab === 'login'}
              >
                Login
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => handleTabClick('register')}
                role="tab"
                aria-controls="pills-register"
                aria-selected={activeTab === 'register'}
              >
                Register
              </button>
            </li>
          </ul>

          {/* Pills content */}
          <div className="tab-content">
            {activeTab === 'login' && (
              <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form>
                <br></br>

                  <div className="form-outline mb-4">
                    <input type="email" id="loginName" className="form-control" />
                    <label className="form-label" htmlFor="loginName">Email or username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" className="form-control" />
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 d-flex justify-content-center">
                      <div className="form-check mb-3 mb-md-0">
                        <input className="form-check-input" type="checkbox" id="loginCheck" defaultChecked />
                        <label className="form-check-label" htmlFor="loginCheck">Remember me</label>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                  <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'register' && (
              <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form>
                  <br></br>

                  <div className="form-outline mb-4">
                    <input type="text" id="registerName" className="form-control" />
                    <label className="form-label" htmlFor="registerName">Name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="registerUsername" className="form-control" />
                    <label className="form-label" htmlFor="registerUsername">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" id="registerEmail" className="form-control" />
                    <label className="form-label" htmlFor="registerEmail">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="registerPassword" className="form-control" />
                    <label className="form-label" htmlFor="registerPassword">Password</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="registerRepeatPassword" className="form-control" />
                    <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-4">
                    <input className="form-check-input me-2" type="checkbox" id="registerCheck" defaultChecked />
                    <label className="form-check-label" htmlFor="registerCheck">
                      I have read and agree to the terms
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
