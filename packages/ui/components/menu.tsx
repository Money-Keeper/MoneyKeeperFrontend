import cva, { VariantProps } from "../cva"
import { Menu as HeadlessMenu } from "@headlessui/react"
import { ElementType, FC, Fragment, PropsWithChildren } from "react"

const menuVariants = cva("menu bg-base-100 w-56 rounded-box shadow-lg", {
  variants: {
    padding: {
      true: "p-2",
    },
    size: {
      compact: "menu-compact",
      normal: "menu-normal",
    },
    direction: {
      vertical: "menu-vertical",
      horizontal: "menu-horizontal",
    },
  },
  defaultVariants: {
    size: "normal",
  },
})

const menuItemVariants = cva("", {
  variants: {
    active: {
      true: "active",
    },
    disabled: {
      true: "disabled",
    },
    bordered: {
      none: "",
      always: "bordered",
      hover: "hover-bordered",
    },
  },
  defaultVariants: {
    bordered: "none",
  },
})

const menuTitleVariants = cva("menu-title", {})

interface MenuProps extends VariantProps<typeof menuVariants> {
  className?: string
}

const Menu = (props: PropsWithChildren<MenuProps>) => {
  const { children, className, size, direction, padding } = props

  return (
    <HeadlessMenu.Items
      as="ul"
      className={menuVariants({ className, size, direction, padding })}
    >
      {children}
    </HeadlessMenu.Items>
  )
}

interface MenuItemProps extends VariantProps<typeof menuItemVariants> {
  as?: ElementType
  onClick?: () => void
}

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = (props) => {
  const { disabled, bordered, onClick, className, as, children } = props

  return (
    <HeadlessMenu.Item as={as || Fragment} disabled={!!disabled}>
      {({ active, disabled }) => (
        <li
          className={menuItemVariants({
            className,
            active,
            disabled,
            bordered,
          })}
          onClick={onClick}
        >
          <a>{children}</a>
        </li>
      )}
    </HeadlessMenu.Item>
  )
}

interface MenuTitleProps extends VariantProps<typeof menuTitleVariants> {
  className?: string
}

const MenuTitle: FC<PropsWithChildren<MenuTitleProps>> = (props) => {
  const { className, children } = props

  return (
    <li className={menuTitleVariants({ className })}>
      <span>{children}</span>
    </li>
  )
}

Menu.Item = MenuItem
Menu.Title = MenuTitle

export default Menu
