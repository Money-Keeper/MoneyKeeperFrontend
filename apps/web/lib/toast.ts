import create from "zustand/vanilla"
import createStore from "zustand"
import uuid from "@lib/uuid"

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

type ToastType = "success" | "error" | "info"

interface ToastDTO {
  message: string
  type: ToastType
}

const toast = create<ToastState>((set) => ({
  list: [],
  max: 3,
  push: (toast: ToastDTO) =>
    set((state) => ({
      list: [...state.list, { id: uuid("toast"), ...toast }].slice(-state.max),
    })),
  remove: (id: string) =>
    set((state) => ({ list: state.list.filter((toast) => toast.id !== id) })),
}))

export const useToastStore = createStore(toast)

export default toast
