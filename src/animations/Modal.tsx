import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '../hooks'

type ModalProps = {
  isToggled: boolean
  setIsToggled: () => void
  children: any
}

export const Modal = ({ isToggled, setIsToggled, children }: ModalProps) => {
  const ref = useRef(null!)
  useClickOutside(ref, () => setIsToggled())
  return (
    <AnimatePresence>
      {isToggled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            width: '20%',
            top: '10%',
            left: '50%',
            transform: 'translate3d(-50%, 0, 0)',
          }}
        >
          <motion.div initial={{ x: 0 }} animate={{ x: 30 }} ref={ref}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
