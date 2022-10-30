import React, { FC, PropsWithChildren } from "react"

function createContext<ContextType>(name: string, defaultValue?: ContextType) {
  const Context = React.createContext<ContextType | undefined>(defaultValue)

  Context.displayName = name

  const useContext = () => {
    const context = React.useContext(Context)

    if (typeof context === "undefined") {
      const error = new Error(
        `useContext related to ${name} used without context Provider`,
      )
      error.name = "ContextError"
      throw error
    }

    return context
  }

  const Provider: FC<PropsWithChildren<ContextType>> = ({
    children,
    ...rest
  }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(() => rest, Object.values(rest)) as ContextType

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  return [Provider, useContext] as const
}

export default createContext
