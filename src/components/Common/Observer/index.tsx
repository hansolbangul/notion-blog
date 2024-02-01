import {useEffect} from 'react';

interface Props {
    observer: () => void;
    leave?: () => void;
}

const Observer = ({observer, leave}:Props): JSX.Element => {
    useEffect(() => {
        const io = new IntersectionObserver((item) => {
            item.forEach(entry => {
                if(entry.intersectionRatio) {
                    observer();
                } else {
                    leave?.()
                }
            })
        })
    }, [])
    return (
        <div />
    )
}

export default Observer