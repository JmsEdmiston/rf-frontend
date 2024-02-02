import { useState } from 'react';
import { TestPlanItem } from './TestPlanItem';
import './TestSuite.scss';

export const TestSuite = ({ suite }) => {
    const [expanded, setExpanded] = useState(false);
    const { test_suite_name, test_plans } = suite;

    const onExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <div className='suite-wrapper'>
            <div className='suite-header' onClick={onExpand}>
                <span className={`suite-title ${expanded ? 'suite-expanded' : ''}`}>{test_suite_name}</span>
                <span className='suite-count'>{test_plans.length} tests</span>
                <button className='suite-edit-btn'>Edit</button>
            </div>
            {expanded && (
                <div className='suit-plan-list'>
                    {test_plans.map((plan) => (
                        <TestPlanItem key={plan.test_name} plan={plan} />
                    ))}
                </div>
            )}
        </div>
    );
}