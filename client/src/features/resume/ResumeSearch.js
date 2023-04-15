import { getPosts } from './ResumeLink'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import ListPage from './ResumeListPage'

function ResumeSearch() {
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    getPosts().then(json => {
      setPosts(json)
      setSearchResults(json)
    })
  }, [])



  return (
    <>
      <div class="search">
        <div class="row justify-content-center">
          <SearchBar posts={posts} setSearchResults={setSearchResults} />
        </div>
      </div>
      <ListPage searchResults={searchResults} />
    </>
  )
}

export default ResumeSearch;