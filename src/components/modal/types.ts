import { RefCallback } from 'react';

export default interface IModalProps {
  visible: boolean;
  hide: RefCallback<PointerEvent>;
}
