
import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

interface Resume {
  id: string;
  file: File;
  extractedData: string;
  base64Data: string;
}

interface JobDescription {
  data: string;
  source: 'url' | 'pdf';
}

interface AppState {
  resumes: Resume[];
  jobDescription: JobDescription | null;
  comparisonResult: string;
  loading: {
    uploadingResume: boolean;
    extractingJD: boolean;
    comparing: boolean;
  };
  sidebarOpen: boolean;
}

type AppAction =
  | { type: 'ADD_RESUME'; payload: Resume }
  | { type: 'UPDATE_RESUME_DATA'; payload: { id: string; data: string } }
  | { type: 'SET_JOB_DESCRIPTION'; payload: JobDescription }
  | { type: 'SET_COMPARISON_RESULT'; payload: string }
  | { type: 'SET_LOADING'; payload: { key: keyof AppState['loading']; value: boolean } }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'CLEAR_ALL' };

const initialState: AppState = {
  resumes: [],
  jobDescription: null,
  comparisonResult: '',
  loading: {
    uploadingResume: false,
    extractingJD: false,
    comparing: false,
  },
  sidebarOpen: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_RESUME':
      return { ...state, resumes: [...state.resumes, action.payload] };
    case 'UPDATE_RESUME_DATA':
      return {
        ...state,
        resumes: state.resumes.map(resume =>
          resume.id === action.payload.id
            ? { ...resume, extractedData: action.payload.data }
            : resume
        ),
      };
    case 'SET_JOB_DESCRIPTION':
      return { ...state, jobDescription: action.payload };
    case 'SET_COMPARISON_RESULT':
      return { ...state, comparisonResult: action.payload };
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
