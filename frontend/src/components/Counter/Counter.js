import React, {Fragment} from 'react';


const Counter = ({name, entries}) => {
    return (
        <Fragment>
            <div className="white f3">
                {`${name}, number of faces you have scanned:`}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </Fragment>


    );
};

export default Counter;
