import React from 'react'
import { Link } from 'gatsby'
import logoBlack from '../img/logo-black.png'

const Header = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  render() {
    return (
      <header className="header">
        <div className="logo">
          <Link to="/" className="logo__link">
            <img src={logoBlack} alt="" className="logo__img" />
          </Link>
        </div>
      </header>
    )
  }
}

export default Header
