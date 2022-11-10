const baseApiPath = "/api/v1"

const ApiPath = {
  expense: `${baseApiPath}/expenses`,
  currency: `${baseApiPath}/currencies`,
  category: `${baseApiPath}/categories`,
  user: `${baseApiPath}/users`,
  wallets: `${baseApiPath}/wallets`,

  login: `${baseApiPath}/auth`,
  register: `${baseApiPath}/register`,
}

const internalApiPath = "/api"
const InternalApiPath = {}

export { ApiPath, InternalApiPath }
