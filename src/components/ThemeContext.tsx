'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type Perspective = 'investor' | 'member';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  perspective: Perspective;
  setPerspective: (perspective: Perspective) => void;
  openModal: (type?: 'franchise' | 'tour', initialFormat?: string) => void;
  closeModal: () => void;
  modalState: {
    isOpen: boolean;
    type: 'franchise' | 'tour';
    initialFormat?: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [perspective, setPerspective] = useState<Perspective>('investor');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'franchise' | 'tour';
    initialFormat?: string;
  }>({
    isOpen: false,
    type: 'franchise',
  });

  useEffect(() => {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('rawfit-theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('rawfit-theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const openModal = (type: 'franchise' | 'tour' = 'franchise', initialFormat?: string) => {
    setModalState({ isOpen: true, type, initialFormat });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        perspective,
        setPerspective,
        openModal,
        closeModal,
        modalState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
