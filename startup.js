'use strict'

// This allows us to monkey patch the require statement with stage 0
// version of ESnext
require('babel/register')({stage: 0, modules: 'common'})
require('./index.js')
