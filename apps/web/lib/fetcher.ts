import toast from "@lib/toast"
import Fetcher from "@mk/fetcher"

const fetcher = new Fetcher({ notificator: toast.getState() })

export default fetcher
