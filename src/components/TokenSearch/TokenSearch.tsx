import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Select, { SingleValue } from 'react-select';
import { searchToken } from 'api';
import { useDebounce } from 'hooks';
import { TokenSearchResult } from 'types';
import './TokenSearch.scss'

export const TokenSearch: React.FC<{onChange: (token: SingleValue<TokenSearchResult>) => void}> = ({onChange}) => {
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 300)

  const searchQuery = useQuery(
    ['coin', debouncedSearch],
    () => searchToken(debouncedSearch),
    {enabled: debouncedSearch !== ''},
  )

  return (
    <div className="TokenSearch">
      <span className='TokenSearch__label'>Select your token</span>
      <Select
        name="coin-search"
        inputValue={search}
        onInputChange={setSearch}
        isLoading={searchQuery.isLoading}
        isSearchable
        getOptionLabel={(option: TokenSearchResult) => `${option.name} (${option.symbol})`}
        getOptionValue={(option: TokenSearchResult) => option.id}
        options={searchQuery.data?.data.coins}
        onChange={(newToken) => onChange(newToken)}
        menuPortalTarget={document.body}
      />
    </div>
  )
}