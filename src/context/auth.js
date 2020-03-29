import React from 'react'

const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  // TODO: remove fake data
  state = { isAuth: true }

  constructor() {
    super()
    this.login = this.login.bind(this)
  }

  login() {
    this.setState({ isAuth: true })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login : this.login,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }