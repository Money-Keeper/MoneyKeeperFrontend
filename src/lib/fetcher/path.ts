const baseApiPath = "/api"

const ApiPath = {
  expense: `${baseApiPath}/expenses`,
  currency: `${baseApiPath}/currencies`,
  category: `${baseApiPath}/categories`,
  user: `${baseApiPath}/users`,

  login: `${baseApiPath}/auth`,
  register: `${baseApiPath}/register`,
}

const internalApiPath = "/"

const InternalApiPath = {
  login: `${internalApiPath}/auth/login`,
  signUp: `${internalApiPath}/auth/signup`,
}

export { ApiPath, InternalApiPath }
