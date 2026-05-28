import React from 'react'
import { FlowProvider, useFlowContext } from '@/store/FlowContext'
import { AudioProvider } from '@/store/AudioContext'
import { CreditScreen } from '@/components/intro/CreditScreen'
import { CreatorScreen } from '@/components/intro/CreatorScreen'
import { BlockTransition } from '@/components/intro/BlockTransition'
import { MemorialLanding } from '@/components/gallery/MemorialLanding'

const AppContent: React.FC = () => {
  const { stage } = useFlowContext()

  return (
    <>
      {stage === 1 && <CreditScreen />}
      {(stage === 2 || stage === 3) && <CreatorScreen />}
      {stage === 2 && <BlockTransition />}
      {stage === 4 && <MemorialLanding />}
    </>
  )
}

function App() {
  return (
    <FlowProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </FlowProvider>
  )
}

export default App
