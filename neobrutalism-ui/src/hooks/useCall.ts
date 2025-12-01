import { useState, useCallback } from 'react'

export interface CallOptions {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export interface CallResult<T = any> {
  data: T | null
  loading: boolean
  error: any
  call: (params?: Record<string, any>) => Promise<T | null>
  reset: () => void
}

/**
 * Hook for calling Frappe backend methods
 * Similar to frappe.call() in Frappe framework
 */
export function useCall<T = any>(
  method: string,
  options?: CallOptions
): CallResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const call = useCallback(
    async (params?: Record<string, any>): Promise<T | null> => {
      if (!method) {
        console.error('useCall: method is required')
        return null
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/method/' + method, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Frappe-CSRF-Token': getCsrfToken(),
          },
          body: JSON.stringify(params || {}),
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json()

        // Handle Frappe response format
        const result = responseData.message !== undefined
          ? responseData.message
          : responseData

        setData(result)
        options?.onSuccess?.(result)
        return result
      } catch (err) {
        setError(err)
        options?.onError?.(err)
        return null
      } finally {
        setLoading(false)
      }
    },
    [method, options]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    loading,
    error,
    call,
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
