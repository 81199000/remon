import React from 'react'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 你的其他内容组件 */}
      <Footer />
    </div>
  )
}

export default App 