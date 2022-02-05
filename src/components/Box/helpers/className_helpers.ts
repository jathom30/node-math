// returns appropriate class name string based on prop passed
export const createClassName = (
  className: string,
  propName: string,
  props: { [key: string]: any },
) => {
  // convert camelCase prop name to kebab-case
  const hyphenatedName = propName
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()
  // return class name as Modifier
  // ex: MyClass--display-flex
  return props[propName] && `${className}--${hyphenatedName}-${props[propName]}`
}

// returns a string of class names
export const createClassNames = (
  className: string,
  classNameProps?: string[],
  props?: { [key: string]: any },
  UNSAFE_className?: string,
) =>
  [
    className,
    UNSAFE_className && UNSAFE_className,
    // if classNameProps and props are passed,
    // then the createClassName func gets applied to each item classNameProps
    ...(classNameProps && props
      ? classNameProps.map((prop: string) =>
          createClassName(className, prop, props),
        )
      : []),
  ]
    // remove any 'undefined' strings then join and trim final string
    .filter((name) => name)
    .join(' ')
    .trimEnd()
