import './TestPlanItem.scss';

export const TestPlanItem = ({ plan }) => {
    const { test_name, browser, instruction_count } = plan;

    return (
        <div className="test-plan-wrapper">
            <span className='test-plan-name'>{test_name}</span>
            <span className='test-plan-browser'>{browser}</span>
            <span className='test-plan-instructions'>{instruction_count} steps</span>
        </div>
    )
}