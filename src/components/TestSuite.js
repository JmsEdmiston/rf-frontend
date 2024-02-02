import { useState } from 'react';
import { TestPlanItem } from './TestPlanItem';
import { TestSuiteEditModal } from './TestSuiteEditModal';
import './TestSuite.scss';

export const TestSuite = ({ suite }) => {
    const [expanded, setExpanded] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const { test_suite_name, test_plans } = suite;

    const onExpand = () => {
        setExpanded(!expanded);
    }

    const onEdit = (ev) => {
        ev.stopPropagation();
        setModalOpened(true);
    }

    const onSave = (suite) => {
        console.log('Suite Updated:', suite);
    }

    return (
        <div className='suite-wrapper'>
            <div className='suite-header' onClick={onExpand}>
                <span className={`suite-title ${expanded ? 'suite-expanded' : ''}`}>{test_suite_name}</span>
                <span className='suite-count'>{test_plans.length} tests</span>
                <button className='suite-edit-btn' onClick={onEdit}>Edit</button>
            </div>
            {expanded && (
                <div className='suit-plan-list'>
                    {test_plans.map((plan) => (
                        <TestPlanItem key={plan.test_name} plan={plan} />
                    ))}
                </div>
            )}
            {modalOpened && <TestSuiteEditModal suite={suite} onSave={onSave} onClose={() => setModalOpened(false)} />}
        </div>
    );
}