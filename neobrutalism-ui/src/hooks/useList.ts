import { useState, useCallback, useEffect, useRef } from 'react'

export interface ListOptions {
  doctype: string
  fields?: string[]
  filters?: Record<string, any>
  orderBy?: string
  start?: number
  pageLength?: number
  auto?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export interface ListResult<T = any> {
  data: T[]
  loading: boolean
  error: any
  hasNextPage: boolean
  hasPreviousPage: boolean
  fetch: () => Promise<void>
  reload: () => Promise<void>
  next: () => Promise<void>
  previous: () => Promise<void>
  setFilters: (filters: Record<string, any>) => void
  setOrderBy: (orderBy: string) => void
  reset: () => void
}

/**
 * Hook for fetching and managing lists of Frappe documents
 * with pagination, filtering, and sorting
 */
export function useList<T = any>(options: ListOptions): ListResult<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [start, setStart] = useState(options.start || 0)
  const [filters, setFiltersState] = useState(options.filters || {})
  const [orderBy, setOrderByState] = useState(options.orderBy || 'modified desc')
  const [hasMore, setHasMore] = useState(true)

  const optionsRef = useRef(options)
  optionsRef.current = options

  const pageLength = options.pageLength || 20

  const fetchList = useCallback(async () => {
    const { doctype, fields, onSuccess, onError } = optionsRef.current

    if (!doctype) {
      console.error('useList: doctype is required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const params: Record<string, any> = {
        doctype,
        fields: JSON.stringify(fields || ['*']),
        filters: JSON.stringify(filters),
        order_by: orderBy,
        start,
        page_length: pageLength,
      }

      const queryString = new URLSearchParams(params).toString()

      const response = await globalThis.fetch(
        `/api/resource/${doctype}?${queryString}`,
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
      const listData = responseData.data || responseData.message || []

      setData(listData)
      setHasMore(listData.length >= pageLength)
      onSuccess?.(listData)
    } catch (err) {
      setError(err)
      onError?.(err)
    } finally {
      setLoading(false)
    }
  }, [start, filters, orderBy, pageLength])

  const reload = useCallback(() => {
    setStart(0)
    return fetchList()
  }, [fetchList])

  const next = useCallback(async () => {
    if (!hasMore) return
    setStart((prev) => prev + pageLength)
  }, [hasMore, pageLength])

  const previous = useCallback(async () => {
    setStart((prev) => Math.max(0, prev - pageLength))
  }, [pageLength])

  const setFilters = useCallback((newFilters: Record<string, any>) => {
    setFiltersState(newFilters)
    setStart(0)
  }, [])

  const setOrderBy = useCallback((newOrderBy: string) => {
    setOrderByState(newOrderBy)
    setStart(0)
  }, [])

  const reset = useCallback(() => {
    setData([])
    setError(null)
    setLoading(false)
    setStart(0)
    setFiltersState(optionsRef.current.filters || {})
    setOrderByState(optionsRef.current.orderBy || 'modified desc')
  }, [])

  // Auto-fetch on mount or when dependencies change
  useEffect(() => {
    if (options.auto && options.doctype) {
      fetchList()
    }
  }, [options.auto, options.doctype, start, filters, orderBy, fetchList])

  return {
    data,
    loading,
    error,
    hasNextPage: hasMore,
    hasPreviousPage: start > 0,
    fetch: fetchList,
    reload,
    next,
    previous,
    setFilters,
    setOrderBy,
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
