import { useState, useCallback, useEffect, useRef } from 'react'

export interface ResourceOptions {
  url?: string
  method?: string
  params?: Record<string, any>
  data?: any
  auto?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  transform?: (data: any) => any
}

export interface Resource<T = any> {
  data: T | null
  loading: boolean
  error: any
  fetch: (params?: Record<string, any>) => Promise<void>
  reload: () => Promise<void>
  reset: () => void
  update: (data: T) => void
}

/**
 * Hook for fetching data from Frappe backend
 * Mirrors the Resource API from Frappe UI
 */
export function useResource<T = any>(options: ResourceOptions): Resource<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const optionsRef = useRef(options)
  optionsRef.current = options

  const fetchData = useCallback(async (params?: Record<string, any>) => {
    const { url, method = 'GET', data: bodyData, transform, onSuccess, onError } = optionsRef.current

    if (!url) {
      console.error('useResource: url is required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const mergedParams = { ...optionsRef.current.params, ...params }
      const queryString = mergedParams
        ? '?' + new URLSearchParams(mergedParams).toString()
        : ''

      const response = await fetch(`${url}${queryString}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Frappe-CSRF-Token': getCsrfToken(),
        },
        body: method !== 'GET' ? JSON.stringify(bodyData) : undefined,
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      let responseData = await response.json()

      // Handle Frappe response format
      if (responseData.message !== undefined) {
        responseData = responseData.message
      }

      // Transform data if transform function provided
      if (transform) {
        responseData = transform(responseData)
      }

      setData(responseData)
      onSuccess?.(responseData)
    } catch (err) {
      setError(err)
      onError?.(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const reload = useCallback(() => {
    return fetchData(optionsRef.current.params)
  }, [fetchData])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  const update = useCallback((newData: T) => {
    setData(newData)
  }, [])

  // Auto-fetch on mount if auto is true
  useEffect(() => {
    if (options.auto && options.url) {
      fetchData()
    }
  }, [options.auto, options.url])

  return {
    data,
    loading,
    error,
    fetch: fetchData,
    reload,
    reset,
    update,
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
