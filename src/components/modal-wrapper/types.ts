import { ReactNode } from 'react';

export interface IModalWrapperProps {
  actionNode: ReactNode;
  children: ((api: { hide: () => void }) => React.ReactNode) | React.ReactNode;
}
