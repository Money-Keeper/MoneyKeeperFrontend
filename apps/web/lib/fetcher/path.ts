const baseApiPath = "/api"

const ApiPath = {
  expense: `${baseApiPath}/expenses`,
  currency: `${baseApiPath}/currencies`,
  category: `${baseApiPath}/categories`,
  user: `${baseApiPath}/users`,

  login: `${baseApiPath}/auth`,
  register: `${baseApiPath}/register`,
}

const internalApiPath = "/api"

const InternalApiPath = {
  currentUser: `${internalApiPath}/currentUser`,
}

export { ApiPath, InternalApiPath }
