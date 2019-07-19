export const context = {
  loginUser: () => {
    window.localStorage.setItem(
      'userToken',
      JSON.stringify({ token: '73397c2f0e1e59d9fcd5b7616ad8af6ee641bc85' })
    )
  }
}
