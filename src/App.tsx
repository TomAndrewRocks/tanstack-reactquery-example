import React from 'react'
import { UseQueryExample } from './useQuery';
import { UseMutationExample } from './useMutation';

export const App = () => {
  const [showQuery, setQuery] = React.useState(false)
  const [showMutation, setMutation] = React.useState(false)

  React.useEffect(() => {
    if (showQuery) {
      setMutation(false)
    }
  }, [showQuery])

  React.useEffect(() => {
    if (showMutation) {
      setQuery(false)
    }
  }, [showMutation])

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>React Query Example</h1>
      <div style={{
        display: 'flex',
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        justifyContent: 'space-between',
        height: 200
      }}>
        <div style={{
          display: 'flex',
          gap: 20,
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <button onClick={() => {
            setTimeout(() => {
              setQuery(!showQuery)
            }, 200);
          }}>
            useQuery: {!showQuery ? 'display' : 'hide'}
          </button>
          <button onClick={() => {
            setTimeout(() => {
              setMutation(!showMutation)
            }, 200);
          }}>
            useMutation: {!showMutation ? 'display' : 'hide'}
          </button>
        </div>
        <div>
          {showQuery && <UseQueryExample />}
          {showMutation && <UseMutationExample />}
        </div>
      </div>
    </div>
  )
}
