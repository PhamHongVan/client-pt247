import React, {memo} from 'react';

const Button = (props) => {
    const { text, textColor, bgColor, IcAfter, onClick, fullWidth ,IcBefore} = props;
    return (
        <button
            type='button'
            className={`p-2 ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
            onClick = {onClick}
        >
             {IcBefore  && <span> <IcBefore/></span>}
             <span>{text}</span>
             {IcAfter  && <span> <IcAfter/></span>}
        </button>
    );
};

export default memo(Button)
