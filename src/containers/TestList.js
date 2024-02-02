import { useState, useEffect } from 'react';
import { TestSuite } from '../components/TestSuite';
import { fetchTestSuitesData } from '../utils/apis';
import './TestList.scss';

export const TestList = () => {
  const [testSuites, setTestSuites] = useState([]);

  useEffect(() => {
    const loadTestSuites = async () => {
      const data = await fetchTestSuitesData();
      setTestSuites(data);
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