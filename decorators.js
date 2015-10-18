
// logArgs - will log all args passed to a method

function logArgs (target, key, descriptor) {
  const {value: fn} = descriptor
  descriptor.value = function(...args) {
    console.log(`INFO: arguments from "${key}" method`, ...args)
    return fn.call(target, ...args)
  }
  return descriptor
}

// logArgs - will log return of a method

function logReturn (target, key, descriptor) {
  const {value: fn} = descriptor

  descriptor.value = function(...args) {
    const ret = fn.call(target, ...args)
    console.log(`INFO: return from "${key}" method`, ret)
    return ret
  }
  return descriptor
}

// returnType - will test the type of a return

function returnType (type) {
  return (target, key, descriptor) => {
    const {value: fn} = descriptor

    descriptor.value = function(...args) {
      const ret = fn.call(target, ...args)
      const retType = typeof ret

      if (type !== retType) {
        throw TypeError(`method "${key}" returned a type ${retType} but expected a ${type} type`)
      }
      return ret
    }
    return descriptor
  }
}

// argTypes - will test the type of args pass to method

function argTypes (...types) {
  return (target, key, descriptor) => {
    const {value: fn} = descriptor

    descriptor.value = function(...args) {
      types.forEach((type, index) => {
        const argType = typeof args[index]

        if (argType !== type) {
          throw TypeError(`method "${key}" was passed a ${ordinalSuffix(index + 1)} argument with the type ${argType} but expected a ${type} type`)
        }
      })
      return fn.call(target, ...args)
    }
    return descriptor
  }
}

export {logArgs, logReturn, returnType, argTypes}

// this is just for fancier logs

function ordinalSuffix(i) {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}
