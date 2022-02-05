# Box

The Box is a basic layout component with limited props. This is a tool for a quick container that needs minimal styles. If more styling is needed than is offered through its props, then the Box is probably not right for you.

---

## Props

```tsx
type CommonBoxType = {
  paddingLeft?: StandardLonghandProperties['paddingLeft']
  paddingRight?: StandardLonghandProperties['paddingRight']
  paddingBottom?: StandardLonghandProperties['paddingBottom']
  paddingTop?: StandardLonghandProperties['paddingTop']
  padding?: string
  backgroundColor?: string
  textAlign?: StandardLonghandProperties['textAlign']
  flexGrow?: StandardLonghandProperties['flexGrow']
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
  UNSAFE_style?: { [key: string]: any }
  UNSAFE_className?: string
}

type FlexBoxType = {
  alignItems?: StandardLonghandProperties['alignItems']
  alignSelf?: StandardLonghandProperties['alignSelf']
  alignContent?: StandardLonghandProperties['alignContent']
  justifyItems?: StandardLonghandProperties['justifyItems']
  justifySelf?: StandardLonghandProperties['justifySelf']
  justifyContent?: StandardLonghandProperties['justifyContent']
  flexDirection?: StandardLonghandProperties['flexDirection']
  flexWrap?: StandardLonghandProperties['flexWrap']
}

type GridBoxType = {
  gap?: string
  gridTemplateColumns?: StandardLonghandProperties['gridTemplateColumns']
  gridTemplateAreas?: StandardLonghandProperties['gridTemplateAreas']
  gridTemplateRows?: StandardLonghandProperties['gridTemplateRows']
}

type BoxType = {
  display?: 'flex' | 'grid'
} & CommonBoxType &
  (FlexBoxType | GridBoxType)
```

---

## Examples
```tsx
const PaddedBox: React.FC<{}> = ({ children }) => (
  <Box padding="10px">
    {children}
  </Box>
)
```

```tsx
const CenteredFlexBox: React.FC<{}> = ({ children }) => (
  // FlexBox is just a Box with display="flex"
  <FlexBox alignItems="center" justifyContent="center">
    {children}
  </FlexBox>
)
```

```tsx
const SpacedGridBox: React.FC<{ spacing?: string }> = ({ spacing = '1rem', children }) => (
  // GridBox is just a Box with display="grid"
  <GridBox gap={spacing}>
    {children}
  </GridBox>
)
```

---

## Poor usage example
```tsx
const MyVerySpecificBox: React.FC<{}> = ({ children }) => (
  <Box 
    display="flex"
    flexDirection="column"
    padding="1rem"
    backgroundColor="#0ff"
    UNSAFE_className="MyVerySpecificBox"
    UNSAFE_styles={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }}
  >
    {children}
  </Box>
)
```

---

## Notes

- It is possible to add an UNSAFE_className or inject UNSAFE_styles, but this is generally frowned upon.
- Too many props passed might be a clue that you need something more specific than a Box.
- This is a quick and simple div, not a complex layout component.