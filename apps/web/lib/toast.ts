import create from "zustand/vanilla"
import createStore from "zustand"
import uuid from "@lib/uuid"
import { useEffect, useRef } from "react"

interface ToastState {
  list: Toast[]
  max: number
  push: (toast: ToastDTO) => void
  remove: (id: string) => void
}

interface Toast {
  id: string
  message: string
  type: ToastType
}

type ToastType = "success" | "error" | "info" | "warning"

interface ToastDTO {
  message: string
  type: ToastType
}

const toast = create<ToastState>((set) => ({
  list: [],
  max: 2,
  push: (toast: ToastDTO) =>
    set((state) => ({
      list: [...state.list, { id: uuid("toast"), ...toast }].slice(-state.max),
    })),
  remove: (id: string) =>
    set((state) => ({ list: state.list.filter((toast) => toast.id !== id) })),
}))

const useToast = createStore(toast)

const useToastMessages = () => {
  const list = useToast((state) => state.list)
  const timeout = useRef<number>()

  useEffect(() => {
    toast.subscribe((state, prevState) => {
      if (state.list.every((x, idx) => prevState.list[idx] === x)) return

      clearTimeout(timeout.current)
      timeout.current = window.setTimeout(() => {
        state.remove(state.list[0].id)
      }, 7000)
    })

    return () => clearTimeout(timeout.current)
  }, [])

  return list
}

export default toast
export { useToastMessages, useToast }
