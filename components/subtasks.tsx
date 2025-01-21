import { createSwapy, Swapy } from 'swapy';
import { devEnv, sharedDatabase } from '../shared/shared';
import { useContext, useEffect, useRef, useState } from 'react';

export default function Subtasks({ plant }: any) {
    let { swapping, setSwapping } = useContext<any>(sharedDatabase);

    let swapyRef = useRef<Swapy | null>(null);
    let containerRef = useRef<HTMLDivElement>(null);
    let [plantSwapping, setPlantSwapping] = useState(false);
    let [subtasks, setSubtasks] = useState([
        { id: `${plant?.id}_ABC123`, name: `Sub Task 1` }, 
        { id: `${plant?.id}_CBA321`, name: `Sub Task 2` }, 
        { id: `${plant?.id}_DEF567`, name: `Sub Task 3` },
    ]);

    useEffect(() => {
        if (containerRef.current) {
            setPlantSwapping(true);

            swapyRef.current = createSwapy(containerRef?.current, {
                animation: `spring`,
                // enabled: !swapping,
                autoScrollOnDrag: true,
                group: `subtasks_${plant?.id}`,
            } as any);

            // swapyRef.current.onBeforeSwap(({ source, target }: any): any => {
                // setSwapping(false);
                // if (target) {
                //   if (target?.getAttribute(`data-swapy-slot`)?.startsWith(`plant`)) {
                //     return false;
                //   }
                // }
            // }); 

            swapyRef.current.onSwapEnd((onSwapEndEvent) => {
                let { hasChanged, slotItemMap } = onSwapEndEvent;
                let { asObject } = slotItemMap;
                if (hasChanged) {
                    let updatedElements = Object.values(asObject);
                    devEnv && console.log(`Updated Elements`, updatedElements);
                    setSwapping(true);
                }
            })
        } else {
            setPlantSwapping(false);
            swapyRef?.current?.destroy();
        }

        console.log(`inner`, {swapping})
        return () => {
            setPlantSwapping(false);
            swapyRef?.current?.destroy();
        }
    }, [plant, subtasks, swapping, setSwapping])

    return (
        <div className={`plant_subtasks`} ref={containerRef}>
            {subtasks.map((task: any, tIdx: number) => (
                <div key={tIdx} className={`slot plantTaskSlot`} data-swapy-slot={`subtask_${task?.id}`}>
                    <div data-id={task?.id} data-swapy-item={JSON.stringify(task)}>
                        <div className={`subtask`} style={{ cursor: plantSwapping ? `grab` : `auto` }}>
                            {task?.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}