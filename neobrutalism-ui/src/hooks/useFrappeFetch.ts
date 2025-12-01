import { useState, useCallback } from 'react'

export interface FrappeFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export interface FrappeFetch {
  data: any
  loading: boolean
  error: any
  fetch: (url: string, options?: FrappeFetchOptions) => Promise<any>
  reset: () => void
}

/**
 * Low-level hook for making authenticated requests to Frappe API
 * Handles CSRF tokens, credentials, and Frappe response format automatically
 */
export function useFrappeFetch(): FrappeFetch {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const fetch = useCallback(
    async (url: string, options: FrappeFetchOptions = {}): Promise<any> => {
      const {
        method = 'GET',
        headers = {},
        onSuccess,
        onError,
      } = options

      try {
        setLoading(true)
        setError(null)

        const defaultHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          'X-Frappe-CSRF-Token': getCsrfToken(),
        }

        const mergedHeaders = {
          ...defaultHeaders,
          ...headers,
        }

        const response = await globalThis.fetch(url, {
          method,
          headers: mergedHeaders,
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

        // Handle Frappe response format
        let result = responseData
        if (responseData.message !== undefined) {
          result = responseData.message
        } else if (responseData.data !== undefined) {
          result = responseData.data
        }

        setData(result)
        onSuccess?.(result)
        return result
      } catch (err) {
        setError(err)
        onError?.(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
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
    fetch,
    reset,
  }
}

/**
 * Standalone function for making Frappe API calls
 * Useful for one-off requests without hook state management
 */
export async function frappeFetch(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    headers?: Record<string, string>
    body?: any
  } = {}
): Promise<any> {
  const { method = 'GET', headers = {}, body } = options

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Frappe-CSRF-Token': getCsrfToken(),
  }

  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  }

  const response = await globalThis.fetch(url, {
    method,
    headers: mergedHeaders,
    body: body ? JSON.stringify(body) : undefined,
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

  // Handle Frappe response format
  if (responseData.message !== undefined) {
    return responseData.message
  } else if (responseData.data !== undefined) {
    return responseData.data
  }

  return responseData
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
