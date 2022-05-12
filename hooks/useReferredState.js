import { useState, useRef, useCallback } from 'react'

export default function useReferredState(initialValue) {
  const [state, setState] = useState(initialValue)
  const reference = useRef(state)

  const setReferredState = useCallback((value) => {
    reference.current = value
    setState(value)
  }, [])

  return [state, reference, setReferredState]
}
