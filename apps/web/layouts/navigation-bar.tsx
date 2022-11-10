import Button from "@mk/ui/components/button"
import Dropdown from "@mk/ui/components/dropdown"
import Menu from "@mk/ui/components/menu"
import UserIcon from "@mk/ui/icons/user-icon"
import LogoutIcon from "@mk/ui/icons/logout-icon"
import { useAuth, useSession } from "@features/auth"
import Link from "next/link"
import Space from "@mk/ui/components/space"

export default function NavigationBar() {
  return (
    <div className="navbar bg-base-100 px-5 justify-between shadow-md">
      <Button as={Link} intend="ghost" href="/dashboard">
        Money Keeper
      </Button>

      <Space direction="row" gap="small">
        <Button intend="accent" as={Link} href="/new-wallet">
          Create new wallet
        </Button>

        <UserDropdown />
      </Space>
    </div>
  )
}

function UserDropdown() {
  const { user, isAuthenticated } = useSession()
  const { logout } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  return (
    <Dropdown>
      <Dropdown.Button>
        <Button intend="ghost">
          <UserIcon />
          {user?.name}
        </Button>
      </Dropdown.Button>

      <Dropdown.Content>
        <Menu padding className="mt-3">
          <Menu.Item onClick={logout}>
            <LogoutIcon />
            Logout
          </Menu.Item>
        </Menu>
      </Dropdown.Content>
    </Dropdown>
  )
}
