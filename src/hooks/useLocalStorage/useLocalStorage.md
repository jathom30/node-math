# useLocalStorage

Save state to local storage so it persists upon browser refresh/reload

---

## A SPECIAL NOTE

For the safety of our user and, ultimately, the company, never use this hook to save the user's personal information such as credit card numbers, passwords, etc

---

## Ins and Outs

### Inputs

- `intialValue: any`
- `key: string`

### Returns

- `state: any`
- `setState: (value: any) => void`

---

## Uses

useLocalStorage should be used when the state should persist between page reloads.

```tsx
const [paid, setPaid] = useLocalStorage(false, 'paid')

return (
  <button onClick={() => setPaid(true)}>Pay now</button>
)

// if user refreshes the page after paid is set to true,
// paid will not default back to false
```