const baseApiPath = "/api/v0"
const baseNextApiPath = "/api"

const ApiPath = {
  expense: `${baseApiPath}/expenses`,
  currency: `${baseApiPath}/currencies`,
  category: `${baseApiPath}/categories`,

  signIn: `${baseNextApiPath}/auth`,
  signUp: `${baseNextApiPath}/register`,
}

export { ApiPath }
