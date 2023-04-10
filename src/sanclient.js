// sanity.js
import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_ID,
  dataset: 'your-dataset-name',
  useCdn: true, // set to `true` to fetch from edge cache
  apiVersion: '2023-04-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.REACT_APP_SANITY_TOKEN, // Only if you want to update content with the client
})
 

export async function getPosts() {
  const posts = await client.fetch('*[_type == "post"]')
  return posts
}

export async function createPost(post) {
  const result = client.create(post)
  return result
}

export async function updateDocumentTitle(_id, title) {
  const result = client.patch(_id).set({title})
  return result
}