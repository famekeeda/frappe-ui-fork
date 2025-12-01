import { useState, useCallback } from 'react'

export interface NewDocOptions {
  doctype: string
  onSuccess?: (doc: any) => void
  onError?: (error: any) => void
}

export interface NewDoc<T = any> {
  doc: T | null
  loading: boolean
  error: any
  create: (values?: Partial<T>) => Promise<T | null>
  reset: () => void
}

/**
 * Hook for creating new Frappe documents
 */
export function useNewDoc<T = any>(options: NewDocOptions): NewDoc<T> {
  const [doc, setDoc] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const create = useCallback(
    async (values?: Partial<T>): Promise<T | null> => {
      const { doctype, onSuccess, onError } = options

      if (!doctype) {
        console.error('useNewDoc: doctype is required')
        return null
      }

      try {
        setLoading(true)
        setError(null)

        const payload = {
          doctype,
          ...values,
        }

        const response = await globalThis.fetch(`/api/resource/${doctype}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Frappe-CSRF-Token': getCsrfToken(),
          },
          body: JSON.stringify(payload),
          credentials: 'include',
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            errorData.message ||
              errorData._server_messages ||
              `HTTP error! status: ${response.status}`
          )
        }

        const responseData = await response.json()
        const newDoc = responseData.data || responseData.message || responseData

        setDoc(newDoc)
        onSuccess?.(newDoc)
        return newDoc
      } catch (err) {
        setError(err)
        onError?.(err)
        return null
      } finally {
        setLoading(false)
      }
    },
    [options]
  )

  const reset = useCallback(() => {
    setDoc(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    doc,
    loading,
    error,
    create,
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
