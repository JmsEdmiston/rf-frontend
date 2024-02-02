import { useState, useEffect } from 'react';
import { TestSuite } from '../components/TestSuite';
import './TestList.scss';

export const TestList = () => {
  const [testSuites, setTestSuites] = useState([]);

  useEffect(() => {
    const loadTestSuites = async () => {
      try {
        const response = await fetch('http://localhost:3456/test_suites');
        const responseJSON = await response.json();
        setTestSuites(responseJSON);
      } catch (err) {
        console.error(err);
      }
    }
    loadTestSuites();
  }, []);

  return (
    <div className='container'>
      {testSuites.map(suite => (
        <TestSuite key={suite.id} suite={suite} />
      ))}
    </div>
  );
}