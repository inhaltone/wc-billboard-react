import styles from './billboard.module.css';
import {useEffect, useRef, useState} from "react";

export default function Billboard({children, clones = 20, rate = 1, direction = 'left', hover = false}) {
    // variables for smooth animation
    let then = Date.now();
    let interval = 1000 / 30;

    // refs
    const billboardContent = useRef(null);
    const billboardRoot = useRef(null);

    // State hooks
    const [state, setState] = useState(true);
    const [animationFrameId, setAnimationFrameId] = useState(0);
    const [offset, setOffset] = useState(-1);

    // setup logic for clone nodes
    const clonesList = [];

    for (let i = 0; i < clones; i++) {
        clonesList.push(children);
    }

    function animate() {
        setAnimationFrameId(requestAnimationFrame(animate));
        let now = Date.now();
        let delta = now - then;
        if (delta > interval) {
            then = now - (delta % interval);
            if (direction === 'left') {
                const firstListItem = billboardContent.current.firstElementChild;
                let rightSideOfFirstItem = Math.floor(firstListItem.getBoundingClientRect().right);
                if (rightSideOfFirstItem <= billboardRoot.current.getBoundingClientRect().left) {// APPEND FIRST ITEM TO END
                    setOffset(-1);
                    clonesList.push(firstListItem);
                }
                setOffset(offset => offset -= rate);
            }

            if (direction === 'right') {
                const lastListItem = billboardContent.current.firstElementChild;
                let rightSideOfFirstItem = Math.floor(lastListItem.getBoundingClientRect().right);
                if (rightSideOfFirstItem >= billboardRoot.current.getBoundingClientRect().left) {
                    setOffset(offset => offset - lastListItem.getBoundingClientRect().width);
                    clonesList.unshift(lastListItem);
                }
                setOffset(offset => offset += rate);
            }
        }
    }


    function start() {
        animate();
    }

    function stop() {
        cancelAnimationFrame(animationFrameId);
    }

    function handleMouseEnter() {
        if (!hover) return;
        setState(false);
    }

    function handleMouseOut() {
        if (!hover) return;
        setState(true);
    }

    useEffect(() => {
        state ? start() : stop();
        // eslint-disable-next-line
    }, [state]);

    return (
        <div ref={billboardRoot} className={styles.billboardRoot} onMouseOut={handleMouseOut}
             onMouseEnter={handleMouseEnter}>
            <div ref={billboardContent} className={styles.billboardContent}
                 style={{transform: `translate3d(${offset}px, 0, 0)`}}>
                {
                    clonesList.map((clone, index) =>
                        <div key={index} className={styles.billBoardItem}>
                            {clone}
                        </div>)
                }
            </div>
        </div>
    )
}