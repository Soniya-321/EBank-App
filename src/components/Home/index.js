import {Component} from 'react'

import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="home-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="logo-img"
          />

          <button className="logout-btn" onClick={this.onClickLogout}>
            Logout
          </button>
        </div>
        <div className="card-section">
          <h1>Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="card-img"
          />
        </div>
      </div>
    )
  }
}

export default Home
