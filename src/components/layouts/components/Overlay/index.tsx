import { Fragment, ReactNode } from 'react';
import './index.css'; // Import your CSS file

const Overlay = ({ children ,loading } : { children: ReactNode, loading : boolean}) => {
  return (
    <div className="component-overlay">
      {children}
      {loading ? (
        <Fragment>
          <div
            className="overlay">
          </div>
        </Fragment>
      ) : null}
    </div>
  )
}

export default Overlay