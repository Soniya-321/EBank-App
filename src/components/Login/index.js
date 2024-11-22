import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showErrMsg: false}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showErrMsg: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showErrMsg, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="container">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-img"
            />
          </div>
          <div className="login-box-container">
            <h1>Welcome Back!</h1>
            <form onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <label htmlFor="userId">User ID</label>
                <input
                  type="text"
                  id="userId"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={this.onChangeUserId}
                />
              </div>
              <div className="input-container">
                <label htmlFor="pin">PIN</label>
                <input
                  type="password"
                  id="pin"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={this.onChangePin}
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              {showErrMsg && <p className="err-msg">{errMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
