import { useLocale } from 'next-intl'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const LangSwitcher = () => {
  const currentLang = useLocale()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
