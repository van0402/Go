'use client'

import { useEffect } from 'react'

export const InitTheme = () => {
  useEffect(() => {
    const getImplicitPreference = () => {
      const mediaQuery = '(prefers-color-scheme: dark)'
      const mql = window.matchMedia(mediaQuery)

      if (typeof mql.matches === 'boolean') {
        return mql.matches ? 'dark' : 'light'
      }

      return null
    }

    let themeToSet = 'light'

    const preference = window.localStorage.getItem('theme')

    if (preference === 'light' || preference === 'dark') {
      themeToSet = preference
    } else {
      const implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
  }, [])

  return null
}