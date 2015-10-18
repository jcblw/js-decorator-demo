'use strict'

import {logArgs, logReturn, returnType, argTypes} from './decorators'


class Foo {

  @logArgs
  @logReturn
  add (n, n2) {
    return n + n2
  }

  @returnType('string')
  bar () {
    return 1
  }

  @argTypes('object', 'undefined')
  qux (n) {
    return n
  }

}

const foo = new Foo()
const result = foo.add(2, 2)

foo.add(result, 1)

try {
  foo.bar()
} catch (e) {
  console.error(e)
}

try {
  foo.qux({}, {})
} catch (e) {
  console.error(e)
}
