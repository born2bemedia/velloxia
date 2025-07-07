import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const LangSwitcher = () => {
  const currentLang = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const switchLanguage = (value) => {
    const segments = pathname.split('/')
    segments[1] = value
    const newPath = segments.join('/')
    router.replace(newPath)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          color: '#fff',
          border: 'none',
          borderRadius: '0',
          cursor: 'pointer',
        }}
      >
        <img src={`/images/${currentLang}.svg`} />
      </button>
      {isDropdownOpen && (
        <ul
          translate="no"
          style={{
            position: 'absolute',
            top: '40px',
            left: '-16px',
            backgroundColor: '#000000D9',
            listStyle: 'none',
            padding: '16px',
            margin: 0,
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '130px',
          }}
        >
          <li
            onClick={() => switchLanguage('en')}
            style={{
              padding: '7px 0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fff',
            }}
          >
            <img src="/images/EN.svg" />
            English
          </li>
          <li
            onClick={() => switchLanguage('de')}
            style={{
              padding: '7px 0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fff',
            }}
          >
            <img src="/images/DE.svg" />
            German
          </li>
          <li
            onClick={() => switchLanguage('it')}
            style={{
              padding: '7px 0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fff',
            }}
          >
            <img src="/images/IT.svg" />
            Italian
          </li>
          <li
            onClick={() => switchLanguage('el')}
            style={{
              padding: '7px 0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fff',
            }}
          >
            <img src="/images/EL.svg" />
            Greek
          </li>
        </ul>
      )}
    </div>
  )
}

export default LangSwitcher
