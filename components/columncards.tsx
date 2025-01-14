import { Card } from './board';
import { useEffect, useRef } from 'react';
import { createSwapy, Swapy } from 'swapy';

export default function ColumnCards({ col }: any) {
    let swapyRef = useRef<Swapy | null>(null);
    let containerRefInner = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRefInner.current) {
            swapyRef.current = createSwapy(containerRefInner.current, {
                animation: `spring`,
            });
        }
    }, [])

    return (
        <div className={`colCards`} ref={containerRefInner}>
            {col.cards.map((crd: Card, cdIndx: any) => {
                return (
                    <div key={cdIndx} className={`slot colCardSlot`} data-swapy-slot={cdIndx + 1}>
                        <div className={`colCard`} data-swapy-item={JSON.stringify(crd)} style={{ color: `white`, padding: `15px 30px`, background: `black`, borderRadius: `15px` }}>
                            {crd.title}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}