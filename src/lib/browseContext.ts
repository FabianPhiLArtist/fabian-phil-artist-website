'use client'

import { useEffect } from 'react'

const STORAGE_KEY = 'fp:browse-context'

export type BrowseContext = {
  label: string
  href: string
  ids?: number[]
}

export function readBrowseContext(): BrowseContext | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as BrowseContext) : null
  } catch {
    return null
  }
}

export function useRememberBrowseContext(context: BrowseContext) {
  const serialized = JSON.stringify(context)
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, serialized)
    } catch {}
  }, [serialized])
}

export function RememberBrowseContext(props: BrowseContext) {
  useRememberBrowseContext(props)
  return null
}
