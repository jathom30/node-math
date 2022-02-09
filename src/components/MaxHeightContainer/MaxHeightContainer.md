# Max Height Container Component

Component that adds a uniform style for a full size container. Wraps and styles a header and footer with the appropriate content inside of it.

### Props

- `header?: ReactNode`
- `footer?: ReactNode`
- `fullHeight?: boolean`

---

## Uses

This is a fairly simple container that will insure that your styles and spacing of headers and footers inside of a one-page application.

```tsx
<MaxHeightContainer
  fullHeight
  header={
    <div className="Section__header">
      <FlexBox alignItems="center" justifyContent="space-between">
        <Text weight="bold" on="grey-100" size="xxl">
          {title}
        </Text>
        <div className="Section__actions">{actions}</div>
      </FlexBox>
    </div>
  }
>
  <div className="Section__body">
    <div className="Section__spacer" />
    {children}
  </div>
</MaxHeightContainer>
```
