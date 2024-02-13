import { Fragment, ReactNode } from 'react';
import './index.css'; // Import your CSS file
import { useAppDispatch } from '../../../../redux/hooks';
import { toggleSidebar } from '../../../../redux/slices/sidebar';

const Overlay = ({ children ,loading } : { children: ReactNode, loading : boolean}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="component-overlay">
      {children}
      {loading ? (
        <Fragment>
          <div
            className="overlay"
            onClick={() => dispatch(toggleSidebar(false))}
            >
          </div>
        </Fragment>
      ) : null}
    </div>
  )
}

export default Overlay