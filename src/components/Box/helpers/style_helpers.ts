// returns object of style props after excluding props not meant for inline styles
export const createStyleProps = (
  props: { [key: string]: any },
  exclusionArray?: string[],
) =>
  // create array of props keys
  (Object.keys(props) as Array<keyof typeof props>)
    // filter out anything that is in the optional exclusion array
    .filter((prop: keyof typeof props) =>
      exclusionArray?.every((p: string) => p !== prop),
    )
    // reduce back down to a single object to be injected as inline styles
    .reduce(
      (acc: Partial<typeof props>, key: keyof typeof props) => ({
        ...acc,
        [key]: props[key],
      }),
      {},
    )

// returns an object that can be read as inline styles
export const createStyles = (
  props: { [key: string]: any },
  exclusionArray: string[],
  UNSAFE_style?: { [key: string]: any },
) => ({
  ...createStyleProps(props, exclusionArray),
  ...UNSAFE_style,
})
