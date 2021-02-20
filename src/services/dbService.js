'use strict'
import { utilService } from './utilService'
export const dbService = {
  query,
  get,
  remove,
  post,
  put,
  insert,
}

const ID_FIELD = '_id'

function query(collectionName) {
  let collection = utilService.loadFromStorage(collectionName)
  if (!collection) collection = []
  return Promise.resolve(collection)
}

async function get(collectionName, id) {
  const collection = await query(collectionName)
  return collection.find(curr => curr[ID_FIELD] === id)
}

async function remove(collectionName, id) {
  const collection = await query(collectionName)
  const idx = collection.findIndex(curr => curr[ID_FIELD] === id)
  if (idx === -1) throw new Error('Failed to remove')
  collection.splice(idx, 1)

  utilService.saveToStorage(collectionName, collection)
  return Promise.resolve()
}

async function post(collectionName, item) {
  const collection = await query(collectionName)
  item[ID_FIELD] = utilService.makeId()
  collection.unshift(item)
  utilService.saveToStorage(collectionName, collection)
  return Promise.resolve(item)
}

async function put(collectionName, item) {
  const collection = await query(collectionName)
  const idx = collection.findIndex(curr => curr[ID_FIELD] === item[ID_FIELD])
  if (idx === -1) throw new Error('Failed to update')
  collection[idx] = item

  utilService.saveToStorage(collectionName, collection)
  return Promise.resolve(item)
}

async function insert(collectionName, items) {
  var collection = await query(collectionName)
  items.forEach(curr => (curr[ID_FIELD] = utilService.makeId()))
  collection.push(...items)

  utilService.saveToStorage(collectionName, collection)
  return Promise.resolve()
}
