import cva, { VariantProps } from "../cva"
import React, {
  ElementType,
  FC,
  Fragment,
  PropsWithChildren,
  ReactElement,
} from "react"
import { Transition } from "@headlessui/react"
import { Menu as HeadlessMenu } from "@headlessui/react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const dropdownVariants = cva("dropdown", {
  variants: {
    position: {
      bottom: "dropdown-bottom",
      top: "dropdown-top",
      left: "dropdown-left",
      right: "dropdown-right",
    },
    align: {
      start: "",
      end: "dropdown-end",
    },
    trigger: {
      click: "",
      hover: "dropdown-hover",
    },
  },
  defaultVariants: {
    align: "end",
    trigger: "click",
  },
})

const dropdownContentVariants = cva("dropdown-content", {})

interface DropdownProps extends VariantProps<typeof dropdownVariants> {
  className?: string
  as?: ElementType
}

const Dropdown = (props: PropsWithChildren<DropdownProps>) => {
  const { children, className, as, position, align, trigger } = props

  return (
    <HeadlessMenu
      as={as || "div"}
      className={dropdownVariants({ className, position, align, trigger })}
    >
      {children}
    </HeadlessMenu>
  )
}

interface DropdownContentProps {
  children: ReactElement<{ className?: string }>
}

const DropdownContent: FC<DropdownContentProps> = ({ children }) => {
  const childClassName = children.props.className

  // TODO: Add transition animation here
  return React.cloneElement(children, {
    className: dropdownContentVariants({ className: childClassName }),
  })
}

interface DropdownButtonProps {
  as?: ElementType
  children: ReactElement
}

const DropdownButton: FC<PropsWithChildren<DropdownButtonProps>> = ({
  as,
  children,
}) => {
  return (
    <HeadlessMenu.Button as={as || Fragment}>
      {({ open }) => React.cloneElement(children, { active: open })}
    </HeadlessMenu.Button>
  )
}

Dropdown.Content = DropdownContent
Dropdown.Button = DropdownButton

export default Dropdown
