import { useRef, useEffect } from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback as () => void
  })

  useEffect(() => {
    function tick() {
      if (savedCallback.current !== undefined) {
        return savedCallback.current()
      }
    }

    let id = setInterval(tick, delay)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
