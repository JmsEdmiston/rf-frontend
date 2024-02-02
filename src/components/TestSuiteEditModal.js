import { useState } from 'react';
import { BrowserOptions, ErrorMessages } from '../utils/constants';
import './TestSuiteEditModal.scss';

const Fields = [
  {
    id: 'test_name',
    label: 'Test Name',
    type: 'text',
  },
  {
    id: 'browser',
    label: 'Browser',
    type: 'select',
    width: '80px',
  },
  {
    id: 'instruction_count',
    label: 'Instruction Count',
    type: 'number',
    width: '80px',
    min: 1,
  },
];

export const TestSuiteEditModal = ({ suite, onSave: saveHandler, onClose }) => {
  const [suiteName, setSuiteName] = useState(suite.test_suite_name);
  const [testPlans, setTestPlans] = useState(suite.test_plans);
  const [newTestPlan, setNewTestPlan] = useState({
    test_name: '',
    browser: 'chrome',
    instruction_count: 1,
  });

  const onSuiteNameChange = (ev) => {
    setSuiteName(ev.target.value);
  };

  const onTestPlanChange = (index, field, value) => {
    if (index >= testPlans.length) {
      setNewTestPlan({
        ...newTestPlan,
        [field]: value,
      });
      return;
    }
    const updatedTestPlans = testPlans.map((plan, i) =>
      i === index ? { ...plan, [field]: value } : plan
    );
    setTestPlans(updatedTestPlans);
  };

  const onAddRemoveTestPlan = (index) => {
    const updatedTestPlans = [...testPlans];
    if (index >= testPlans.length) {
      if (newTestPlan.test_name.length === 0) {
        alert(ErrorMessages.EmptyState);
        return;
      }
      updatedTestPlans.push(newTestPlan);
      setNewTestPlan({
        test_name: '',
        browser: 'chrome',
        instruction_count: 1,
      });
    } else {
      updatedTestPlans.splice(index, 1);
    }
    setTestPlans(updatedTestPlans);
  }

  const onSave = () => {
    if (suiteName.length === 0) {
      alert(ErrorMessages.EmptyState);
      return;
    }
    if (testPlans.length === 0) {
      alert(ErrorMessages.EmptyPlan);
      return;
    }
    for (const testPlan of testPlans) {
      if (testPlan.test_name.length === 0) {
        alert(ErrorMessages.EmptyState);
        return;
      }
    }
    saveHandler({ ...suite, test_suite_name: suiteName, test_plans: testPlans });
    onClose();
  };

  return (
    <div className='edit-modal-container'>
      <div className='modal-wrapper'>
        <div className='modal-header'>
          <h3>Edit Test Suite -</h3>
          <input
            type='text'
            id='testSuiteName'
            value={suiteName}
            onChange={onSuiteNameChange}
          />
        </div>
        <div className='modal-content'>

          {[...testPlans, newTestPlan].map((testPlan, index) => (
            <div className='test-plan-item' key={index}>
              {Fields.map(({ id, label, type, min, width }) => (
                <div key={`${index}-${id}`}>
                  <label htmlFor={`testName-${index}-${id}`}>{label}:</label>
                  {type === 'select' ? (
                    <select
                      id={`testName-${index}-${id}`}
                      value={testPlan[id]}
                      onChange={(e) => onTestPlanChange(index, id, e.target.value)}
                      style={{ width }}
                    >
                      {BrowserOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      id={`testName-${index}-${id}`}
                      value={testPlan[id]}
                      onChange={(e) => onTestPlanChange(index, id, e.target.value)}
                      style={{ width }}
                      min={min}
                    />
                  )}
                </div>
              ))}
              <button onClick={() => onAddRemoveTestPlan(index)}>{index >= testPlans.length ? '+' : 'X'}</button>
            </div>
          ))}
        </div>
        <div className='modal-footer'>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
