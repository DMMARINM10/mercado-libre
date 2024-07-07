'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';
import searchIcon from '@/assets/search-icon.png';
import styles from '@/styles/components/searchBar.module.scss';

const SearchBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const pathSearch = pathname === '/items'
  const [inputValue, setInputValue] = useState(pathSearch ? search : '')

  const handleSearch = () => {
    const value = inputValue.trim()
    if(value) router.push(`/items?search=${value}`)
  }

  const handleEnter = (e) => {
    if(e.code === 'Enter') handleSearch()
  }

  useEffect(() => {
    if(!pathSearch) setInputValue('')
  }, [pathSearch])
  

  return (
    <header className={styles['search-bar-container']}>
        <Image 
          width={50}
          src={logoImg}
          alt='Mercado Libre Logo' 
          priority 
          onClick={() => router.push('/')}
          className='logo'
        />
        <fieldset>
            <label htmlFor="input-search-bar" hidden />
            <input 
              type="text" 
              id='input-search-bar' 
              placeholder='Nunca dejes de buscar' 
              value={inputValue}
              onKeyDown={handleEnter}
              onChange={(e) => setInputValue(e.target.value.trimStart())}
            />
            <button onClick={handleSearch}>
                <Image width={15} src={searchIcon} alt='Search icon' priority />
            </button>
        </fieldset>
    </header>
  )
}

export default SearchBar