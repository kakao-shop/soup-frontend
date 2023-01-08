import { useEffect } from 'react';

const TriggerMaker = ({ previousStep, step, triggerNextStep }) => {
    const triggerNext = () => {
        step.trigger = previousStep.value;
        step.value = previousStep.value;
        triggerNextStep();
    };

    useEffect (() => {
        triggerNext();
    },[]);
    return (
        <div>{previousStep.label}을 선택하셨습니다. 어떤 상품을 검색할까요?</div>
    )
}

export default TriggerMaker;