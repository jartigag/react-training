export const Logout = ({ userStorage }) => async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      userStorage.remove()
      resolve()
    }, 500)
  })
}
