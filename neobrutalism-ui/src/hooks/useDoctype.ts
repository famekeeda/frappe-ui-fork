import { useState, useCallback, useEffect, useRef } from 'react'

export interface DoctypeField {
  fieldname: string
  fieldtype: string
  label: string
  reqd?: number
  options?: string
  default?: any
}

export interface DoctypeMeta {
  name: string
  fields: DoctypeField[]
  istable?: number
  issingle?: number
  track_changes?: number
  [key: string]: any
}

export interface DoctypeOptions {
  doctype: string
  auto?: boolean
  onSuccess?: (meta: DoctypeMeta) => void
  onError?: (error: any) => void
}

export interface Doctype {
  meta: DoctypeMeta | null
  loading: boolean
  error: any
  fetch: () => Promise<void>
  getField: (fieldname: string) => DoctypeField | undefined
  reset: () => void
}

/**
 * Hook for fetching Frappe doctype metadata
 * Useful for dynamic form generation and field validation
 */
export function useDoctype(options: DoctypeOptions): Doctype {
  const [meta, setMeta] = useState<DoctypeMeta | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const optionsRef = useRef(options)
  optionsRef.current = options

  const fetch = useCallback(async () => {
    const { doctype, onSuccess, onError } = optionsRef.current

    if (!doctype) {
      console.error('useDoctype: doctype is required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await globalThis.fetch(
        `/api/method/frappe.desk.form.load.getdoctype?doctype=${encodeURIComponent(doctype)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Frappe-CSRF-Token': getCsrfToken(),
          },
          credentials: 'include',
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      const doctypeMeta = responseData.docs?.[0] || responseData.message || responseData

      setMeta(doctypeMeta)
      onSuccess?.(doctypeMeta)
    } catch (err) {
      setError(err)
      onError?.(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const getField = useCallback(
    (fieldname: string): DoctypeField | undefined => {
      return meta?.fields?.find((field) => field.fieldname === fieldname)
    },
    [meta]
  )

  const reset = useCallback(() => {
    setMeta(null)
    setError(null)
    setLoading(false)
  }, [])

  // Auto-fetch on mount if auto is true
  useEffect(() => {
    if (options.auto && options.doctype) {
      fetch()
    }
  }, [options.auto, options.doctype])

  return {
    meta,
    loading,
    error,
    fetch,
    getField,
    reset,
  }
}

// Helper to get CSRF token from cookie
function getCsrfToken(): string {
  const cookieName = 'csrf_token'
  const cookies = document.cookie.split(';')

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === cookieName) {
      return decodeURIComponent(value)
    }
  }

  return ''
}
