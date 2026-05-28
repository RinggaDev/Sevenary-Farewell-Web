import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react'
import type { ReactNode } from 'react'

/**
 * Flow Stages Definition:
 * 1: Credit Screen (Logo Intro)
 * 2: Block Transition (Reveal Phase)
 * 3: Creator Screen (Wait for User Interaction)
 * 4: Memorial Landing (Main Gallery & Scrolling Active)
 */
export type FlowStage = 1 | 2 | 3 | 4

interface FlowContextProps {
    stage: FlowStage
    setStage: (stage: FlowStage) => void
    nextStage: () => void
    resetFlow: () => void
}

const FlowContext = createContext<FlowContextProps | undefined>(undefined)

const STORAGE_KEY = 'sevenary_flow_stage'

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Persistent state: Initialize from localStorage to allow resuming after refresh
    const [stage, setStageState] = useState<FlowStage>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            const parsed = saved ? parseInt(saved, 10) : 1
            return (parsed >= 1 && parsed <= 4 ? parsed : 1) as FlowStage
        } catch {
            return 1
        }
    })

    // Sync with localStorage on changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, stage.toString())
    }, [stage])

    const setStage = useCallback((newStage: FlowStage) => {
        setStageState(newStage)
    }, [])

    const nextStage = useCallback(() => {
        setStageState((prev) => {
            if (prev === 1) return 2
            if (prev === 2) return 3
            if (prev === 3) return 4
            return prev
        })
    }, [])

    const resetFlow = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY)
        setStageState(1)
    }, [])

    // Memoize the context value to prevent unnecessary re-renders of consumers
    const value = useMemo(() => ({
        stage,
        setStage,
        nextStage,
        resetFlow
    }), [stage, setStage, nextStage, resetFlow])

    return (
        <FlowContext.Provider value={value}>
            {children}
        </FlowContext.Provider>
    )
}

export const useFlowContext = () => {
    const context = useContext(FlowContext)
    if (!context) {
        throw new Error('useFlowContext must be used within a FlowProvider')
    }
    return context
}
