import { useState, useCallback, useEffect, useRef } from 'react'

export interface DocOptions {
  doctype: string
  name?: string
  auto?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  whitelistedMethods?: Record<string, string>
}

export interface Doc<T = any> {
  doc: T | null
  loading: boolean
  error: any
  get: () => Promise<void>
  reload: () => Promise<void>
  setValue: (fieldname: string, value: any) => Promise<void>
  save: () => Promise<void>
  delete: () => Promise<void>
  runMethod: (method: string, params?: Record<string, any>) => Promise<any>
  reset: () => void
}

/**
 * Hook for managing Frappe documents (get, update, save, delete)
 */
export function useDoc<T = any>(options: DocOptions): Doc<T> {
  const [doc, setDoc] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const optionsRef = useRef(options)
  optionsRef.current = options

  const get = useCallback(async () => {
    const { doctype, name, onSuccess, onError } = optionsRef.current

    if (!doctype || !name) {
      console.error('useDoc: doctype and name are required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `/api/resource/${doctype}/${name}`,
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
      const docData = responseData.data || responseData.message || responseData

      setDoc(docData)
      onSuccess?.(docData)
    } catch (err) {
      setError(err)
      onError?.(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const reload = useCallback(() => {
    return get()
  }, [get])

  const setValue = useCallback(async (fieldname: string, value: any) => {
    if (!doc) {
      console.error('useDoc: No document loaded')
      return
    }

    setDoc((prevDoc) => {
      if (!prevDoc) return prevDoc
      return { ...prevDoc, [fieldname]: value }
    })
  }, [doc])

  const save = useCallback(async () => {
    const { doctype, name, onSuccess, onError } = optionsRef.current

    if (!doctype || !name || !doc) {
      console.error('useDoc: doctype, name, and doc are required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `/api/resource/${doctype}/${name}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Frappe-CSRF-Token': getCsrfToken(),
          },
          body: JSON.stringify(doc),
          credentials: 'include',
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      const savedDoc = responseData.data || responseData.message || responseData

      setDoc(savedDoc)
      onSuccess?.(savedDoc)
    } catch (err) {
      setError(err)
      onError?.(err)
    } finally {
      setLoading(false)
    }
  }, [doc])

  const deleteDoc = useCallback(async () => {
    const { doctype, name, onSuccess, onError } = optionsRef.current

    if (!doctype || !name) {
      console.error('useDoc: doctype and name are required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `/api/resource/${doctype}/${name}`,
        {
          method: 'DELETE',
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

      setDoc(null)
      onSuccess?.(null)
    } catch (err) {
      setError(err)
      onError?.(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const runMethod = useCallback(
    async (method: string, params?: Record<string, any>) => {
      const { doctype, name, whitelistedMethods } = optionsRef.current

      if (!doctype || !name) {
        console.error('useDoc: doctype and name are required')
        return null
      }

      // Check if method is whitelisted
      const methodPath = whitelistedMethods?.[method] || method

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `/api/method/${methodPath}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Frappe-CSRF-Token': getCsrfToken(),
            },
            body: JSON.stringify({
              doctype,
              name,
              ...params,
            }),
            credentials: 'include',
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json()
        return responseData.message !== undefined
          ? responseData.message
          : responseData
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const reset = useCallback(() => {
    setDoc(null)
    setError(null)
    setLoading(false)
  }, [])

  // Auto-fetch on mount if auto is true
  useEffect(() => {
    if (options.auto && options.doctype && options.name) {
      get()
    }
  }, [options.auto, options.doctype, options.name])

  return {
    doc,
    loading,
    error,
    get,
    reload,
    setValue,
    save,
    delete: deleteDoc,
    runMethod,
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
