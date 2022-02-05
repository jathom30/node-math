# useDebouncedCallback

Takes a function and returns a new function that, when called, will call the original function after a delay period expires, so long as the function hasn't been called again before the delay has expired.

---

## Ins and Outs

### Inputs

- `callback: function`
- `delay: number` <- ms delay

### Returns

- `debouncedCallback: function`

---

## Uses

useDebouncedCallback is useful for making an API call, or running an expensive calculation, only after a user has stopped typing for a bit. It could be used for any rapidly firing user input, such as scrolling, using a slider, zooming or panning on a map, etc.

Example:

```tsx
const [searchValue, setSearchValue] = useState('')
const [apiResults, setApiResults] => useState<APIResultType>()

const debouncedApiCall = useDebouncedCallback((query: string) =>{
  fetch(`https://example.com?q=${query}`)
    .then(res => res.json)
    .then(json=> setApiResults(json))
}, 200)

const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
  setSearchValue(e.target.value)
  debouncedApiCall()
}

return (
  <>
    <input value={searchValue} onChange={handleChange} />
    <ul>
      {!!apiResutls && apiResutls.map((result)=> {
        <li>{result.label}</li>
      })}
    </ul>
  </>
)
```
