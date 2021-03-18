import React from 'react';
import classnames from 'classnames';

import './defaultBtn.scss';

interface Props {
  value: string
  isDisabled: boolean
  onClickHandle: () => void
}

const DefaultBtn: React.FC<Props> = ({ value, onClickHandle, isDisabled }): React.ReactElement => {
  return <button className={classnames({'default__btn': true, 'disabled': isDisabled})} 
                 onClick={onClickHandle} disabled={isDisabled}>{value}
          </button>;
};

export default DefaultBtn;