'use strict'
export const utilService = {
  saveToStorage,
  loadFromStorage,
  getRandomInteger,
  makeId,
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function getRandomInteger(min = 10, max = 300) {
  return Math.floor(Math.random() * (max - min)) + min
}

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
