import React from 'react';
import { TrackProvider } from '@/context/TrackContext';
import EditGoalsPage from './EditGoalsPage'

const GoalsPageWrapper = () => {
  return (
    <TrackProvider>
        <EditGoalsPage/>
    </TrackProvider>
  );
};

export default GoalsPageWrapper;