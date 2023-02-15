export type CallbackFunction = (...args: any[]) => void

export class EventBus {
  private readonly listeners: Record<string, CallbackFunction[]>
  private static instance: EventBus

  static getInstance() {
    return EventBus.instance
  }

  constructor() {
    this.listeners = {}
    EventBus.instance = this
  }

  on(event: string, callback: CallbackFunction) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: CallbackFunction) {
    if (!this.listeners[event]) {
      throw new Error(`Event not found : ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit<T>(event: string, ...args: T[]) {
    if (!this.listeners[event]) {
      throw new Error(`Event not found : ${event}`)
    }

    this.listeners[event].forEach(listener => listener(...args))
  }
}
