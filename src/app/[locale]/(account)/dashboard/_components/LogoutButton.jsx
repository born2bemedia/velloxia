'use client'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/stores/authStore'
import React from 'react'
import { useTranslations } from 'next-intl'

function LogoutButton() {
  const t = useTranslations('account')

  const { setCurrentUser } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('jwt')

    setCurrentUser(null)
    router.push('/log-in')
  }

  return (
    <li onClick={handleLogout}>
      <span>{t('logout')}</span>
    </li>
  )
}

export default LogoutButton
